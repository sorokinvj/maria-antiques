import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'

// @ts-expect-error TS(2307): Cannot find module '@/context/settings' or its cor... Remove this comment to see the full error message
import { SettingsProvider } from '@/context/settings'
// @ts-expect-error TS(2307): Cannot find module '@/components/layout' or its co... Remove this comment to see the full error message
import Layout from '@/components/layout'

function App({
  Component,
  pageProps
}: any) {
  return (
    // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
    <SettingsProvider>
      // @ts-expect-error TS(2749): 'CartProvider' refers to a value, but is being use... Remove this comment to see the full error message
      <CartProvider>
        <Layout {...pageProps}>
          // @ts-expect-error TS(2749): 'Component' refers to a value, but is being used a... Remove this comment to see the full error message
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
