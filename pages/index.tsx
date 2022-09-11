import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticProps, NextPage } from 'next'
import { Product } from 'types'

interface Props {
  products: Product[]
}

const IndexPage: NextPage<Props> = ({ products }) => (
  <ProductGrid products={products} />
)

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData()
  const products = await getAllProducts()

  return {
    props: { ...pageData, products },
    revalidate: 1
  }
}

export default IndexPage
