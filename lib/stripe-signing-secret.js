import { buffer } from 'micro'
import stripe from '@/lib/stripe-client'

export const config = { api: { bodyParser: false } }

const handler = async (req, res) => {
  const signature = req.headers['stripe-signature']
  console.log('signature', signature)
  const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET
  const reqBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (error) {
    console.log(error)
    return res.status(400).send(`Webhook error: ${error.message}`)
  }

  res.send({ received: true })
}

export default handler
