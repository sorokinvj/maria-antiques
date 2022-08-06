// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
import useSWR from 'swr'
import cc from 'classcat'

// @ts-expect-error TS(2307): Cannot find module '@/icons' or its corresponding ... Remove this comment to see the full error message
import { ChevronDownSmallIcon } from '@/icons'
// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/graphql/queries/reviews' or ... Remove this comment to see the full error message
import { ProductReviewsQuery } from '@/graphql/queries/reviews'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-review-fo... Remove this comment to see the full error message
import ProductReviewForm from '@/components/product-review-form'

function ProductReviews({
  product
}: any) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const { data, error } = useSWR(
    [ProductReviewsQuery, product.id],
    (query, productId) => hygraphClient.request(query, { productId })
  )

  const toggleExpanded = () => setIsExpanded((expanded: any) => !expanded)

  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="pt-6">
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="border-b-2 pb-4">
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <button
          className="text-lg text-left w-full flex justify-between items-start text-gray-400"
          onClick={toggleExpanded}
        >
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span className="font-medium text-gray-900">
            Reviews{' '}
            {data && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <React.Fragment>({data.reviews.aggregate.count})</React.Fragment>
            )}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span className="ml-6 h-7 flex items-center">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ChevronDownSmallIcon
              className={cc([
                'h-6 w-6 transform',
                isExpanded ? '-rotate-180' : 'rotate-0'
              ])}
              aria-hidden="true"
            />
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </button>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
      {isExpanded && (
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="pt-4">
          {!data ? (
            'loading'
          ) : data.reviews.aggregate.count ? (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div className="divide-y-2 space-y-4">
              {/* @ts-expect-error TS(7031): Binding element 'review' implicitly has an 'any' t... Remove this comment to see the full error message */}
              {data.reviews.edges.map(({ node: review }) => (
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <div key={review.id} className="first:pt-0 pt-4 space-y-4">
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  <div>
                    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                    <p className="text-lg leading-6 font-medium text-gray-900">
                      {review.headline}
                    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                    </p>
                    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                    <p className="text-sm leading-6 text-gray-500">
                      {review.name} &mdash;{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium'
                      }).format(new Date(review.createdAt))}
                    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                    </p>
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </div>
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  <p className="leading-5 text-gray-900">{review.content}</p>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </div>
              ))}
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          ) : (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductReviewForm product={product} />
          )}
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      )}
    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  )
}

export default ProductReviews
