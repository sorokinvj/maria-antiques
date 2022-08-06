// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
import {
  CollectionFragment,
  ProductCardFragment
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
} from '@/lib/graphql-fragments'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, en]) {
      ...CollectionFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`

async function getCollectionBySlug({
  locale = 'en',
  slug
}: any) {
  const {
    collections: [collection]
  } = await hygraphClient.request(getCollectionSlugQuery, {
    locale,
    slug
  })

  return {
    collection
  }
}

export default getCollectionBySlug
