import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Category, Collection } from 'types'
import nextConfig from '../next.config'
import { Select } from './ui/form/form-select'

interface Props {
  categories: Category[]
  collections: Collection[]
}

export const Footer: React.FC<Props> = ({
  categories = [],
  collections = []
}) => {
  const router = useRouter()
  const activeLocale = router.locale

  const localeOptions = nextConfig.i18n.locales.map((locale) => ({
    value: locale,
    label: locale === 'en' ? 'English' : 'Português'
  }))

  const updateLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'
    router.push(path, path, { locale: event.target.value })
  }

  return (
    <footer className="bg-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 xl:col-span-4">
          <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {categories.length ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Categories
                </h3>
                <ul className="mt-4 space-y-4">
                  {categories.map((category: any) => (
                    <li key={category.id}>
                      <Link
                        href={`/${category.type.toLowerCase()}/${
                          category.slug
                        }`}
                      >
                        <a className="text-base text-gray-500 hover:text-gray-900">
                          {category.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {collections.length ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Collections
                </h3>
                <ul className="mt-4 space-y-4">
                  {collections.map((collection: any) => (
                    <li key={collection.id}>
                      <Link
                        href={`/${collection.type.toLowerCase()}/${
                          collection.slug
                        }`}
                      >
                        <a className="text-base text-gray-500 hover:text-gray-900">
                          {collection.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="xl:mt-0 flex flex-col justify-self-end">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Language
            </h3>
            <form className="mt-4 space-y-4 sm:max-w-xs">
              <Select
                className="w-full"
                defaultValue={activeLocale}
                field="language"
                label="Language"
                onChange={updateLocale}
                options={localeOptions}
              />
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
