import { ProductFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { avoidRateLimit } from '@/utils/avoidRateLimit'
import { LibParams, Product } from 'types'

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($slug: String!) {
    products(where: { slug: $slug }) {
      ...ProductFragment
    }
  }

  ${ProductFragment}
`

export const getProductBySlug = async ({
  slug
}: LibParams): Promise<Product> => {
  await avoidRateLimit()
  const {
    products: [product]
  } = await hygraphClient.request(getProductsSlugQuery, {
    slug
  })

  return product
}

export default getProductBySlug
