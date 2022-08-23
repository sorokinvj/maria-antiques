import { CategoryFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Category, LibParams } from "types";

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery($locale: Locale!) {
    categories(locales: [$locale, en]) {
      ...CategoryFragment
    }
  }

  ${CategoryFragment}
`;

export const getAllCategories = async ({
  locale = "en",
}: LibParams): Promise<Category[]> => {
  const { categories } = await hygraphClient.request(getAllCategoriesQuery, {
    locale,
  });

  return categories;
};
