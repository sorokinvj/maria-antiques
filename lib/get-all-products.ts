import { ProductCardFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { LibParams, Product } from "types";

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`;

export const getAllProducts = async ({
  locale = "en",
}: LibParams): Promise<Product[]> => {
  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale,
  });

  return products;
};
