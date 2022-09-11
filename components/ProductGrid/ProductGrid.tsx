import { ProductCard } from '@/components/ProductCard/ProductCard'
import React from 'react'
import { Product } from 'types'

interface Props {
  products: Product[]
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="gap-8 columns-1 sm:columns-2 lg:columns-3">
      {products.map(ProductCard)}
    </div>
  )
}
