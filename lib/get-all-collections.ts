import { CollectionFragment } from "@/lib/graphql-fragments";
import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Collection, LibParams } from "types";

export const getAllCollectionsQuery = gql`
  query AllCollectionsQuery($locale: Locale!) {
    collections(locales: [$locale, en]) {
      ...CollectionFragment
    }
  }

  ${CollectionFragment}
`;

export const getAllCollections = async ({
  locale = "en",
}: LibParams): Promise<Collection[]> => {
  const { collections } = await hygraphClient.request(getAllCollectionsQuery, {
    locale,
  });

  return collections;
};
