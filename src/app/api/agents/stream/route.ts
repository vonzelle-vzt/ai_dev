import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  const { orgId } = await auth()
  if (!orgId) return new Response("Unauthorized", { status: 401 })

  const projectId = req.nextUrl.searchParams.get("projectId")
  if (!projectId) return new Response("Missing projectId", { status: 400 })

  // Verify project belongs to org
  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) return new Response("Org not found", { status: 404 })

  const project = await db.project.findFirst({
    where: { id: projectId, orgId: org.id },
  })
  if (!project) return new Response("Project not found", { status: 404 })

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data
      const runs = await db.agentRun.findMany({
        where: { projectId },
        include: { steps: { orderBy: { createdAt: "desc" }, take: 5 } },
        orderBy: { createdAt: "desc" },
        take: 10,
      })

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "initial", runs })}\n\n`))

      // Poll for updates every 3 seconds
      const interval = setInterval(async () => {
        try {
          const latestSteps = await db.agentStep.findMany({
            where: { run: { projectId } },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { run: { select: { agentType: true } } },
          })
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "update", steps: latestSteps })}\n\n`))
        } catch {
          clearInterval(interval)
          controller.close()
        }
      }, 3000)

      req.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
