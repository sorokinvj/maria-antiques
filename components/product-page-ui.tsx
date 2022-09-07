import { CURRENCY } from '@/constants'
import Button from '@/ui/button'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Image from 'next/image'
import React from 'react'
import { useCart } from 'react-use-cart'
import { Product } from 'types'

interface Props {
  product: Product
}

export const ProductPageUI: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart()
  const [primaryImage] = product.images

  const addToCart = () => {
    addItem({
      id: product.id,
      image: primaryImage,
      price: product.price,
      name: product.name
    })
  }

  return (
    <div className="lg:flex -mx-6">
      <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
        <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
          <Image
            src={primaryImage?.url}
            height={primaryImage?.height}
            width={primaryImage?.width}
            alt={product?.name}
            title={product?.name}
          />
        </div>
      </div>
      <div className="px-6 md:py-3 lg:w-1/2">
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
          {product.name}
        </h1>
        <div className="mb-6">
          <p className="font-semibold text-2xl text-slategray" data-testid="product-page-price">
            {formatCurrencyValue({
              currency: CURRENCY,
              value: product.price
            })}
          </p>
        </div>
        <div className="mb-6">
          <p className="leading-loose text-lightgray">{product.description}</p>
        </div>
        <Button onClick={addToCart}>Add to cart</Button>
      </div>
    </div>
  )
}
