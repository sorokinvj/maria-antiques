import { ProductPageUI } from "@/components/product-page-ui";
import { SEO } from "@/components/seo";
import { getAllProducts } from "@/lib/get-all-products";
import { getPageData } from "@/lib/get-page-data";
import { getProductBySlug } from "@/lib/get-product-slug";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

function ProductPage({ product }: any) {
  return (
    <React.Fragment>
      <SEO title={product.name} {...product} />
      <ProductPageUI product={product} />
    </React.Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: any = [];

  for (const locale of locales!) {
    const products = await getAllProducts({ locale });

    paths = [
      ...paths,
      ...products.map((product: any) => ({
        params: { slug: product.slug },
        locale,
      })),
    ];
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const pageData = await getPageData({ locale });
  const product = await getProductBySlug({
    locale,
    slug: params?.slug as string,
  });

  return {
    props: {
      product,
      ...pageData,
    },
  };
};

export default ProductPage;
