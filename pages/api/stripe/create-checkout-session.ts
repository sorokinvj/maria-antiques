import { CURRENCY } from '@/constants'
import hygraphClient, { gql } from '@/lib/hygraph-client'
import stripe from '@/lib/stripe-client'
import { convertPriceFormat } from '@/utils/convert-price-format'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Item } from 'react-use-cart'
import { Image } from 'types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      items,
      success_url,
      cancel_url
    }: { items: Item[]; success_url: string; cancel_url: string } = req.body
    const getProduct = async (id: string) => {
      const {
        product: { description, images, name, price, ...product }
      } = await hygraphClient.request(
        gql`
          query ProductQuery($id: ID!) {
            product(where: { id: $id }) {
              productId: id
              description
              images(first: 1) {
                url
              }
              name
              price
            }
          }
        `,
        {
          id
        }
      )
      return {
        currency: CURRENCY,
        product_data: {
          description,
          metadata: {
            ...product
          },
          name,
          images: images.map((img: Image) => img.url)
        },
        unit_amount: convertPriceFormat('cmsToStripe', price)
      }
    }

    const line_items = await Promise.all(
      items.map(async (item) => ({
        price_data: await getProduct(item.id),
        quantity: item.quantity
      }))
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      payment_method_types: ['card'],
      success_url: `${success_url}?id={CHECKOUT_SESSION_ID}`,
      cancel_url
    })

    res.status(201).json({ session })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'There was a problem creating the Stripe Checkout session'
    })
  }
}

export default handler
