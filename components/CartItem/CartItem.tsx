import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
  XSmallIcon
} from '@/components/icons'
import { CURRENCY, DEFAULT_LOCALE } from '@/constants'
import useSubmissionState from '@/hooks/use-form-submission'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Item, useCart } from 'react-use-cart'
import { LocaleMetadata } from 'types'

export interface CartItem extends Item {
  image?: { id: string; height: number; url: string; width: number }
  productId?: string
}

interface Props {
  item: CartItem & Partial<LocaleMetadata>
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const router = useRouter()
  const locale = router.locale || DEFAULT_LOCALE
  const { submissionLoading } = useSubmissionState()
  const { removeItem, updateItemQuantity } = useCart()

  const handleRemove = () => {
    removeItem(item.id)
  }

  const handleIncrement = () => {
    if (item.quantity) {
      updateItemQuantity(item.id, item?.quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (item.quantity) {
      updateItemQuantity(item.id, item?.quantity - 1)
    }
  }

  return (
    <div
      className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
      key={item.id}
    >
      <div className="w-3/5 flex flex-grow items-center">
        <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg">
          {item?.image && (
            <Image
              src={item.image?.url}
              width={item.image?.width}
              height={item.image?.height}
              alt={item[locale]?.name}
            />
          )}
        </div>
        <div>
          <Link href={`/products/${item[locale]?.slug}`}>
            <a className="text-gray-800 font-medium text-sm md:text-base">
              {item[locale]?.name}
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
      <div className="hidden md:flex flex-col items-center ml-auto">
        <button
          className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
          onClick={handleIncrement}
          disabled={submissionLoading}
        >
          <ChevronUpSmallIcon className="h-4 w-4" />
        </button>
        <span className="mx-3 md:mx-6 p-1">{item?.quantity}</span>
        <button
          className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
          onClick={handleDecrement}
          disabled={submissionLoading}
        >
          <ChevronDownSmallIcon className="h-4 w-4" />
        </button>
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
