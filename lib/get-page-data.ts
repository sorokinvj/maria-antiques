// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getPageDataQuery = gql`
  query PageDataQuery($locale: Locale!) {
    footerCategories: categories(first: 4, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(first: 1, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`

async function getPageData({
  locale
}: any) {
  const {
    footerCategories,
    footerCollections,
    navigationCategory,
    navigationCollection
  } = await hygraphClient.request(getPageDataQuery, { locale })

  return {
    footer: { categories: footerCategories, collections: footerCollections },
    navigation: { pages: [...navigationCategory, ...navigationCollection] }
  }
}

export default getPageData
