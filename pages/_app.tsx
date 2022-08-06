import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import React from "react";
import { CartProvider } from "react-use-cart";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default App;
