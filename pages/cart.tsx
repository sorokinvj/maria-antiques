import { CartItem } from '@/components/CartItem/CartItem'
import { ErrorComponent } from '@/components/Error/Error'
import Button from '@/components/ui/button'
import { CURRENCY } from '@/constants'
import { useHasMounted } from '@/hooks/useHasMounted'
import getPageData from '@/lib/get-page-data'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { getAverageShippingPriceInEur } from '@/utils/getShippingPrice'
import { loadStripe } from '@stripe/stripe-js'
import useSubmissionState from 'hooks/use-form-submission'
import { GetStaticProps } from 'next'
import { useCart } from 'react-use-cart'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

const Cart: React.FC = () => {
  const { isEmpty, items, cartTotal } = useCart()
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionLoading,
    setSubmissionSuccess,
    submissionError
  } = useSubmissionState()

  const handleCheckout = async () => {
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
          items,
          success_url: `${window.location.origin}/success`
        })
      })

      if (!res.ok) {
        const error = new Error(
          'An error occurred while performing this request'
        )
        setSubmissionError(error.message)
        throw error
      }

      const { session } = await res.json()

      await stripe?.redirectToCheckout({
        sessionId: session.id
      })
      setSubmissionSuccess()
    } catch (error) {
      setSubmissionError(error)
    }
  }

  const hasMounted = useHasMounted()

  if (!hasMounted) return null
  if (isEmpty) return <p>Your cart is empty</p>
  return (
    <>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gray-50">
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end mb-3">
            <span className="text-gray-700">Sub total</span>
            <span className="text-xl font-bold text-indigo-600">
              {formatCurrencyValue({
                currency: CURRENCY,
                value: cartTotal
              })}
            </span>
            <span className="text-gray-700 mt-2">Estimated shipping</span>
            <span className="text-xl font-bold text-indigo-600 mb-2">
              ~
              {formatCurrencyValue({
                currency: CURRENCY,
                value: getAverageShippingPriceInEur(items.length)
              })}
            </span>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={submissionLoading}
            isLoading={submissionLoading}
          >
            Checkout
          </Button>
          <ErrorComponent error={submissionError} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData()

  return {
    props: {
      ...pageData
    },
    revalidate: 1
  }
}

export default Cart
