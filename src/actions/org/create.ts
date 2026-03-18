"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { slugify } from "@/lib/utils"
import { z } from "zod"

const createOrgSchema = z.object({
  name: z.string().min(1).max(100),
  clerkOrgId: z.string(),
})

export async function createOrganization(input: z.infer<typeof createOrgSchema>) {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const data = createOrgSchema.parse(input)
  const slug = slugify(data.name)

  const org = await db.organization.create({
    data: {
      clerkOrgId: data.clerkOrgId,
      name: data.name,
      slug,
      plan: "MONTHLY",
      maxActiveProjects: 2,
      agentHoursLimit: 4800,
      revisionRoundsLimit: 3,
    },
  })

  await db.member.create({
    data: {
      clerkUserId: userId,
      orgId: org.id,
      role: "ADMIN",
      email: "",
      name: "",
    },
  })

  return org
}

export async function getOrgMembers() {
  const { orgId } = await auth()
  if (!orgId) return []

  const org = await db.organization.findUnique({
    where: { clerkOrgId: orgId },
    include: { members: true },
  })

  return org?.members || []
}
