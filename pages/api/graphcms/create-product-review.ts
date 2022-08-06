import hygraphMutationClient, { gql } from "@/lib/hygraph-mutation-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { review } = await hygraphMutationClient.request(
      gql`
        mutation CreateProductReview($review: ReviewCreateInput!) {
          review: createReview(data: $review) {
            id
          }
        }
      `,
      { review: req.body }
    );

    const { publishedReview } = await hygraphMutationClient.request(
      gql`
        mutation PublishProductReview($id: ID!) {
          publishedReview: publishReview(where: { id: $id }) {
            id
            content
            createdAt
            email
            headline
            name
            rating
          }
        }
      `,
      { id: review.id }
    );

    res.status(201).json({ review: publishedReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "There was a problem submitting your review!",
    });
  }
};
