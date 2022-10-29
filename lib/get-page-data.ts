import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Category, Collection, Page, StaticPage } from 'types'

export const getPageDataQuery = gql`
  query PageDataQuery() {
    footerCategories: categories(first: 4) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(first: 1) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1) {
      ...CollectionFragment
      type: __typename
    }
    staticPages: pages(first: 4) {
      slug
      title
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`

interface PageData {
  footer: {
    categories: Category[]
    collections: Collection[]
    staticPages: StaticPage[]
  }
  header: {
    pages: Page[]
    infoPages: StaticPage[]
  }
}

export const getPageData = async (): Promise<PageData> => {
  const {
    footerCategories,
    footerCollections,
    navigationCategory,
    navigationCollection,
    staticPages
  } = await hygraphClient.request(getPageDataQuery)

  return {
    footer: {
      categories: footerCategories,
      collections: footerCollections,
      staticPages
    },
    header: {
      pages: [...navigationCategory, ...navigationCollection],
      infoPages: staticPages
    }
  }
}

export default getPageData
