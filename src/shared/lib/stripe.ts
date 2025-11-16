import Stripe from "stripe"

let stripeInstance: Stripe | null = null

const getStripe = () => {
  if (!stripeInstance) {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
    if (!STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not defined")
    }
    stripeInstance = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2025-10-29.clover",
      typescript: true,
    })
  }
  return stripeInstance
}

// Getter for stripe instance
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe]
  },
})
