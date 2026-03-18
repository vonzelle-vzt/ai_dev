"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function getClientProjects() {
  const { orgId } = await auth()
  if (!orgId) return []

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) return []

  const projects = await db.project.findMany({
    where: { orgId: org.id },
    include: {
      milestones: true,
      _count: { select: { agentRuns: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return projects.map((p: any) => {
    const completedWeight = p.milestones
      .filter((m: any) => m.status === "COMPLETED")
      .reduce((sum: number, m: any) => sum + m.weight, 0)
    const totalWeight = p.milestones.reduce((sum: number, m: any) => sum + m.weight, 0)
    const progress = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      status: p.status,
      progress,
      techStack: p.techStack as string[] | null,
      stagingUrl: p.stagingUrl,
      repoUrl: p.repoUrl,
      createdAt: p.createdAt,
    }
  })
}

export async function getUsageMeters() {
  const { orgId } = await auth()
  if (!orgId) return null

  const org = await db.organization.findUnique({
    where: { clerkOrgId: orgId },
    include: {
      projects: { where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } },
    },
  })
  if (!org) return null

  return {
    agentHours: {
      used: Math.round(org.agentHoursUsed / 60),
      limit: org.agentHoursLimit === -1 ? -1 : Math.round(org.agentHoursLimit / 60),
    },
    activeProjects: {
      used: org.projects.length,
      limit: org.maxActiveProjects,
    },
    revisionRounds: {
      used: org.revisionRoundsUsed,
      limit: org.revisionRoundsLimit,
    },
  }
}
