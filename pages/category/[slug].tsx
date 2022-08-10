import { ProductGrid } from "@/components/product-grid";
import { SEO } from "@/components/seo";
import { getAllCategories } from "@/lib/get-all-categories";
import { getCategoryBySlug } from "@/lib/get-category-slug";
import { getPageData } from "@/lib/get-page-data";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Category } from "types";

function CategoryPage({ category }: { category: Category }) {
  return (
    <React.Fragment>
      <SEO title={category.name} {...category} />
      <ProductGrid products={category.products} />
    </React.Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: any = [];

  for (const locale of locales!) {
    const categories = await getAllCategories({ locale });

    paths = [
      ...paths,
      ...categories.map((category: Category) => ({
        params: { slug: category.slug },
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
  const category = await getCategoryBySlug({
    locale,
    slug: params?.slug as string,
  });

  return {
    props: {
      category,
      ...pageData,
    },
  };
};

export default CategoryPage;
