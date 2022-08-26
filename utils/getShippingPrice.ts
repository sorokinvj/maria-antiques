import { SHIPPING_RATES_IN_EUR } from '@/constants'
import { ShippingDestination } from 'types'

export const getShippingPriceInCents = (
  destination: ShippingDestination,
  cartItemsNumber: number
) => {
  if (cartItemsNumber <= 3) {
    return SHIPPING_RATES_IN_EUR[destination].small * 100
  } else if (cartItemsNumber > 3 && cartItemsNumber < 10) {
    return SHIPPING_RATES_IN_EUR[destination].medium * 100
  }
  return SHIPPING_RATES_IN_EUR[destination].large * 100
}
