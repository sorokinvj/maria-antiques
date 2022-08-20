import { ProductGrid } from '@/components/product-grid'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticProps } from 'next'

function IndexPage({ products }: any) {
  return <ProductGrid products={products} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  const { locale } = props
  const pageData = await getPageData({ locale })
  const products = await getAllProducts({ locale })

  return {
    props: { ...pageData, products }
  }
}

export default IndexPage
