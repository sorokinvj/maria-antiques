import { Form } from "@/components/ui/form/form";
import { FormInput } from "@/components/ui/form/form-input";
import { ProductReviewsQuery } from "@/graphql/queries/reviews";
import Button from "@/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import * as yup from "yup";
import { FormTextarea } from "./ui/form/form-textarea";

function ProductReviewForm({ product }: any) {
  const { handleSubmit, ...formMethods } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(),
        email: yup.string().required().email(),
        headline: yup.string().required(),
        name: yup.string().required(),
      })
    ),
  });

  const onSubmit = async (data: any) => {
    mutate(
      [ProductReviewsQuery, product.id],
      async ({ reviews: { aggregate, edges } }: any) => {
        try {
          const { review } = await fetch(
            "/api/graphcms/create-product-review",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product: { connect: { id: product.id } },
                ...data,
              }),
            }
          ).then((res) => res.json());

          return {
            reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }],
            },
          };
        } catch (error) {
          console.log(error);
        }
      },
      false
    );
  };

  return (
    <Form
      className="space-y-4"
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput field="headline" />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput field="name" />
        <FormInput field="email" />
      </div>
      <FormTextarea field="content" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default ProductReviewForm;
