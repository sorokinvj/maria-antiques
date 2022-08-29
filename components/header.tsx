import { CURRENCY } from '@/constants'
import { useHasMounted } from '@/hooks/useHasMounted'
import { LogoIcon, ShoppingCartIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Link from 'next/link'
import { useCart } from 'react-use-cart'
import { Page } from 'types'

interface Props {
  pages: Page[]
}

export const Header: React.FC<Props> = ({ pages = [] }) => {
  const { cartTotal } = useCart()
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return (
    <header className="max-w-7xl mx-auto bg-white flex-grow flex items-center justify-between px-4 sm:px-6">
      <div className="py-6 w-full">
        <nav className="flex items-center justify-between space-x-4 h-20">
          <Link href="/">
            <a className="w-72 ml-4 mr-8">
              <LogoIcon />
            </a>
          </Link>
          {pages.length ? (
            <ul className="hidden md:mx-auto md:block md:flex-grow">
              {pages.map((page: Page) => (
                <li
                  key={page.id}
                  className="block my-4 md:inline-block md:my-0"
                >
                  <Link href={`/${page.type.toLowerCase()}/${page.slug}`}>
                    <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-semibold">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex items-center">
            <Link href="/cart">
              <a className="flex space-x-2" data-testid="cart-link">
                <ShoppingCartIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-gray-900 font-semibold" data-testid="header-cart-total">
                  {formatCurrencyValue({
                    currency: CURRENCY,
                    value: cartTotal
                  })}
                </span>
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
