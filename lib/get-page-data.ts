import { CategoryFragment, CollectionFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Category, Collection, LibParams, Page } from "types";

export const getPageDataQuery = gql`
  query PageDataQuery($locale: Locale!) {
    footerCategories: categories(first: 4, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(first: 1, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`;

interface PageData {
  footer: {
    categories: Category[];
    collections: Collection[];
  };
  navigation: {
    pages: Page[];
  };
}

export const getPageData = async ({ locale }: LibParams): Promise<PageData> => {
  const {
    footerCategories,
    footerCollections,
    navigationCategory,
    navigationCollection,
  } = await hygraphClient.request(getPageDataQuery, { locale });

  return {
    footer: { categories: footerCategories, collections: footerCollections },
    navigation: { pages: [...navigationCategory, ...navigationCollection] },
  };
};

export default getPageData;
