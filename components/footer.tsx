import Link from 'next/link'
import React from 'react'
import { Category, Collection, StaticPage } from 'types'

interface Props {
  categories: Category[]
  collections: Collection[]
  staticPages: StaticPage[]
}

export const Footer: React.FC<Props> = ({
  categories = [],
  collections = [],
  staticPages = []
}) => {
  return (
    <footer className="bg-gray-50" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-8 md:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-8 xl:col-span-4">
          <div className="space-y-12 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
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

            {staticPages.length ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Information
                </h3>
                <ul className="mt-4 space-y-4">
                  {staticPages.map((page) => (
                    <li key={page.title}>
                      <Link href={`/pages/${page.slug}`}>
                        <a className="text-base text-gray-500 hover:text-gray-900">
                          {page.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
