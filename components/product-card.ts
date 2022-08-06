import Link from 'next/link'
import Image from 'next/image'

// @ts-expect-error TS(2307): Cannot find module '@/utils/format-currency-value'... Remove this comment to see the full error message
import { formatCurrencyValue } from '@/utils/format-currency-value'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'

function ProductCard({
  id,
  images,
  name,
  price,
  slug
}: any) {
  const { activeCurrency } = useSettingsContext()

  const [primaryImage] = images

  return (
    // @ts-expect-error TS(2304): Cannot find name 'article'.
    <article key={id}>
      // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
      <Link href={`/products/${slug}`}>
        // @ts-expect-error TS(2304): Cannot find name 'a'.
        <a className="group no-underline w-full h-full flex">
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
            // @ts-expect-error TS(7006): Parameter '(Missing)' implicitly has an 'any' type... Remove this comment to see the full error message
            {primaryImage ? (
              // @ts-expect-error TS(7006): Parameter 'Image' implicitly has an 'any' type.
              <Image
                src={primaryImage.url}
                height={primaryImage.height}
                width={primaryImage.width}
                alt={name}
                // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                title={name}
              />
            ) : null}

            // @ts-expect-error TS(2304): Cannot find name 'div'.
            <div className="pt-3 md:pt-6 text-center">
              // @ts-expect-error TS(2304): Cannot find name 'p'.
              <p className="text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
                {name}
              </p>
              // @ts-expect-error TS(2304): Cannot find name 'p'.
              <p className="text-gray-400 text-sm">
                {formatCurrencyValue({
                  // @ts-expect-error TS(7031): Binding element 'activeCurrency' implicitly has an... Remove this comment to see the full error message
                  currency: activeCurrency,
                  // @ts-expect-error TS(7031): Binding element 'price' implicitly has an 'any' ty... Remove this comment to see the full error message
                  value: price
                })}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}

export default ProductCard
