import { FREE_SHIPPING_PRICE } from '@/constants'
import { ShippingDestination } from 'types'
import { getShippingPriceInCents } from './getShippingPrice'

interface ShippingOption {
  shipping_rate_data: {
    type: 'fixed_amount'
    fixed_amount: {
      amount: number
      currency: 'eur'
    }
    display_name: string
    delivery_estimate: {
      minimum: {
        unit: 'business_day'
        value: number
      }
      maximum: {
        unit: 'business_day'
        value: number
      }
    }
    tax_behavior: 'inclusive' | 'exclusive'
    tax_code: 'txcd_92010001' | 'txcd_00000000'
  }
}

export const getShippingOptions = (
  cartTotal: number,
  cartItemsNumber: number
): ShippingOption[] => {
  if (cartTotal > FREE_SHIPPING_PRICE) {
    return [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'eur'
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3
            },
            maximum: {
              unit: 'business_day',
              value: 7
            }
          },
          tax_behavior: 'exclusive',
          tax_code: 'txcd_00000000'
        }
      }
    ]
  }

  const shippingOptions: ShippingOption[] = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: getShippingPriceInCents(
            ShippingDestination.portugal,
            cartItemsNumber
          ),
          currency: 'eur'
        },
        display_name: 'Portugal Continental',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 3
          },
          maximum: {
            unit: 'business_day',
            value: 7
          }
        },
        tax_behavior: 'inclusive',
        tax_code: 'txcd_92010001'
      }
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: getShippingPriceInCents(
            ShippingDestination.europe,
            cartItemsNumber
          ),
          currency: 'eur'
        },
        display_name: 'Europe',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 3
          },
          maximum: {
            unit: 'business_day',
            value: 7
          }
        },
        tax_behavior: 'inclusive',
        tax_code: 'txcd_92010001'
      }
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: getShippingPriceInCents(
            ShippingDestination.us,
            cartItemsNumber
          ),
          currency: 'eur'
        },
        display_name: 'Unites States',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5
          },
          maximum: {
            unit: 'business_day',
            value: 10
          }
        },
        tax_behavior: 'inclusive',
        tax_code: 'txcd_92010001'
      }
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: getShippingPriceInCents(
            ShippingDestination.worldwide,
            cartItemsNumber
          ),
          currency: 'eur'
        },
        display_name: 'Rest of the world',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5
          },
          maximum: {
            unit: 'business_day',
            value: 10
          }
        },
        tax_behavior: 'inclusive',
        tax_code: 'txcd_92010001'
      }
    }
  ]

  return shippingOptions
}
