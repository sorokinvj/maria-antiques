import { XSmallIcon } from '@/components/icons'
import { CURRENCY } from '@/constants'
import useSubmissionState from '@/hooks/use-form-submission'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Item, useCart } from 'react-use-cart'

export interface CartItem extends Item {
  image?: { id: string; height: number; url: string; width: number }
  productId?: string
}

interface Props {
  item: CartItem
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { submissionLoading } = useSubmissionState()
  const { removeItem } = useCart()

  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <div
      className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
      key={item.id}
    >
      <div className="w-3/5 flex flex-grow items-center">
        <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg overflow-y-clip">
          {item?.image && (
            <Image
              src={item.image?.url}
              width={item.image?.width}
              height={item.image?.height}
              alt={item?.name}
            />
          )}
        </div>
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <Link href={`/products/${item?.slug}`}>
            <a className="text-gray-800 font-medium text-sm md:text-base mr-4">
              {item?.name}
            </a>
          </Link>
          <button
            className="text-gray-400 hover:text-indigo-600 text-xs flex items-center focus:outline-none"
            onClick={handleRemove}
            disabled={submissionLoading}
          >
            <XSmallIcon className="h-3 w-3" />
            Remove
          </button>
        </div>
      </div>
      <div className="text-right md:w-1/5">
        <p className="font-medium text-gray-800">
          {formatCurrencyValue({
            currency: CURRENCY,
            value: item?.itemTotal
          })}
        </p>
        {Number(item?.quantity) > 1 && (
          <p className="text-gray-400 text-sm">
            {formatCurrencyValue({
              currency: CURRENCY,
              value: item?.price
            })}{' '}
            each
          </p>
        )}
      </div>
    </div>
  )
}
