import { CategoryFragment, ProductCardFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { Category, LibParams } from 'types'

export const getCategorySlugQuery = gql`
  query CategorySlugQuery($slug: String!) {
    categories(where: { slug: $slug }) {
      ...CategoryFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CategoryFragment, ProductCardFragment]}
`

export const getCategoryBySlug = async ({
  slug
}: LibParams): Promise<Category> => {
  const {
    categories: [category]
  }: { categories: Category[] } = await hygraphClient.request(
    getCategorySlugQuery,
    {
      slug
    }
  )

  return category
}
