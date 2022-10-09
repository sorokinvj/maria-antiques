import { ProductPageUI } from '@/components/product-page-ui'
import { SEO } from '@/components/seo'
import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import { getProductBySlug } from '@/lib/get-product-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { Product } from 'types'

interface ProductPageProps {
  product: Product | null
}

function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <>
        <div className="p-4 lg:w-1/2">
          <h1 className="mt-0 mb-8">
            Sorry, but the product you are looking for is sold out
          </h1>
          <h2>
            We have other beautiful items of jewellery, please take a look at
            our{' '}
            <Link passHref href="/">
              <a className="colored">catalog</a>
            </Link>
          </h2>
        </div>
      </>
    )
  }
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
  const product =
    (await getProductBySlug({
      slug: params?.slug as string
    })) || null

  return {
    props: {
      product,
      ...pageData
    },
    revalidate: 1
  }
}

export default ProductPage
