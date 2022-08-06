// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'

// @ts-expect-error TS(2307): Cannot find module '@/lib/get-all-categories' or i... Remove this comment to see the full error message
import getAllCategories from '@/lib/get-all-categories'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-category-slug' or it... Remove this comment to see the full error message
import getCategoryBySlug from '@/lib/get-category-slug'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-page-data' or its co... Remove this comment to see the full error message
import getPageData from '@/lib/get-page-data'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-grid' or ... Remove this comment to see the full error message
import ProductGrid from '@/components/product-grid'
// @ts-expect-error TS(2307): Cannot find module '@/components/seo' or its corre... Remove this comment to see the full error message
import SEO from '@/components/seo'

function CategoryPage({
  category
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SEO title={category.name} {...category} />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ProductGrid products={category.products} />
    </React.Fragment>
  )
}

export async function getStaticPaths({
  locales
}: any) {
  let paths: any = []

  for (const locale of locales) {
    const { categories } = await getAllCategories({ locale })

    paths = [
      ...paths,
      ...categories.map((category: any) => ({
        params: { slug: category.slug },
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
  const { category } = await getCategoryBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      category,
      ...pageData
    }
  }
}

export default CategoryPage
