import Stripe from 'stripe'

export const getShippingCost = (
  shipping_cost: Stripe.Checkout.Session.ShippingCost | null
) => {
  if (!shipping_cost) {
    return 'Shipping cost was not provided'
  } else if (shipping_cost.amount_total === 0) {
    return 'Free shipping'
  }
  return `${shipping_cost.amount_total / 100} euro`
}
