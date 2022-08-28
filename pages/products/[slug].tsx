import { ProductPageUI } from '@/components/product-page-ui'
import { SEO } from '@/components/seo'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { getProductBySlug } from '@/lib/get-product-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Product } from 'types'

interface ProductPageProps {
  product: Product
}

function ProductPage({ product }: ProductPageProps) {
  return (
    <React.Fragment>
      <SEO title={product.name} image={product.images[0]} {...product} />
      <ProductPageUI product={product} />
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts()
  const paths = products.map((product) => ({
    params: { slug: product.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await getPageData()
  const product = await getProductBySlug({
    slug: params?.slug as string
  })

  return {
    props: {
      product,
      ...pageData
    },
    revalidate: 1
  }
}

export default ProductPage
