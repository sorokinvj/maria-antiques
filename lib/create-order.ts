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
    ...session
  } = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product', 'customer']
  })

  console.log(customer, session)
  
  return await hygraphMutationClient.request(createOrderMutation, {
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
      }
    }
  })
}
