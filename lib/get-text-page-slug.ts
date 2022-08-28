import hygraphClient, { gql } from '@/lib/hygraph-client'
import { LibParams } from 'types'

export const getTextPageSlugQuery = gql`
  query TextPageSlugQuery($slug: String!) {
    page(where: { slug: $slug }) {
      slug
      title
      body {
        text
      }
      heroImage {
        url
      }
    }
  }
`

export const getTextPageBySlug = async ({ slug }: LibParams): Promise<any> => {
  const textPage = await hygraphClient.request(getTextPageSlugQuery, {
    slug
  })

  return textPage
}

export default getTextPageBySlug
