import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Order } from 'types'

export const getOrderByIdQuery = gql`
  query OrderQuery($id: ID!) {
    order(stage: DRAFT, where: { id: $id }) {
      id
      email
      orderItems {
        product {
          id
          name
          images(first: 1) {
            url
          }
          price
        }
      }
      shippingInfo
      shippingCost
      total
    }
  }
`

export const getOrderDataById = async (id: string): Promise<Order | string> => {
  if (!id) {
    throw new Error('getOrderDataById: id is required')
  }
  const response = await hygraphClient.request(getOrderByIdQuery, {
    id
  })

  if (!response.order) {
    return 'No order with id ' + id + ' has been found'
  }
  return response.order
}
