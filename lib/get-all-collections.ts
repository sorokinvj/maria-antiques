import { CollectionFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Collection } from 'types'

export const getAllCollectionsQuery = gql`
  query AllCollectionsQuery() {
    collections() {
      ...CollectionFragment
    }
  }

  ${CollectionFragment}
`

export const getAllCollections = async (): Promise<Collection[]> => {
  const { collections } = await hygraphClient.request(getAllCollectionsQuery)

  return collections
}
