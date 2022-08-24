import { ProductGrid } from '@/components/product-grid'
import { SEO } from '@/components/seo'
import { getAllCategories } from '@/lib/get-all-categories'
import { getCategoryBySlug } from '@/lib/get-category-slug'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Category } from 'types'

function CategoryPage({ category }: { category: Category }) {
  return (
    <React.Fragment>
      <SEO title={category.name} {...category} />
      <ProductGrid products={category.products} />
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories()
  const paths = categories.map((category: Category) => ({
    params: { slug: category.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await getPageData()
  const category = await getCategoryBySlug({
    slug: params?.slug as string
  })

  return {
    props: {
      category,
      ...pageData
    },
    revalidate: 1
  }
}

export default CategoryPage
