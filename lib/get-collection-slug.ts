import {
  CollectionFragment,
  ProductCardFragment,
} from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Collection, LibParams } from "types";

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, en]) {
      ...CollectionFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`;

export const getCollectionBySlug = async ({
  locale = "en",
  slug,
}: LibParams): Promise<Collection> => {
  const {
    collections: [collection],
  } = await hygraphClient.request(getCollectionSlugQuery, {
    locale,
    slug,
  });

  return collection;
};
