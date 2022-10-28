import { ProductFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Product } from 'types'

export const getProductsIdQuery = gql`
  query CollectionSlugQuery($id: ID!) {
    products(where: { id: $id }) {
      ...ProductFragment
    }
  }

  ${ProductFragment}
`

export const getProductById = async (id: string): Promise<Product> => {
  const {
    products: [product]
  } = await hygraphClient.request(getProductsIdQuery, {
    id
  })

  return product
}

export default getProductById
