import { ShippingDestination } from 'types'

export const CURRENCY = 'EUR'

export const SHIPPING_RATES_IN_EUR = {
  [ShippingDestination.europe]: {
    small: 5.35,
    medium: 6.2,
    large: 8
  },
  [ShippingDestination.worldwide]: {
    small: 6.3,
    medium: 7.3,
    large: 10.85
  },
  [ShippingDestination.us]: {
    small: 6.55,
    medium: 8.75,
    large: 12.85
  },
  [ShippingDestination.portugal]: {
    small: 3.35,
    medium: 3.95,
    large: 6.5
  }
}

// write shell command that resets npm registry
