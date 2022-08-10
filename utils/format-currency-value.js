export const formatCurrencyValue = ({ currency, value }) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
    //prices are in euros in cms and in cents in stripe, removed value conversion to cents:
  }).format(value)
