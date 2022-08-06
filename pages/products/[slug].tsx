// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'

// @ts-expect-error TS(2307): Cannot find module '@/lib/get-all-products' or its... Remove this comment to see the full error message
import getAllProducts from '@/lib/get-all-products'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-product-slug' or its... Remove this comment to see the full error message
import getProductBySlug from '@/lib/get-product-slug'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-page-data' or its co... Remove this comment to see the full error message
import getPageData from '@/lib/get-page-data'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-page-ui' ... Remove this comment to see the full error message
import ProductPageUI from '@/components/product-page-ui'
// @ts-expect-error TS(2307): Cannot find module '@/components/seo' or its corre... Remove this comment to see the full error message
import SEO from '@/components/seo'

function ProductPage({
  product
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SEO title={product.name} {...product} />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ProductPageUI product={product} />
    </React.Fragment>
  )
}

export async function getStaticPaths({
  locales
}: any) {
  let paths: any = []

  for (const locale of locales) {
    const { products } = await getAllProducts({ locale })

    paths = [
      ...paths,
      ...products.map((product: any) => ({
        params: { slug: product.slug },
        locale
      }))
    ]
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({
  locale,
  params
}: any) {
  const pageData = await getPageData({ locale })
  const { product } = await getProductBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      product,
      ...pageData
    }
  }
}

export default ProductPage
