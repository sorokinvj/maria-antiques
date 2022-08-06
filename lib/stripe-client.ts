import Stripe from 'stripe'

// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
export default new Stripe(process.env.STRIPE_SECRET_KEY)
