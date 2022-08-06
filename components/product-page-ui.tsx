// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'

// @ts-expect-error TS(2307): Cannot find module '@/ui/button' or its correspond... Remove this comment to see the full error message
import Button from '@/ui/button'
// @ts-expect-error TS(2307): Cannot find module '@/icons' or its corresponding ... Remove this comment to see the full error message
import { ChevronDownSmallIcon } from '@/icons'
// @ts-expect-error TS(2307): Cannot find module '@/utils/format-currency-value'... Remove this comment to see the full error message
import { formatCurrencyValue } from '@/utils/format-currency-value'
// @ts-expect-error TS(2307): Cannot find module '@/components/product-reviews' ... Remove this comment to see the full error message
import ProductReviews from '@/components/product-reviews'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'

function ProductPageUI({
  product
}: any) {
  const { addItem } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [variantQuantity, setVariantQuantity] = React.useState(1)

  const hasVariant =
    router.query.variantId !== undefined ||
    product.variants[0]?.id !== undefined
  const [activeVariantId, setActiveVariantId] = React.useState(
    hasVariant ? router.query.variantId || product.variants[0]?.id : product.id
  )

  useEffect(() => {
    const url = `/products/${product.slug}?variant=${activeVariantId}`

    router.replace(url, url, { shallow: true })
  }, [activeVariantId])

  const updateQuantity = (event: any) => setVariantQuantity(Number(event.target.value))

  const updateVariant = (event: any) => setActiveVariantId(event.target.value)

  const [primaryImage] = product.images

  const addToCart = () => {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...product.localizations.find(
            (localization: any) => localization.locale === locale
          )
        }
      }),
      {}
    )

    addItem(
      {
        id: activeVariantId,
        productId: product.id,
        image: product.images[0],
        price: product.price,
        ...itemMetadata
      },
      variantQuantity
    )
  }

  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="lg:flex -mx-6">
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Image
            src={primaryImage?.url}
            height={primaryImage?.height}
            width={primaryImage?.width}
            alt={product?.name}
            title={product?.name}
          />
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="px-6 md:py-3 lg:w-1/2">
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
          {product.name}
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </h1>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="mb-6">
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <p className="font-semibold text-2xl text-slategray">
            {formatCurrencyValue({
              currency: activeCurrency,
              value: product.price
            })}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </p>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="mb-6">
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <p className="leading-loose text-lightgray">{product.description}</p>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="md:flex md:flex-wrap -mx-3">
          {product.variants.length > 1 ? (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div className="md:w-3/4 px-3 mb-6">
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="style"
              >
                Style
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </label>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div className="relative">
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <select
                  id="style"
                  name="style"
                  value={activeVariantId}
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                  onChange={updateVariant}
                >
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  {product.variants.map((variant: any) => <option key={variant.id} value={variant.id}>
                    {variant.name}
                  {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </option>)}
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </select>
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ChevronDownSmallIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </div>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          ) : null}
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className="md:w-1/4 px-3 mb-6">
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <label
              className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
              htmlFor="quantity"
            >
              Quantity
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </label>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div className="relative">
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <select
                id="quantity"
                name="quantity"
                value={variantQuantity}
                className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                onChange={updateQuantity}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const value = Number(i + 1)

                  return (
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <option key={value} value={value}>
                      {value}
                    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                    </option>
                  )
                })}
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </select>
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ChevronDownSmallIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </div>
            {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={addToCart}>Add to cart</Button>

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ProductReviews product={product} />
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
}

export default ProductPageUI
