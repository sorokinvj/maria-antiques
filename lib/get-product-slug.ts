// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
import { ProductFragment } from '@/lib/graphql-fragments'

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    products(where: { slug: $slug }, locales: [$locale, en]) {
      ...ProductFragment
      localizations(includeCurrent: true) {
        locale
        name
        slug
      }
    }
  }

  ${ProductFragment}
`

async function getProductBySlug({
  locale = 'en',
  slug
}: any) {
  const {
    products: [product]
  } = await hygraphClient.request(getProductsSlugQuery, {
    locale,
    slug
  })

  return { product }
}

export default getProductBySlug
