import { CartItem } from '@/components/CartItem/CartItem'
import Button from '@/components/ui/button'
import { CURRENCY } from '@/constants'
import { useHasMounted } from '@/hooks/useHasMounted'
import getPageData from '@/lib/get-page-data'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { loadStripe } from '@stripe/stripe-js'
import useSubmissionState from 'hooks/use-form-submission'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

const Cart: React.FC = () => {
  const { isEmpty, items, cartTotal } = useCart()

  const router = useRouter()
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionLoading,
    setSubmissionSuccess
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
          currency: CURRENCY,
          items,
          locale: router.locale,
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
      if (error instanceof Error) {
        setSubmissionError(error.message)
      } else {
        setSubmissionError(JSON.stringify(error))
      }
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
          </div>
          <Button onClick={handleCheckout} disabled={submissionLoading}>
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const pageData = await getPageData({ locale })

  return {
    props: {
      ...pageData
    }
  }
}

export default Cart
