import { CURRENCY } from '@/constants'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCart } from 'react-use-cart'
import { Product } from 'types'
import { AddToCartOverlay } from './AddToCardOverlay'

export const ProductCard: React.FC<Product> = ({
  id,
  images,
  name,
  price,
  slug
}) => {
  const [primaryImage] = images
  const { addItem, inCart } = useCart()
  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    addItem({
      id,
      image: primaryImage,
      price: price,
      name: name
    })
  }


  return (
    <article key={id}>
      <Link href={`/products/${slug}`}>
        <a className="group no-underline w-full h-full flex">
          <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
            {primaryImage ? (
              <div
                className="relative"
              >
                <AddToCartOverlay
                  onClick={addToCart}
                  isAdded={inCart(id)}
                />
                <Image
                  src={primaryImage.url}
                  height={primaryImage.height}
                  width={primaryImage.width}
                  alt={name}
                  title={name}
                />
              </div>
            ) : null}
            <div className="pt-3 md:pt-6 text-center">
              <p className="text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
                {name}
              </p>
              <p className="text-gray-400 text-sm font-semibold">
                {formatCurrencyValue({
                  currency: CURRENCY,
                  value: price
                })}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}
