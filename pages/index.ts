// @ts-expect-error TS(2307): Cannot find module '@/lib/get-all-products' or its... Remove this comment to see the full error message
import getAllProducts from '@/lib/get-all-products'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-page-data' or its co... Remove this comment to see the full error message
import getPageData from '@/lib/get-page-data'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-grid' or ... Remove this comment to see the full error message
import ProductGrid from '@/components/product-grid'

function IndexPage({
  products
}: any) {
  return <ProductGrid products={products} />
}

export async function getStaticProps({
  locale
}: any) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })

  return {
    props: { ...pageData, products }
  }
}

export default IndexPage
