import { CategoryFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Category } from 'types'

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery() {
    categories() {
      ...CategoryFragment
    }
  }

  ${CategoryFragment}
`

export const getAllCategories = async (): Promise<Category[]> => {
  const { categories } = await hygraphClient.request(getAllCategoriesQuery)

  return categories
}
