import { getAllProducts } from '@/lib/get-all-products'
import { getPageData } from '@/lib/get-page-data'
import getTextPageBySlug from '@/lib/get-text-page-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

interface PageProps {
  textPageData: any
}
interface ProductPath {
  params: { slug: string }
}

function Page({ textPageData }: PageProps) {
  console.log({ textPageData })
  return <React.Fragment></React.Fragment>
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
  const textPageData = await getTextPageBySlug({ slug: params?.slug as string })

  return {
    props: {
      textPageData,
      ...pageData
    },
    revalidate: 1
  }
}

export default Page
