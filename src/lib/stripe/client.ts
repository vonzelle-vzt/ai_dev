import Stripe from "stripe"

let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      typescript: true,
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return Reflect.get(getStripe(), prop)
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
