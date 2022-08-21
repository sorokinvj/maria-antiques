export type Currency = 'EUR'

export interface Image {
  url: string
  width: number
  height: number
  alt: string
  type: string
}

export interface Product {
  id: string
  images: Image[]
  name: string
  price: number
  slug: string
  variants: {
    id: string
    name: string
  }[]
  localizations: {
    locale: string
  }[]
  description: string
}

interface OrderItem {
  id: string
  product: Product
  total: number
  quantity: number
}

export interface Order {
  id: string
  total: number
  orderItems: OrderItem[]
}

export interface Collection {
  name: string
  products: Product[]
}

export interface Category {
  name: string
  slug: string
  products: Product[]
}

export interface Page {
  id: string
  name: string
  type: string
  slug: string
}

export interface LibParams {
  locale?: string
  slug?: string
}

interface LocalProduct {
  locale: string
  name: string
  slug: string
}

export interface LocaleMetadata {
  [key: string]: LocalProduct
}
