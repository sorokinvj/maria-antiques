import stripe from '@/lib/stripe-client'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'

export const stripeSigningSecret = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET
  const reqBuffer = await buffer(req)

  let event
  if (signature && signingSecret) {
    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        signature,
        signingSecret
      )
    } catch (error) {
      return res
        .status(400)
        .send(`StripeSigningSecret webhook error: ${parseErrorMessage(error)}`)
    }
    return handler(req, res, event)
  }
}
