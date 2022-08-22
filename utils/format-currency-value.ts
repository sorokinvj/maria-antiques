import { Currency } from 'types'

export const formatCurrencyValue = ({
  currency,
  value
}: {
  currency: Currency
  value?: number
}) => {
  if (!value) {
    return ''
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(value)
}
