// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-order-session-id' or... Remove this comment to see the full error message
import getOrderBySessionId from '@/lib/get-order-session-id'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'
import Link from 'next/link'
// @ts-expect-error TS(2307): Cannot find module '@/utils/format-currency-value'... Remove this comment to see the full error message
import { formatCurrencyValue } from '@/utils/format-currency-value'

function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState(null)
  const { activeCurrency } = useSettingsContext()

  React.useEffect(() => {
    const fetchOrder = async () => {
      const { order } = await getOrderBySessionId({ id: router.query.id })

      setLoading(false)
      setOrder(order)
    }

    if (router.query.id) fetchOrder()
  }, [router.query.id])

  if (!order) return null
  if (loading) return 'loading'
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="py-6">
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
        Successful Order
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </h1>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <p className="font-bold text-xl text-gray-300 md:text-3xl mb-14">
        #{order.id}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </p>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="flex justify-between mb-4 text-xl">
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <span>Order total:</span>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <span className="pr-7">
          {formatCurrencyValue({
            currency: activeCurrency,
            value: order.total
          })}
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </span>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <p className="mb-4 text-xl">Order contents:</p>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <ul className="flex flex-col">
        {order.orderItems.map((item: any) => {
          return (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div
              className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
              key={item.id}
            >
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div className="w-3/5 flex flex-grow items-center">
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg relative">
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image
                    src={item.product.images[0].url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </div>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <div>
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  <p className="text-gray-800 font-medium text-sm md:text-base">
                    {item.product.name}
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </p>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </div>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div className="text-right md:w-1/5">
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <p className="font-medium text-gray-800">
                  Total:{' '}
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: item.total
                  })}
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </p>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <p className="font-medium text-gray-800">
                  Quanity: {item.quantity}{' '}
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </p>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          )
        })}
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </ul>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <h2 className="font-bold text-2xl md:text-6xl my-8 text-primary leading-tight">
        Shipping info:
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </h2>
    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
}

export default SuccessPage
