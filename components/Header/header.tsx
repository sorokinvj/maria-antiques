import { CURRENCY } from '@/constants'
import { useHasMounted } from '@/hooks/useHasMounted'
import { LogoIcon, ShoppingCartIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import Link from 'next/link'
import { useCart } from 'react-use-cart'
import { Page, StaticPage } from 'types'
import { InfoPageLink } from './InfoPageLink'
import { NavigationLink } from './NavigationLink'

interface Props {
  pages: Page[]
  infoPages: StaticPage[]
}

export const Header: React.FC<Props> = ({ pages = [], infoPages = [] }) => {
  const { cartTotal } = useCart()
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return (
    <header className="sticky top-0 z-50 max-w-7xl mx-auto bg-white flex-grow flex items-center justify-between px-4 sm:px-6">
      <div className="mt-6 pb-2 w-full">
        <nav className="flex items-center justify-between space-x-4 h-20 pr-2">
          <Link href="/">
            <a className="w-72 ml-4 mr-8">
              <LogoIcon />
            </a>
          </Link>
          {pages.length ? (
            <ul className="hidden md:mx-auto md:block md:flex-grow">
              {pages.map(NavigationLink)}
            </ul>
          ) : null}
          {infoPages.length ? (
            <ul className="hidden md:ml-auto md:block md:flex-grow">
              {infoPages.map(InfoPageLink)}
            </ul>
          ) : null}
          <div className="flex items-center">
            <Link href="/cart">
              <a className="flex space-x-3">
                <ShoppingCartIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-gray-900 font-semibold">
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
