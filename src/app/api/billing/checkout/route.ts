import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { stripe, PLANS } from "@/lib/stripe/client"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const { orgId } = await auth()
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { planKey } = await req.json()
  const plan = PLANS[planKey as keyof typeof PLANS]
  if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) return NextResponse.json({ error: "Org not found" }, { status: 404 })

  let customerId = org.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { orgId: org.id },
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

  return NextResponse.json({ url: session.url })
}
