import { createOrder } from '@/lib/create-order'
import stripe from '@/lib/stripe-client'
import { stripeSigningSecret } from '@/lib/stripe-signing-secret'
import { unpublishProduct } from '@/lib/unpublish-product'
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
            const session = await stripe.checkout.sessions.retrieve(
              event?.data?.object?.id,
              {
                expand: [
                  'line_items.data.price.product',
                  'customer',
                  'shipping_details'
                ]
              }
            )
            await createOrder(session)
            await Promise.all(
              session.line_items?.data.map(
                async (item: any) =>
                  await unpublishProduct(item.price.product.metadata.productId)
              ) || []
            )
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
