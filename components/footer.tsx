import { useRouter } from 'next/router'
import Link from 'next/link'

// @ts-expect-error TS(2307): Cannot find module '@/icons' or its corresponding ... Remove this comment to see the full error message
import { GitHubIcon, TwitterIcon } from '@/icons'
// @ts-expect-error TS(2307): Cannot find module '@/ui/form' or its correspondin... Remove this comment to see the full error message
import { Select } from '@/ui/form'
// @ts-expect-error TS(2307): Cannot find module 'hygraph.config' or its corresp... Remove this comment to see the full error message
import { currencies, locales } from 'hygraph.config'
// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { useSettingsContext } from '@/context/settings'

function Footer({ categories = [], collections = [] }) {
  const router = useRouter()
  const { activeCurrency, switchCurrency } = useSettingsContext()

  const activeLocale = locales.find((locale: any) => locale.value === router.locale)

  const updateCurrency = (event: any) => {
    const currency = currencies.find(
      (currency: any) => currency.code === event.target.value
    )

    switchCurrency(currency)
  }

  const updateLocale = (event: any) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'

    router.push(path, path, { locale: event.target.value })
  }

  const currentYear = new Date().getUTCFullYear()

  return (
    // @ts-expect-error TS(2304): Cannot find name 'footer'.
    <footer className="bg-white" aria-labelledby="footerHeading">
      // @ts-expect-error TS(2304): Cannot find name 'h2'.
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      // @ts-expect-error TS(2304): Cannot find name 'div'.
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            // @ts-expect-error TS(2304): Cannot find name 'div'.
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              {categories.length ? (
                // @ts-expect-error TS(2304): Cannot find name 'div'.
                <div>
                  // @ts-expect-error TS(2304): Cannot find name 'h3'.
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    // @ts-expect-error TS(2304): Cannot find name 'Categories'.
                    Categories
                  </h3>
                  // @ts-expect-error TS(2304): Cannot find name 'ul'.
                  <ul className="mt-4 space-y-4">
                    // @ts-expect-error TS(2304): Cannot find name 'li'.
                    {categories.map((category: any) => <li key={category.id}>
                      // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
                      <Link
                        // @ts-expect-error TS(2304): Cannot find name 'href'.
                        href={`/${category.type.toLowerCase()}/${
                          // @ts-expect-error TS(2304): Cannot find name 'category'.
                          category.slug
                        }`}
                      >
                        // @ts-expect-error TS(2304): Cannot find name 'a'.
                        <a className="text-base text-gray-500 hover:text-gray-900">
                          // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                          {category.name}
                        </a>
                      </Link>
                    </li>)}
                  </ul>
                </div>
              ) : null}
              {collections.length ? (
                // @ts-expect-error TS(2304): Cannot find name 'div'.
                <div>
                  // @ts-expect-error TS(2304): Cannot find name 'h3'.
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    // @ts-expect-error TS(2304): Cannot find name 'Collections'.
                    Collections
                  </h3>
                  // @ts-expect-error TS(2304): Cannot find name 'ul'.
                  <ul className="mt-4 space-y-4">
                    // @ts-expect-error TS(2304): Cannot find name 'li'.
                    {collections.map((collection: any) => <li key={collection.id}>
                      // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
                      <Link
                        // @ts-expect-error TS(2304): Cannot find name 'href'.
                        href={`/${collection.type.toLowerCase()}/${
                          // @ts-expect-error TS(2304): Cannot find name 'collection'.
                          collection.slug
                        }`}
                      >
                        // @ts-expect-error TS(2304): Cannot find name 'a'.
                        <a className="text-base text-gray-500 hover:text-gray-900">
                          // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                          {collection.name}
                        </a>
                      </Link>
                    </li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div className="mt-12 xl:mt-0">
            // @ts-expect-error TS(2304): Cannot find name 'h3'.
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              // @ts-expect-error TS(2304): Cannot find name 'Language'.
              Language &amp; Currency
            </h3>
            // @ts-expect-error TS(2304): Cannot find name 'form'.
            <form className="mt-4 space-y-4 sm:max-w-xs">
              <Select
                // @ts-expect-error TS(2304): Cannot find name 'className'.
                className="w-full"
                // @ts-expect-error TS(2304): Cannot find name 'defaultValue'.
                defaultValue={activeLocale.value}
                // @ts-expect-error TS(2304): Cannot find name 'field'.
                field="language"
                // @ts-expect-error TS(2304): Cannot find name 'label'.
                label="Language"
                // @ts-expect-error TS(2304): Cannot find name 'onChange'.
                onChange={updateLocale}
                // @ts-expect-error TS(2304): Cannot find name 'options'.
                options={locales}
              />
              <Select
                // @ts-expect-error TS(2304): Cannot find name 'className'.
                className="w-full"
                // @ts-expect-error TS(2304): Cannot find name 'defaultValue'.
                defaultValue={activeCurrency.code}
                // @ts-expect-error TS(2304): Cannot find name 'field'.
                field="currency"
                // @ts-expect-error TS(2304): Cannot find name 'label'.
                label="Currency"
                // @ts-expect-error TS(2304): Cannot find name 'onChange'.
                onChange={updateCurrency}
                // @ts-expect-error TS(2304): Cannot find name 'options'.
                options={currencies.map((currency: any) => ({
                  label: currency.code,
                  value: currency.code
                }))}
              />
            </form>
          </div>
        </div>
        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div className="flex space-x-6 md:order-2">
            // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
            <Link href="https://twitter.com/hygraphcom">
              // @ts-expect-error TS(2304): Cannot find name 'a'.
              <a className="text-gray-400 hover:text-gray-500">
                // @ts-expect-error TS(2304): Cannot find name 'span'.
                <span className="sr-only">Twitter</span>
                // @ts-expect-error TS(2304): Cannot find name 'className'.
                <TwitterIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>
            // @ts-expect-error TS(2304): Cannot find name 'href'.
            <Link href="https://github.com/Hygraph">
              // @ts-expect-error TS(2304): Cannot find name 'a'.
              <a className="text-gray-400 hover:text-gray-500">
                // @ts-expect-error TS(2304): Cannot find name 'span'.
                <span className="sr-only">GitHub</span>
                // @ts-expect-error TS(2304): Cannot find name 'className'.
                <GitHubIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>
          </div>
          // @ts-expect-error TS(2304): Cannot find name 'p'.
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            // @ts-expect-error TS(2304): Cannot find name 'copy'.
            &copy; {currentYear} GraphCMS GmbH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
