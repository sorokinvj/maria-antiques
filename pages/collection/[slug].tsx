import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { SEO } from '@/components/seo'
import { getAllCollections } from '@/lib/get-all-collections'
import { getCollectionBySlug } from '@/lib/get-collection-slug'
import { getPageData } from '@/lib/get-page-data'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Collection } from 'types'

function CollectionPage({ collection }: { collection: Collection }) {
  return (
    <React.Fragment>
      <SEO title={collection.name} {...collection} />
      <ProductGrid products={collection.products} />
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await getAllCollections()
  const paths = collections.map((collection) => ({
    params: { slug: collection.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await getPageData()
  const collection = await getCollectionBySlug({
    slug: params?.slug as string
  })

  return {
    props: {
      collection,
      ...pageData
    },
    revalidate: 10
  }
}

export default CollectionPage
