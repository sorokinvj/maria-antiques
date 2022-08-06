import hygraphClient, { gql } from "@/lib/hygraph-client";
import { Order } from "types";

export const getOrderSessionIdQuery = gql`
  query OrderSessionIdQuery($id: String!) {
    orders(first: 1, stage: DRAFT, where: { stripeCheckoutId: $id }) {
      id
      orderItems {
        id
        product {
          images {
            id
            height
            url
            width
          }
          name
        }
        quantity
        total
      }
      total
    }
  }
`;

export async function getOrderBySessionId({
  id,
}: {
  id: string | string[] | undefined;
}): Promise<Order> {
  if (!id) {
    throw new Error("getOrderBySessionId: id is required");
  }
  const {
    orders: [order],
  } = await hygraphClient.request(getOrderSessionIdQuery, {
    id,
  });

  return order;
}
