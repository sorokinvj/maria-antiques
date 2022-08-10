export const convertPriceFormat = (side, price) => {
  if (side === 'cmsToStripe') {
    return price * 100
  }
  if (side === 'stripeToCms') {
    return price / 100
  }
}