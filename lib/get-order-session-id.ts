// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'

export const getOrderSessionIdQuery = gql`
  query OrderSessionIdQuery($id: String!) {
    orders(first: 1, stage: DRAFT, where: { stripeCheckoutId: $id }) {
      id
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
        quantity
        total
      }
      total
    }
  }
`

async function getOrderBySessionId({
  id
}: any) {
  const {
    orders: [order]
  } = await hygraphClient.request(getOrderSessionIdQuery, {
    id
  })

  return {
    order
  }
}

export default getOrderBySessionId
