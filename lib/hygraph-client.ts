import { gql, GraphQLClient } from 'graphql-request'

// @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    })
  }
})

export { gql }
