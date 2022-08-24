import { ProductGrid } from '@/components/product-grid'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticProps } from 'next'
import { Product } from 'types'

function IndexPage({ products }: { products: Product[] }) {
  return <ProductGrid products={products} />
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
