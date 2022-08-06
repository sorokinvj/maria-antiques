// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'

// @ts-expect-error TS(2307): Cannot find module '@/lib/get-all-collections' or ... Remove this comment to see the full error message
import getAllCollections from '@/lib/get-all-collections'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-collection-slug' or ... Remove this comment to see the full error message
import getCollectionBySlug from '@/lib/get-collection-slug'
// @ts-expect-error TS(2307): Cannot find module '@/lib/get-page-data' or its co... Remove this comment to see the full error message
import getPageData from '@/lib/get-page-data'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-grid' or ... Remove this comment to see the full error message
import ProductGrid from '@/components/product-grid'
// @ts-expect-error TS(2307): Cannot find module '@/components/seo' or its corre... Remove this comment to see the full error message
import SEO from '@/components/seo'

function CollectionPage({
  collection
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SEO title={collection.name} {...collection} />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ProductGrid products={collection.products} />
    </React.Fragment>
  )
}

export async function getStaticPaths({
  locales
}: any) {
  let paths: any = []

  for (const locale of locales) {
    const { collections } = await getAllCollections({ locale })

    paths = [
      ...paths,
      ...collections.map((collection: any) => ({
        params: { slug: collection.slug },
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
  const { collection } = await getCollectionBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      collection,
      ...pageData
    }
  }
}

export default CollectionPage
