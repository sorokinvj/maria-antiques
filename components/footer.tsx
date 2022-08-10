import { GitHubIcon, TwitterIcon } from "@/icons";
import config from "hygraph.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Category, Collection } from "types";
import { FormSelect } from "./ui/form/form-select";

interface Props {
  categories: Category[];
  collections: Collection[];
}

export const Footer: React.FC<Props> = ({
  categories = [],
  collections = [],
}) => {
  const router = useRouter();
  const activeLocale = config.locales.find(
    (locale: any) => locale.value === router.locale
  );

  const updateLocale = (event: any) => {
    const path = ["/cart"].includes(router.asPath) ? router.asPath : "/";
    router.push(path, path, { locale: event.target.value });
  };

  return (
    <footer className="bg-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
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
          </div>

          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase"></h3>
            <form className="mt-4 space-y-4 sm:max-w-xs">
              <FormSelect
                className="w-full"
                defaultValue={activeLocale?.value}
                field="language"
                label="Language"
                onChange={updateLocale}
                options={config.locales}
              />
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="https://twitter.com/hygraphcom">
              <a className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>

                <TwitterIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>

            <Link href="https://github.com/Hygraph">
              <a className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <GitHubIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
