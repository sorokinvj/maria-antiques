// @ts-expect-error TS(7016): Could not find a declaration file for module 'micr... Remove this comment to see the full error message
import { buffer } from 'micro'
// @ts-expect-error TS(2307): Cannot find module '@/lib/stripe-client' or its co... Remove this comment to see the full error message
import stripe from '@/lib/stripe-client'

export const config = { api: { bodyParser: false } }

const stripeSigningSecret = (handler: any) => async (req: any, res: any) => {
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET
  const reqBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (error) {
    console.log(error)
    return res.status(400).send(`Webhook error: ${(error as any).message}`);
  }
  return handler(req, res, event)
}

export default stripeSigningSecret
