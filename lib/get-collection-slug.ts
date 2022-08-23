import {
  CollectionFragment,
  ProductCardFragment
} from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Collection, LibParams } from 'types'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($slug: String!) {
    collections(where: { slug: $slug }) {
      ...CollectionFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`

export const getCollectionBySlug = async ({
  slug
}: LibParams): Promise<Collection> => {
  const {
    collections: [collection]
  } = await hygraphClient.request(getCollectionSlugQuery, {
    slug
  })

  return collection
}
