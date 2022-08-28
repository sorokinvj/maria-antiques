import { ProductCard } from '@/components/ProductCard/ProductCard'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticProps } from 'next'
import { Product } from 'types'

function IndexPage({ products }: { products: Product[] }) {
  return (
    <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData()
  const products = await getAllProducts()

  return {
    props: { ...pageData, products },
    revalidate: 1
  }
}

export default IndexPage
