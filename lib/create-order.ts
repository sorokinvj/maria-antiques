import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'
import stripe from '@/lib/stripe-client'
import { parseCountry } from '@/utils/parseCountry'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

export async function createOrder({ sessionId }: { sessionId: string }) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product', 'customer', 'shipping_details']
  })
  const {
    customer_details,
    amount_total,
    id,
    line_items,
    shipping_details,
    shipping_cost
  } = session

  try {
    const cmsResponse = await hygraphMutationClient.request(
      createOrderMutation,
      {
        order: {
          email: customer_details?.email,
          total: amount_total,
          stripeCheckoutId: id,
          orderItems: {
            create: line_items?.data.map((item: any) => ({
              total: item.amount_total,
              product: {
                connect: {
                  id: item.price.product.metadata.productId
                }
              }
            }))
          },
          shippingInfo: {
            ...shipping_details,
            address: {
              ...shipping_details?.address,
              country: parseCountry(shipping_details?.address?.country)
            }
          },
          shippingCost: shipping_cost?.amount_total
            ? `${shipping_cost?.amount_total / 100} euro`
            : 'Free shipping'
        }
      }
    )
    return cmsResponse
  } catch (error) {
    console.error('Error on creating order', parseErrorMessage(error))
    throw error
  }
}
