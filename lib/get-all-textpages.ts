import hygraphClient, { gql } from '@/lib/hygraph-client'

export const getAllTextPagesQuery = gql`
  query AllTextPagesQuery() {
    pages() {
      slug
      title
    }
  }
`

export const getAllTextPages = async (): Promise<any> => {
  const { pages } = await hygraphClient.request(getAllTextPagesQuery, {})
  return pages
}

export default getAllTextPages
