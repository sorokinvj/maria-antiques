import { CategoryFragment, ProductCardFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Category, LibParams } from "types";

export const getCategorySlugQuery = gql`
  query CategorySlugQuery($locale: Locale!, $slug: String!) {
    categories(where: { slug: $slug }, locales: [$locale, en]) {
      ...CategoryFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CategoryFragment, ProductCardFragment]}
`;

export const getCategoryBySlug = async ({
  locale = "en",
  slug,
}: LibParams): Promise<Category> => {
  const {
    categories: [category],
  }: { categories: Category[] } = await hygraphClient.request(
    getCategorySlugQuery,
    {
      locale,
      slug,
    }
  );

  return category;
};
