import { ProductCardFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Product } from 'types'

export const getAllProductsQuery = gql`
  query AllProductsQuery() {
    products() {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

export const getAllProducts = async (): Promise<Product[]> => {
  const { products } = await hygraphClient.request(getAllProductsQuery)
  return products
}
