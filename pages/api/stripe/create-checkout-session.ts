import hygraphClient, { gql } from '@/lib/hygraph-client'
import stripe from '@/lib/stripe-client'
import { convertPriceFormat } from '@/utils/convert-price-format'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Image } from 'types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currency, items, locale, success_url, ...rest } = req.body

    const getProduct = async (id: string) => {
      const {
        product: { description, images, name, price, ...product }
      } = await hygraphClient.request(
        gql`
          query ProductQuery($id: ID!, $locale: Locale!) {
            product(where: { id: $id }, locales: [$locale]) {
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
          id,
          locale
        }
      )

      return {
        currency,
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
      items.map(async (item: any) => ({
        adjustable_quantity: {
          enabled: true,
          minimum: 1
        },

        price_data: await getProduct(item.productId),
        quantity: item.quantity
      }))
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      locale,
      payment_method_types: ['card'],
      success_url: `${success_url}?id={CHECKOUT_SESSION_ID}`,
      ...rest
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
