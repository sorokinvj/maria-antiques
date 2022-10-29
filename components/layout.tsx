import { Footer } from '@/components/footer'
import { Header } from '@/components/Header/header'
import { DefaultSeo } from 'next-seo'
import { defaultSeo } from 'next-seo.config'
import React from 'react'
import { Category, Collection, Page, StaticPage } from 'types'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  footer: {
    categories: Category[]
    collections: Collection[]
    staticPages: StaticPage[]
  }
  header: {
    pages: Page[]
    infoPages: StaticPage[]
  }
}

const Layout: React.FC<Props> = ({ children, footer, header }) => {
  return (
    <React.Fragment>
      <DefaultSeo {...defaultSeo} />
      <Header {...header} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
      <Footer {...footer} />
    </React.Fragment>
  )
}

export default Layout
