import { CURRENCY } from '@/constants'
import { getOrderBySessionId } from '@/lib/get-order-session-id'
import getPageData from '@/lib/get-page-data'
import { convertPriceFormat } from '@/utils/convert-price-format'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { useCart } from 'react-use-cart'
import { Order } from 'types'

interface Props {
  order: Order
}

const SuccessPage: React.FC<Props> = ({ order }) => {
  const { emptyCart } = useCart()

  useEffect(() => {
    emptyCart()
  }, [emptyCart])

  return (
    <div className="py-6">
      <h2 className="font-bold text-2xl md:text-4xl mb-3 text-primary leading-tight">
        Successful Order
      </h2>

      <p className="font-bold text-l text-gray-300 md:text-xl mb-14">
        #{order.id}
      </p>

      <div className="flex justify-between mb-4 text-xl">
        <span>Order total:</span>

        <span className="pr-7" data-testid="successful-order-total">
          {formatCurrencyValue({
            currency: CURRENCY,
            value: convertPriceFormat('stripeToCms', order.total)
          })}
        </span>
      </div>

      <p className="mb-4 text-l">Order contents:</p>

      <ul className="flex flex-col">
        {order.orderItems.map((item) => {
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
                  {formatCurrencyValue({
                    currency: CURRENCY,
                    value: convertPriceFormat('stripeToCms', item.total)
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </ul>

      <h2 className="font-bold text-2xl md:text-4xl my-8 text-primary leading-tight">
        Shipping info
      </h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const order = await getOrderBySessionId({
    id: query?.id as string
  })
  const pageData = await getPageData()

  return {
    props: { order, ...pageData }
  }
}

export default SuccessPage
