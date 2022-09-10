import { ImageFragment } from '@/lib/graphql-fragments'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import { LibParams } from 'types'
import { TextPage } from 'types'

export const getTextPageSlugQuery = gql`
  query TextPageSlugQuery($slug: String!) {
    page(where: { slug: $slug }) {
      slug
      title
      content {
        html
      }
      heroImage {
        ...ImageFragment
      }
    }
  }

  ${ImageFragment}
`

export const getTextPageBySlug = async ({ slug }: LibParams): Promise<TextPage> => {
  const textPage = await hygraphClient.request(getTextPageSlugQuery, {
    slug
  })

  return textPage
}

export default getTextPageBySlug
