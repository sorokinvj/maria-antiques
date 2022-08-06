// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en' }) {
  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale
  })

  return {
    products
  }
}

export default getAllProducts
