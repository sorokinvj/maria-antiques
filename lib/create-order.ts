import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'
import { convertPriceFormat } from '@/utils/convert-price-format'
import { getShippingCost } from '@/utils/getShippingCost'
import { parseCountry } from '@/utils/parseCountry'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import Stripe from 'stripe'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

export async function createOrder(
  session: Stripe.Response<Stripe.Checkout.Session>
) {
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
          total: convertPriceFormat('stripeToCms', amount_total || 0),
          stripeCheckoutId: id,
          orderItems: {
            create: line_items?.data.map((item: any) => ({
              price: convertPriceFormat('stripeToCms', item.amount_subtotal),
              tax: convertPriceFormat('stripeToCms', item.amount_tax),
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
          shippingCost: getShippingCost(shipping_cost)
        }
      }
    )
    return cmsResponse
  } catch (error) {
    console.error('Error on creating order', parseErrorMessage(error))
    throw error
  }
}
