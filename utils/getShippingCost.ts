import { CURRENCY } from '@/constants'
import Stripe from 'stripe'
import { formatCurrencyValue } from './format-currency-value'

export const getShippingCost = (
  shipping_cost: Stripe.Checkout.Session.ShippingCost | null
) => {
  if (!shipping_cost) {
    return 'Shipping cost was not provided'
  } else if (shipping_cost.amount_total === 0) {
    return 'FREE'
  }
  return formatCurrencyValue({
    currency: CURRENCY,
    value: shipping_cost.amount_total / 100
  })
}
