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
  images: [image],
  name,
  price,
  slug
}) => {
  const { addItem, inCart } = useCart()
  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    addItem({
      id,
      image,
      price,
      name,
      slug
    })
  }

  const isProductAdded = inCart(id)

  return (
    <article key={id} className="mb-4 last:mb-0 md:mb-8">
      <Link href={`/products/${slug}`}>
        <a className="group no-underline w-full flex">
          <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
            {image ? (
              <div className="relative group flex flex-col">
                <AddToCartOverlay
                  onClick={addToCart}
                  isAdded={isProductAdded}
                />
                <Image
                  src={image.url}
                  height={image.height}
                  width={image.width}
                  alt={name}
                  title={name}
                  className={!isProductAdded ? 'lg:group-hover:opacity-70' : ''}
                />
              </div>
            ) : null}
            <div className="pt-3 md:pt-6 text-center">
              <p className="text-gray-800 font-semibold text-lg group-hover:text-red-600 mb-1">
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
