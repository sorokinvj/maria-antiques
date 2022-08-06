import stripe from "@/lib/stripe-client";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

const stripeSigningSecret = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const signature = req.headers["stripe-signature"] || "";
  const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET || "";
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(`StripeSigningSecret webhook error: ${(error as any).message}`);
  }
  return handler(req, res, event);
};

export default stripeSigningSecret;
