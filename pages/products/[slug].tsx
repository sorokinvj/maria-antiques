import { ProductPageUI } from '@/components/product-page-ui'
import { SEO } from '@/components/seo'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { getProductBySlug } from '@/lib/get-product-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

function ProductPage({ product }: any) {
  return (
    <React.Fragment>
      <SEO title={product.name} {...product} />
      <ProductPageUI product={product} />
    </React.Fragment>
  )
}

interface ProductPath {
  params: { slug: string }
  locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: ProductPath[] = []

  for (const locale of locales!) {
    const products = await getAllProducts({ locale })

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
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const pageData = await getPageData({ locale })
  const product = await getProductBySlug({
    locale,
    slug: params?.slug as string
  })

  console.log(product)

  return {
    props: {
      product,
      ...pageData
    },
    revalidate: 1
  }
}

export default ProductPage
