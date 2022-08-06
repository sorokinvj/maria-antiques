// @ts-expect-error TS(2307): Cannot find module '@/lib/hygraph-client' or its c... Remove this comment to see the full error message
import hygraphClient, { gql } from '@/lib/hygraph-client'
// @ts-expect-error TS(2307): Cannot find module '@/lib/stripe-client' or its co... Remove this comment to see the full error message
import stripe from '@/lib/stripe-client'

export default async (req: any, res: any) => {
  try {
    const { currency, items, locale, success_url, ...rest } = req.body

    const getProduct = async (id: any) => {
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
          images: images.map((img: any) => img.url)
        },
        unit_amount: price
      };
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
