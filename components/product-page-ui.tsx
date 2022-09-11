import { Button } from '@/components/Button/Button'
import { CURRENCY } from '@/constants'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import React from 'react'
import { useCart } from 'react-use-cart'
import { Product } from 'types'

interface Props {
  product: Product
}

export const ProductPageUI: React.FC<Props> = ({ product }) => {
  const { addItem, inCart } = useCart()
  const {
    id,
    images: [image],
    name,
    price,
    slug,
    description
  } = product

  const addToCart = () => {
    addItem({
      id,
      image,
      price,
      name,
      slug
    })
  }

  const isProductInCart = inCart(product.id)
  return (
    <div className="lg:flex -mx-6">
      <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
        <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
          <Image
            src={image?.url}
            height={image?.height}
            width={image?.width}
            alt={name}
            title={name}
          />
        </div>
      </div>
      <div className="px-6 md:py-3 lg:w-1/2">
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
          {name}
        </h1>
        <div className="mb-6">
          <p className="font-semibold text-2xl text-slategray">
            {formatCurrencyValue({
              currency: CURRENCY,
              value: price
            })}
          </p>
        </div>
        <div className="mb-6">
          <p className="leading-loose text-lightgray">{description}</p>
        </div>
        <Button onClick={addToCart} disabled={isProductInCart}>
          {isProductInCart ? 'In the cart' : 'Add to cart'}
        </Button>
      </div>
    </div>
  )
}
