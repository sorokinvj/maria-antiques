import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { CartProvider } from 'react-use-cart'
import 'styles/index.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      {/* <Layout {...pageProps}> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </CartProvider>
  )
}

export default App
