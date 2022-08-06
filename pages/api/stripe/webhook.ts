// @ts-expect-error TS(2307): Cannot find module '@/lib/create-order' or its cor... Remove this comment to see the full error message
import createOrder from '@/lib/create-order'
// @ts-expect-error TS(2307): Cannot find module '@/lib/stripe-signing-secret' o... Remove this comment to see the full error message
import stripeSigningSecret from '@/lib/stripe-signing-secret'

export const config = { api: { bodyParser: false } }

const handler = async (req: any, res: any, event: any) => {
  const permittedEvents = ['checkout.session.completed']
  if (req.method === 'POST') {
    if (permittedEvents.includes(event?.type)) {
      try {
        switch (event?.type) {
          case 'checkout.session.completed':
            await createOrder({ sessionId: event?.data?.object?.id })
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
