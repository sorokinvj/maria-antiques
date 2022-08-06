// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import { loadStripe } from '@stripe/stripe-js'

// @ts-expect-error TS(2307): Cannot find module '@/components/ui/button' or its... Remove this comment to see the full error message
import Button from '@/components/ui/button'
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
  XSmallIcon
// @ts-expect-error TS(2307): Cannot find module '@/components/icons' or its cor... Remove this comment to see the full error message
} from '@/components/icons'
// @ts-expect-error TS(2307): Cannot find module '@/utils/format-currency-value'... Remove this comment to see the full error message
import { formatCurrencyValue } from '@/utils/format-currency-value'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-page-data' or its co... Remove this comment to see the full error message
import getPageData from '@/lib/get-page-data'
// @ts-expect-error TS(2307): Cannot find module '@/components/seo' or its corre... Remove this comment to see the full error message
import SEO from '@/components/seo'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'
// @ts-expect-error TS(2307): Cannot find module 'hooks/use-form-submission' or ... Remove this comment to see the full error message
import useSubmissionState from 'hooks/use-form-submission'

// @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function Cart() {
  const {
    cartTotal,
    isEmpty,
    items,
    removeItem,
    updateItemQuantity
  } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionError,
    submissionLoading,
    submissionState
  } = useSubmissionState()

  const decrementItemQuantity = (item: any) => updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item: any) => updateItemQuantity(item.id, item.quantity + 1)

  const handleClick = async () => {
    try {
      setSubmissionLoading()

      const stripe = await stripePromise

      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cancel_url: window.location.href,
          currency: activeCurrency.code,
          items,
          locale: router.locale,
          success_url: `${window.location.origin}/success`
        })
      })

      if (!res.ok) {
        // @ts-expect-error TS(7022): 'error' implicitly has type 'any' because it does ... Remove this comment to see the full error message
        const error = new Error(
          'An error occurred while performing this request'
        )

        // @ts-expect-error TS(2448): Block-scoped variable 'error' used before its decl... Remove this comment to see the full error message
        (error as any).info = await res.json();
        (error as any).status = res.status;

        throw error
      }

      const { session } = await res.json()

      // @ts-expect-error TS(2531): Object is possibly 'null'.
      await stripe.redirectToCheckout({
        sessionId: session.id
      })

      // @ts-expect-error TS(2304): Cannot find name 'setSubmissionSuccess'.
      setSubmissionSuccess()
    } catch (error) {
      setSubmissionError((error as any).info.message);
    }
  }

  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  if (isEmpty) return <p>Your cart is empty</p>

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SEO title="Cart" />
      {items.map((item) => {
        return (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
            key={item.id}
          >
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div className="w-3/5 flex flex-grow items-center">
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image
                  src={item.image.url}
                  width={item.image.width}
                  height={item.image.height}
                />
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link href={`/products/${item[router.locale].slug}`}>
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  <a className="text-gray-800 font-medium text-sm md:text-base">
                    {/* @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type. */}
                    {item[router.locale].name}
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </a>
                </Link>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <button
                  className="text-gray-400 hover:text-indigo-600 text-xs flex items-center focus:outline-none"
                  onClick={() => removeItem(item.id)}
                  disabled={submissionLoading}
                >
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <XSmallIcon className="h-3 w-3" />
                  Remove
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </button>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div className="hidden md:flex flex-col items-center ml-auto">
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => incrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ChevronUpSmallIcon className="h-4 w-4" />
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </button>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <span className="mx-3 md:mx-6 p-1">{item.quantity}</span>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => decrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ChevronDownSmallIcon className="h-4 w-4" />
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </button>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div className="text-right md:w-1/5">
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p className="font-medium text-gray-800">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: item.itemTotal
                })}
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </p>
              {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
              {item.quantity > 1 && (
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <p className="text-gray-400 text-sm">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: item.price
                  })}{' '}
                  each
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </p>
              )}
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        )
      })}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gray-50">
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="flex flex-col items-end">
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className="flex flex-col items-end mb-3">
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span className="text-gray-700">Sub total</span>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span className="text-xl font-bold text-indigo-600">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: cartTotal
              })}
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </span>
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button onClick={handleClick} disabled={submissionLoading}>
            Checkout
          </Button>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    </React.Fragment>
  )
}

export async function getStaticProps({
  locale
}: any) {
  const pageData = await getPageData({ locale })

  return {
    props: {
      ...pageData
    }
  }
}

export default Cart
