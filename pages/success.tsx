import { CURRENCY } from '@/constants'
import { getOrderBySessionId } from '@/lib/get-order-session-id'
import getPageData from '@/lib/get-page-data'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { parseCountry } from '@/utils/parseCountry'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { useCart } from 'react-use-cart'
import { Order } from 'types'

interface Props {
  order: Order
  error?: string
}

const SuccessPage: React.FC<Props> = ({ order, error }) => {
  const { emptyCart } = useCart()
  const { id, total, shippingInfo } = order || {}

  const { name, address } = shippingInfo || {}

  useEffect(() => {
    emptyCart()
  }, [emptyCart])

  if (error) {
    return (
      <div className="py-6 px-4">
        <h2 className="font-bold text-2xl md:text-4xl mb-3 text-primary leading-tight">
          Error
        </h2>
        <p className="text-lg md:text-2xl mb-3 text-red-400">{error}</p>
        <p className="text-lg md:text-2xl mb-3">
          Please contact us if you think this is a mistake.
        </p>
      </div>
    )
  }

  return (
    <div className="py-6 px-4">
      <h2 className="font-bold text-2xl md:text-4xl mb-3 text-primary leading-tight">
        Successful Order
      </h2>

      <p className="font-bold text-l text-gray-300 mb-14 md:text-xl">#{id}</p>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mb-4 lg:mr-8">
          <div className="flex justify-between mb-4 text-xl">
            <span className="font-bold">Order total</span>
            <span className="md:mr-6">
              {formatCurrencyValue({
                currency: CURRENCY,
                value: total
              })}
            </span>
          </div>
          <ul className="flex flex-col">
            {order.orderItems.map((item) => {
              return (
                <div
                  className="md:bg-gray-50 md:rounded-lg flex items-center py-3 gap-4 md:py-6 md:px-6 md:mb-3"
                  key={item.id}
                >
                  <div className="w-3/5 flex flex-grow items-center gap-4">
                    <div className="h-16 md:h-20 w-16 md:w-20 bg-gray-50 p-1 rounded-lg relative">
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
                        value: item.price
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>

        <div className="flex-1">
          <p className="text-xl mb-4 font-bold">Shipping info</p>
          <p className="text-gray-800 font-medium text-lg">{name}</p>
          <p className="text-gray-800 font-medium flex flex-col">
            {address.line1 && <span>{address.line1}</span>}
            {address.line2 && <span>{address.line2}</span>}
            {address.city && <span>{address.city}</span>}
            {address.state && <span>{address.state}</span>}
            <span>{address.postal_code}</span>
            <span>{parseCountry(address.country)}</span>
          </p>
          <p className="my-4 md:w-2/3">
            Please check your address carefully. If you find any errors, please{' '}
            <a href="mailto:wynorobeira1960@outlook.pt" className="colored">
              contact us
            </a>
            , so we could ship your order correctly.
          </p>
          <p className="text-xl mb-4 font-bold">Shipping cost</p>
          <p className="text-gray-800 font-medium text-lg">
            {order.shippingCost}
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const order = await getOrderBySessionId({
    id: query?.id as string
  })

  const pageData = await getPageData()

  if (typeof order === 'string') {
    return {
      props: {
        error: order,
        ...pageData
      }
    }
  }

  return {
    props: { order, ...pageData }
  }
}

export default SuccessPage
