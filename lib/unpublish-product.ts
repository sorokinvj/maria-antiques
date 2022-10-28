import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const unpublishProductMutation = gql`
  mutation UnpublishProductMutation($id: ID!) {
    unpublishProduct(where: { id: $id }, from: PUBLISHED) {
      id
    }
  }
`

export async function unpublishProduct(id: string) {
  try {
    const cmsResponse = await hygraphMutationClient.request(
      unpublishProductMutation,
      {
        id
      }
    )
    return cmsResponse
  } catch (error) {
    console.error('Error on unpublishing product', parseErrorMessage(error))
    throw error
  }
}
