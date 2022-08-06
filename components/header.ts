import Link from 'next/link'
import { useCart } from 'react-use-cart'

// @ts-expect-error TS(2307): Cannot find module '@/utils/format-currency-value'... Remove this comment to see the full error message
import { formatCurrencyValue } from '@/utils/format-currency-value'
// @ts-expect-error TS(2307): Cannot find module '@/svgs' or its corresponding t... Remove this comment to see the full error message
import { HygraphSVG } from '@/svgs'
// @ts-expect-error TS(2307): Cannot find module '@/icons' or its corresponding ... Remove this comment to see the full error message
import { ShoppingCartIcon } from '@/icons'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'

function Header({ pages = [] }) {
  const { cartTotal } = useCart()
  const { activeCurrency } = useSettingsContext()

  return (
    // @ts-expect-error TS(2552): Cannot find name 'header'. Did you mean 'Headers'?
    <header className="max-w-7xl mx-auto bg-white flex-grow flex items-center justify-between px-4 sm:px-6">
      // @ts-expect-error TS(2304): Cannot find name 'div'.
      <div className="py-6 w-full">
        // @ts-expect-error TS(2304): Cannot find name 'nav'.
        <nav className="flex items-center justify-between flex-wrap space-x-4">
          // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
          <Link href="/">
            // @ts-expect-error TS(2304): Cannot find name 'a'.
            <a>
              // @ts-expect-error TS(2304): Cannot find name 'className'.
              <HygraphSVG className="h-auto text-primary w-5" />
            </a>
          </Link>
          {pages.length ? (
            // @ts-expect-error TS(2304): Cannot find name 'ul'.
            <ul className="hidden md:mx-auto md:block md:flex-grow">
              // @ts-expect-error TS(2304): Cannot find name 'li'.
              {pages.map((page: any) => <li
                // @ts-expect-error TS(2304): Cannot find name 'key'.
                key={page.id}
                // @ts-expect-error TS(2304): Cannot find name 'className'.
                className="block my-4 md:inline-block md:my-0"
              >
                // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
                <Link href={`/${page.type.toLowerCase()}/${page.slug}`}>
                  // @ts-expect-error TS(2304): Cannot find name 'a'.
                  <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-medium">
                    // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                    {page.name}
                  </a>
                </Link>
              </li>)}
            </ul>
          ) : null}
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div className="flex items-center">
            // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
            <Link href="/cart">
              // @ts-expect-error TS(2304): Cannot find name 'a'.
              <a className="flex space-x-2">
                <ShoppingCartIcon
                  // @ts-expect-error TS(2304): Cannot find name 'className'.
                  className="h-6 w-6 text-gray-400"
                  // @ts-expect-error TS(2304): Cannot find name 'aria'.
                  aria-hidden="true"
                />
                // @ts-expect-error TS(2304): Cannot find name 'span'.
                <span className="text-gray-900">
                  {formatCurrencyValue({
                    // @ts-expect-error TS(7031): Binding element 'activeCurrency' implicitly has an... Remove this comment to see the full error message
                    currency: activeCurrency,
                    // @ts-expect-error TS(7031): Binding element 'cartTotal' implicitly has an 'any... Remove this comment to see the full error message
                    value: cartTotal
                  })}
                </span>
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header
