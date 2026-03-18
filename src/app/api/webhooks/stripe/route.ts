import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe/client"
import { db } from "@/lib/db"
import type Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const orgId = session.metadata?.orgId
      if (!orgId) break

      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as unknown as {
          id: string; customer: string; items: { data: { price: { id: string } }[] };
          current_period_start: number; current_period_end: number;
        }
        const priceId = subscription.items.data[0]?.price.id

        let plan: "MONTHLY" | "ANNUAL" | "AGENCY" = "MONTHLY"
        if (priceId === process.env.STRIPE_ANNUAL_PRICE_ID) plan = "ANNUAL"
        if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) plan = "AGENCY"

        await db.subscription.create({
          data: {
            orgId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: priceId,
            plan,
            status: "ACTIVE",
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })

        const limits = plan === "ANNUAL"
          ? { maxActiveProjects: 3, agentHoursLimit: 7200, revisionRoundsLimit: 5 }
          : plan === "AGENCY"
          ? { maxActiveProjects: 10, agentHoursLimit: -1, revisionRoundsLimit: 10 }
          : { maxActiveProjects: 2, agentHoursLimit: 4800, revisionRoundsLimit: 3 }

        await db.organization.update({
          where: { id: orgId },
          data: {
            plan,
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            ...limits,
          },
        })
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      await db.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: "CANCELLED" },
      })
      break
    }

    case "invoice.paid": {
      const invoice = event.data.object as unknown as { id: string; subscription: string | null; amount_paid: number; hosted_invoice_url: string | null; period_start: number; period_end: number }
      if (invoice.subscription) {
        const sub = await db.subscription.findFirst({
          where: { stripeSubscriptionId: invoice.subscription as string },
        })
        if (sub) {
          await db.invoice.create({
            data: {
              orgId: sub.orgId,
              stripeInvoiceId: invoice.id,
              amountCents: invoice.amount_paid,
              status: "PAID",
              invoiceUrl: invoice.hosted_invoice_url || undefined,
              periodStart: new Date(invoice.period_start * 1000),
              periodEnd: new Date(invoice.period_end * 1000),
            },
          })
          // Reset usage for new period
          await db.organization.update({
            where: { id: sub.orgId },
            data: { agentHoursUsed: 0, revisionRoundsUsed: 0 },
          })
        }
      }
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as unknown as { id: string; subscription: string | null; amount_paid: number; hosted_invoice_url: string | null; period_start: number; period_end: number }
      if (invoice.subscription) {
        await db.subscription.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: "PAST_DUE" },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
