import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 })
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const eventType = evt.type

  if (eventType === "organization.created") {
    const { id, name, slug } = evt.data
    await db.organization.upsert({
      where: { clerkOrgId: id },
      update: { name, slug: slug || id },
      create: {
        clerkOrgId: id,
        name,
        slug: slug || id,
        plan: "MONTHLY",
        maxActiveProjects: 2,
        agentHoursLimit: 4800,
      },
    })
  }

  if (eventType === "organizationMembership.created") {
    const { organization, public_user_data } = evt.data
    const org = await db.organization.findUnique({
      where: { clerkOrgId: organization.id },
    })
    if (org) {
      await db.member.upsert({
        where: { clerkUserId: public_user_data.user_id },
        update: { orgId: org.id },
        create: {
          clerkUserId: public_user_data.user_id,
          orgId: org.id,
          role: "CLIENT",
          email: public_user_data.identifier || "",
          name: `${public_user_data.first_name || ""} ${public_user_data.last_name || ""}`.trim(),
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
