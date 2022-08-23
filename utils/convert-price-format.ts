export const convertPriceFormat = (
  side: "cmsToStripe" | "stripeToCms",
  price: number
): number => {
  if (side === "cmsToStripe") {
    return price * 100;
  }
  if (side === "stripeToCms") {
    return price / 100;
  }
  return 0;
};
