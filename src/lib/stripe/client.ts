import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      typescript: true,
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop]
  },
})

export const PLANS = {
  MONTHLY: {
    name: "Monthly",
    price: 9900,
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    maxProjects: 2,
    agentHoursLimit: 4800, // 80 hours in minutes
    revisionRounds: 3,
  },
  ANNUAL: {
    name: "Annual",
    price: 95000,
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID!,
    maxProjects: 3,
    agentHoursLimit: 7200, // 120 hours in minutes
    revisionRounds: 5,
  },
  AGENCY: {
    name: "Agency",
    price: 29900,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    maxProjects: 10,
    agentHoursLimit: -1, // unlimited
    revisionRounds: 10,
  },
} as const

export type PlanType = keyof typeof PLANS

export const ADD_ONS = {
  EXTRA_PROJECT_SLOT: {
    name: "Extra Project Slot",
    price: 2900,
    priceId: process.env.STRIPE_EXTRA_PROJECT_PRICE_ID!,
  },
  PRIORITY_QUEUE: {
    name: "Priority Queue",
    price: 4900,
    priceId: process.env.STRIPE_PRIORITY_QUEUE_PRICE_ID!,
  },
} as const
