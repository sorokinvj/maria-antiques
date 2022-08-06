import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// @ts-expect-error TS(2307): Cannot find module '@/ui/button' or its correspond... Remove this comment to see the full error message
import Button from '@/ui/button'
// @ts-expect-error TS(2307): Cannot find module '@/ui/form' or its correspondin... Remove this comment to see the full error message
import Form from '@/ui/form'
// @ts-expect-error TS(2307): Cannot find module '@/graphql/queries/reviews' or ... Remove this comment to see the full error message
import { ProductReviewsQuery } from '@/graphql/queries/reviews'

function ProductReviewForm({
  product
}: any) {
  const { handleSubmit, ...formMethods } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(),
        email: yup.string().required().email(),
        headline: yup.string().required(),
        name: yup.string().required()
      })
    )
  })

  const onSubmit = async (data: any) => {
    mutate(
      [ProductReviewsQuery, product.id],
      async ({
        reviews: { aggregate, edges }
      }: any) => {
        try {
          const { review } = await fetch(
            '/api/graphcms/create-product-review',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                product: { connect: { id: product.id } },
                ...data
              })
            }
          ).then((res) => res.json())

          return {
            reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }]
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      false
    )
  }

  return (
    <Form
      // @ts-expect-error TS(2304): Cannot find name 'className'.
      className="space-y-4"
      // @ts-expect-error TS(2304): Cannot find name 'methods'.
      methods={formMethods}
      // @ts-expect-error TS(2588): Cannot assign to 'onSubmit' because it is a consta... Remove this comment to see the full error message
      onSubmit={handleSubmit(onSubmit: any)}
    >
      // @ts-expect-error TS(2304): Cannot find name 'field'.
      <Form.Input field="headline" />
      // @ts-expect-error TS(2304): Cannot find name 'div'.
      <div className="grid gap-4 md:grid-cols-2">
        // @ts-expect-error TS(2304): Cannot find name 'field'.
        <Form.Input field="name" />
        // @ts-expect-error TS(2304): Cannot find name 'field'.
        <Form.Input field="email" />
      </div>
      // @ts-expect-error TS(2304): Cannot find name 'field'.
      <Form.Textarea field="content" />
      // @ts-expect-error TS(2304): Cannot find name 'type'.
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default ProductReviewForm
