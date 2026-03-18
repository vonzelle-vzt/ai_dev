"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { stripe, PLANS, ADD_ONS } from "@/lib/stripe/client"
import { db } from "@/lib/db"

export async function createCheckoutSession(planKey: keyof typeof PLANS) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("Not authenticated")

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) throw new Error("Organization not found")

  const plan = PLANS[planKey]

  let customerId = org.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { orgId: org.id, clerkOrgId: orgId },
    })
    customerId = customer.id
    await db.organization.update({
      where: { id: org.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: plan.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { orgId: org.id },
  })

  if (session.url) redirect(session.url)
}

export async function createPortalSession() {
  const { orgId } = await auth()
  if (!orgId) throw new Error("Not authenticated")

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org?.stripeCustomerId) throw new Error("No billing account")

  const session = await stripe.billingPortal.sessions.create({
    customer: org.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  redirect(session.url)
}

export async function checkPlanLimits() {
  const { orgId } = await auth()
  if (!orgId) return null

  const org = await db.organization.findUnique({
    where: { clerkOrgId: orgId },
    include: {
      projects: { where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } },
    },
  })
  if (!org) return null

  const activeProjects = org.projects.length
  const hoursUsed = Math.round(org.agentHoursUsed / 60)
  const hoursLimit = org.agentHoursLimit === -1 ? Infinity : Math.round(org.agentHoursLimit / 60)

  return {
    plan: org.plan,
    activeProjects,
    maxProjects: org.maxActiveProjects,
    canCreateProject: activeProjects < org.maxActiveProjects,
    hoursUsed,
    hoursLimit,
    hoursRemaining: org.agentHoursLimit === -1 ? Infinity : hoursLimit - hoursUsed,
    revisionRoundsUsed: org.revisionRoundsUsed,
    revisionRoundsLimit: org.revisionRoundsLimit,
  }
}
