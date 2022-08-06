// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/graphql-fragments' or it... Remove this comment to see the full error message
import { CategoryFragment } from '@/lib/graphql-fragments'

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery($locale: Locale!) {
    categories(locales: [$locale, en]) {
      ...CategoryFragment
    }
  }

  ${CategoryFragment}
`

async function getAllCategories({ locale = 'en' } = {}) {
  const { categories } = await hygraphClient.request(getAllCategoriesQuery, {
    locale
  })

  return { categories }
}

export default getAllCategories
