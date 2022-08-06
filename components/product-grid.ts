// @ts-expect-error TS(2307): Cannot find module '@/components/product-card' or ... Remove this comment to see the full error message
import ProductCard from '@/components/product-card'

function ProductGrid({
  products
}: any) {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'div'.
    <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  )
}

export default ProductGrid
