import { CartItem } from '@/components/CartItem/CartItem'
import { ErrorComponent } from '@/components/Error/Error'
import { QuestionCircleIcon } from '@/components/icons'
import Button from '@/components/ui/button'
import { CURRENCY, FREE_SHIPPING_PRICE } from '@/constants'
import { useHasMounted } from '@/hooks/useHasMounted'
import getPageData from '@/lib/get-page-data'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { getAverageShippingPriceInEur } from '@/utils/getShippingPrice'
import { loadStripe } from '@stripe/stripe-js'
import useSubmissionState from 'hooks/use-form-submission'
import { GetStaticProps } from 'next'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
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
          success_url: `${window.location.origin}/success`,
          cancel_url: window.location.href,
          items,
          cartTotal
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
            <div className="text-gray-700 mt-2 flex flex-row items-center">
              <span className="mr-1">Estimated shipping</span>
              <Tooltip
                placement="left"
                trigger={['hover']}
                overlayClassName="!bg-white !border-none !opacity-100 !text-base"
                overlay="Precise shipping cost will be calculated on the checkout"
                id="tooltip"
              >
                <div>
                  <QuestionCircleIcon />
                </div>
              </Tooltip>
            </div>
            <span className="text-xl font-bold text-indigo-600 mb-2">
              {cartTotal > FREE_SHIPPING_PRICE
                ? 'FREE'
                : formatCurrencyValue({
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
