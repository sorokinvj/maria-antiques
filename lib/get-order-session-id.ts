import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Order } from 'types'

export const getOrderSessionIdQuery = gql`
  query OrderSessionIdQuery($id: String!) {
    orders(first: 1, stage: DRAFT, where: { stripeCheckoutId: $id }) {
      id
      shippingInfo
      shippingCost
      orderItems {
        id
        product {
          images {
            id
            height
            url
            width
          }
          name
        }
        total
      }
      total
    }
  }
`

export const getOrderBySessionId = async ({
  id
}: {
  id: string
}): Promise<Order | string> => {
  if (!id) {
    throw new Error('getOrderBySessionId: id is required')
  }
  const response = await hygraphClient.request(getOrderSessionIdQuery, {
    id
  })

  if (!response.orders || response.orders.length === 0) {
    return 'No order with id ' + id + ' has been found'
  }
  return response.orders[0]
}
