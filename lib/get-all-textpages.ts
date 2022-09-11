import hygraphClient, { gql } from '@/lib/hygraph-client'
import { TextPage } from 'types'

export const getAllTextPagesQuery = gql`
  query AllTextPagesQuery() {
    pages() {
      slug
      title
    }
  }
`

export const getAllTextPages = async (): Promise<TextPage[]> => {
  const { pages } = await hygraphClient.request(getAllTextPagesQuery, {})
  return pages
}

export default getAllTextPages
