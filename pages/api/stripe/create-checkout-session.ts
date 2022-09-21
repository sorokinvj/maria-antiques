import { CURRENCY } from '@/constants'
import stripe from '@/lib/stripe-client'
import { convertPriceFormat } from '@/utils/convert-price-format'
import { getShippingOptions } from '@/utils/getShippingOptions'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Item } from 'react-use-cart'
import Stripe from 'stripe'

interface CheckoutSessionBody {
  items: Item[]
  success_url: string
  cancel_url: string
  cartTotal: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { items, success_url, cancel_url, cartTotal }: CheckoutSessionBody =
      req.body

    const line_items = items.map((item) => ({
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: item.name,
          images: [item.image.url],
          metadata: {
            productId: item.id
          }
        },
        unit_amount: convertPriceFormat('cmsToStripe', item.price),
        tax_behavior:
          'exclusive' as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.TaxBehavior
      },
      quantity: 1
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      payment_method_types: ['card'],
      success_url: `${success_url}?id={CHECKOUT_SESSION_ID}`,
      cancel_url,
      shipping_address_collection: {
        // prettier-ignore
        allowed_countries: [ "AF", "AX", "AL", "DZ", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MQ", "MR", "MU", "YT", "MX", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NO", "OM", "PK", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SR", "SJ", "SZ", "SE", "CH", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN", "VG", "WF", "EH", "YE", "ZM", "ZW" ]
      },
      shipping_options: getShippingOptions(cartTotal, items.length),
      automatic_tax: {
        enabled: true
      }
    })

    res.status(201).json({ session })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error
    })
  }
}

export default handler
