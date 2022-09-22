import { createOrder } from '@/lib/create-order'
import { sendEmailConfirmation } from '@/lib/send-email-confirmation'
import { stripeSigningSecret } from '@/lib/stripe-signing-secret'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = { api: { bodyParser: false } }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  event: any
) => {
  const permittedEvents = ['checkout.session.completed']
  if (req.method === 'POST') {
    if (permittedEvents.includes(event?.type)) {
      try {
        switch (event?.type) {
          case 'checkout.session.completed':
            const orderId = await createOrder({
              sessionId: event?.data?.object?.id
            })
            await sendEmailConfirmation(orderId)
            break
          default:
            throw new Error(`Unhandled event: ${event?.type}`)
        }
      } catch (error) {
        res.status(500).json({ message: 'Unknown event' })
      }
    }
    res.send({ received: true })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default stripeSigningSecret(handler)
