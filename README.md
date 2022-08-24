# To run the project locally

## Install dependencies

`yarn`

if you see a node-gyp error `fatal error: 'vips/vips8' file not found`, then install `vips` through Homebrew:

`brew install vips`

## Put .env file under the root

## Run locally

`yarn dev`

**The main branch of the project is deployed [here](maria-antiques.vercel.app)**

## About

This project is an example of how to build fully-functioning Next.js commerce storefront with Hygraph and Stripe. View the demo on [https://commerce.withheadlesscms.com/](https://commerce.withheadlesscms.com/).

## Features

- Pre-rendered catalogue pages via [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- Dynamic client-side data fetching via [SWR](https://swr.vercel.app).
- Shopping cart with [`react-use-cart`](https://github.com/notrab/react-use-cart).
- Hosted checkout and payment flow with [Stripe Checkout](https://stripe.com/docs/payments/checkout).
- Use the [Hygraph mutation API](https://hygraph.com/mutation-api) with [API Routes](https://nextjs.org/docs/api-routes/introduction) to create orders on successful checkout (via webhook).
