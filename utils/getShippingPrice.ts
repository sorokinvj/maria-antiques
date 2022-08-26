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

export const getAverageShippinPriceInEur = (
  cartItemsNumber: number
): number => {
  if (cartItemsNumber <= 3) {
    const allSmallShippingRates = Object.values(SHIPPING_RATES_IN_EUR).map(
      (rate) => rate.small
    )
    const averageSmallShippingRate =
      allSmallShippingRates.reduce((a, b) => a + b) /
      allSmallShippingRates.length
    return averageSmallShippingRate
  }
  if (cartItemsNumber > 3 && cartItemsNumber < 10) {
    const allMediumShippingRates = Object.values(SHIPPING_RATES_IN_EUR).map(
      (rate) => rate.medium
    )
    const averageMediumShippingRate =
      allMediumShippingRates.reduce((a, b) => a + b) /
      allMediumShippingRates.length
    return averageMediumShippingRate
  }
  const allLargeShippingRates = Object.values(SHIPPING_RATES_IN_EUR).map(
    (rate) => rate.large
  )

  const averageLargeShippingRate =
    allLargeShippingRates.reduce((a, b) => a + b) / allLargeShippingRates.length
  return averageLargeShippingRate
}
