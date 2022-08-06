// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
import { DefaultSeo } from 'next-seo'

// @ts-expect-error TS(2307): Cannot find module 'next-seo.config' or its corres... Remove this comment to see the full error message
import { defaultSeo } from 'next-seo.config'
// @ts-expect-error TS(2307): Cannot find module '@/components/footer' or its co... Remove this comment to see the full error message
import Footer from '@/components/footer'
// @ts-expect-error TS(2307): Cannot find module '@/components/header' or its co... Remove this comment to see the full error message
import Header from '@/components/header'

function Layout({
  children,
  footer,
  navigation
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DefaultSeo {...defaultSeo} />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Header {...navigation} />
      {/* @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Footer {...footer} />
    </React.Fragment>
  )
}

export default Layout
