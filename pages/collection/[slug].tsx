import { ProductGrid } from "@/components/product-grid";
import { SEO } from "@/components/seo";
import { getAllCollections } from "@/lib/get-all-collections";
import { getCollectionBySlug } from "@/lib/get-collection-slug";
import { getPageData } from "@/lib/get-page-data";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Collection } from "types";

function CollectionPage({ collection }: { collection: Collection }) {
  return (
    <React.Fragment>
      <SEO title={collection.name} {...collection} />
      <ProductGrid products={collection.products} />
    </React.Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: any = [];

  for (const locale of locales!) {
    const collections = await getAllCollections({ locale });

    paths = [
      ...paths,
      ...collections.map((collection: any) => ({
        params: { slug: collection.slug },
        locale,
      })),
    ];
  }

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const pageData = await getPageData({ locale });
  const collection = await getCollectionBySlug({
    locale,
    slug: params?.slug as string,
  });

  return {
    props: {
      collection,
      ...pageData,
    },
    revalidate: 10
  };
};

export default CollectionPage;
