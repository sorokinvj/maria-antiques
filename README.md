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

- Fully localized product catalogue built with [Hygraph localization](https://hygraph.com/content-localization) and [Next.js](https://nextjs.org/docs/advanced-features/i18n-routing).
- Pre-rendered catalogue pages via [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- Dynamic client-side data fetching via [SWR](https://swr.vercel.app).
- Localized shopping cart with [`react-use-cart`](https://github.com/notrab/react-use-cart).
- Hosted checkout and payment flow with [Stripe Checkout](https://stripe.com/docs/payments/checkout).
- Use the [Hygraph mutation API](https://hygraph.com/mutation-api) with [API Routes](https://nextjs.org/docs/api-routes/introduction) to create orders on successful checkout (via webhook).
- Multiple currency support.

## Configuration

Project configuration for supported locales and currencies is managed in [`hygraph.config.js`](hygraph.config.js).

> It is important that the `locales` array reflects the enabled locales in your Hygraph project.

```js
module.exports = {
  locales: [
    {
      value: 'en',
      label: 'English',
      default: true
    },
    {
      value: 'de',
      label: 'German'
    }
  ],
  currencies: [
    {
      code: 'GBP',
      default: true
    },
    {
      code: 'EUR'
    }
  ]
}
```
