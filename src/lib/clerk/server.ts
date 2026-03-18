import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function getOrg() {
  const { orgId, orgSlug, userId } = await auth()
  if (!orgId || !userId) return null

  const org = await db.organization.findUnique({
    where: { clerkOrgId: orgId },
    include: { members: true },
  })
  return org
}

export async function requireOrg() {
  const org = await getOrg()
  if (!org) throw new Error("Organization required")
  return org
}

export async function requireCTO() {
  const { userId } = await auth()
  if (!userId) throw new Error("Authentication required")

  const org = await requireOrg()
  const member = org.members.find((m: any) => m.clerkUserId === userId)
  if (!member || (member.role !== "CTO" && member.role !== "ADMIN")) {
    throw new Error("CTO or ADMIN role required")
  }
  return { org, member }
}

export async function getMember() {
  const { userId, orgId } = await auth()
  if (!userId || !orgId) return null

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) return null

  const member = await db.member.findFirst({
    where: { clerkUserId: userId, orgId: org.id },
  })
  return member
}
