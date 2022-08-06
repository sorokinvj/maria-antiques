// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-mutation-client'... Remove this comment to see the full error message
import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/stripe-client' or its co... Remove this comment to see the full error message
import stripe from '@/lib/stripe-client'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

async function createOrder({
  sessionId
}: any) {
  const {
    customer,
    line_items,
    ...session
  } = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product', 'customer']
  })
  return await hygraphMutationClient.request(createOrderMutation, {
    order: {
      email: customer.email,
      total: session.amount_total,
      stripeCheckoutId: session.id,
      orderItems: {
        create: line_items.data.map((item: any) => ({
          quantity: item.quantity,
          total: item.amount_total,

          product: {
            connect: {
              id: item.price.product.metadata.productId
            }
          }
        }))
      }
    }
  });
}

export default createOrder
