import Stripe from 'stripe'
import { buffer } from 'micro'

const handler = async (req, res) => {
  console.log('start signing req', req)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET
  const reqBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (error) {
    console.log(error)
    return res.status(400).send(`Webhook error: ${error.message}`)
  }

  console.log('stripe-signing-secret event received', event)
  return res.send({ received: true })
}

export default handler
