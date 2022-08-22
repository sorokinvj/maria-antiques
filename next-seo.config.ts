// write a description for SEO for a store that sell jewellery: earrings, bracelets, etc

const description =
  "Maria's Antiques is a boutique jewellery store that sells earrings, bracelets, necklaces, and more. We are a family run business and we are dedicated to providing the highest quality jewellery at the lowest prices."
const title = "Maria's Antiques"
const url = 'maria-antiques.vercel.app'

const seo = {
  title,
  titleTemplate: '%s',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  }
}

export { seo as defaultSeo, url as defaultUrl }
