import { ProductFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { LibParams, Product } from "types";

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    products(where: { slug: $slug }, locales: [$locale, en]) {
      ...ProductFragment
      localizations(includeCurrent: true) {
        locale
        name
        slug
      }
    }
  }

  ${ProductFragment}
`;

export const getProductBySlug = async ({
  locale = "en",
  slug,
}: LibParams): Promise<Product> => {
  const {
    products: [product],
  } = await hygraphClient.request(getProductsSlugQuery, {
    locale,
    slug,
  });

  return product;
};

export default getProductBySlug;
