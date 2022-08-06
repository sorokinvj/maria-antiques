// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
import { CategoryFragment, ProductCardFragment } from '@/lib/graphql-fragments'

export const getCategorySlugQuery = gql`
  query CategorySlugQuery($locale: Locale!, $slug: String!) {
    categories(where: { slug: $slug }, locales: [$locale, en]) {
      ...CategoryFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CategoryFragment, ProductCardFragment]}
`

async function getCategoryBySlug({
  locale = 'en',
  slug
}: any) {
  const {
    categories: [category]
  } = await hygraphClient.request(getCategorySlugQuery, {
    locale,
    slug
  })

  return {
    category
  }
}

export default getCategoryBySlug
