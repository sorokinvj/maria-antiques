import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'
import stripe from '@/lib/stripe-client'
import Stripe from 'stripe'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

export async function createOrder({ sessionId }: { sessionId: string }) {
  const {
    customer,
    line_items,
    shipping_details,
    ...session
  } = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product', 'customer', 'shipping_details']
  })

  console.log('createOrder function', customer, shipping_details, session)
  try {
    const cmsResponse = await hygraphMutationClient.request(
      createOrderMutation,
      {
        order: {
          email: (customer as Stripe.Customer)?.email,
          total: session.amount_total,
          stripeCheckoutId: session.id,
          orderItems: {
            create: line_items?.data.map((item: any) => ({
              quantity: item.quantity,
              total: item.amount_total,
              product: {
                connect: {
                  id: item.price.product.metadata.productId
                }
              }
            }))
          },
          shippingInfo:
            shipping_details?.address?.country +
            ' ' +
            shipping_details?.address?.city +
            ' ' +
            shipping_details?.address?.line1 +
            ' ' +
            shipping_details?.address?.line2 +
            ' ' +
            shipping_details?.address?.postal_code
        }
      }
    )
    console.log('order created', cmsResponse)
    return cmsResponse
  } catch (error) {
    console.error('error creating order', JSON.stringify(error))
    throw error
  }
}
