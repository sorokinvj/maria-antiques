import { CURRENCY } from '@/constants'
import { getOrderBySessionId } from '@/lib/get-order-session-id'
import { convertPriceFormat } from '@/utils/convert-price-format'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Order } from 'types'

function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState<Order | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrderBySessionId({
        id: router?.query?.id as string
      })
      setLoading(false)
      setOrder(order)
    }

    if (router.query.id) fetchOrder()
  }, [router.query.id])

  if (!order) return null
  if (loading) return 'loading'
  return (
    <div className="py-6">
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
        Successful Order
      </h1>

      <p className="font-bold text-xl text-gray-300 md:text-3xl mb-14">
        #{order.id}
      </p>

      <div className="flex justify-between mb-4 text-xl">
        <span>Order total:</span>

        <span className="pr-7">
          {formatCurrencyValue({
            currency: CURRENCY,
            value: convertPriceFormat('stripeToCms', order.total)
          })}
        </span>
      </div>

      <p className="mb-4 text-xl">Order contents:</p>

      <ul className="flex flex-col">
        {order.orderItems.map((item: any) => {
          return (
            <div
              className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
              key={item.id}
            >
              <div className="w-3/5 flex flex-grow items-center">
                <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg relative">
                  <Image
                    src={item.product.images[0].url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={item.product.name}
                  />
                </div>

                <div>
                  <p className="text-gray-800 font-medium text-sm md:text-base">
                    {item.product.name}
                  </p>
                </div>
              </div>

              <div className="text-right md:w-1/5">
                <p className="font-medium text-gray-800">
                  Total:{' '}
                  {formatCurrencyValue({
                    currency: CURRENCY,
                    value: convertPriceFormat('stripeToCms', item.total)
                  })}
                </p>

                <p className="font-medium text-gray-800">
                  Quanity: {item.quantity}{' '}
                </p>
              </div>
            </div>
          )
        })}
      </ul>

      <h2 className="font-bold text-2xl md:text-6xl my-8 text-primary leading-tight">
        Shipping info:
      </h2>
    </div>
  )
}

export default SuccessPage
