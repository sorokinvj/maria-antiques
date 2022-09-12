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
  shippingInfo: {
    name: string
    address: {
      city: string | null
      line1: string | null
      line2: string | null
      state: string | null
      country: string
      postal_code: string
    }
  }
  shippingCost: string
}

export interface Collection {
  slug: string
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
  title: string
}

export interface TextPage {
  id: string
  name: string
  type: string
  slug: string
  title: string
  page: {
    content: {
      html: string
    }
    heroImage: {
      url: string
      width: number
      height: number
    }
  }
}

export interface LibParams {
  slug?: string
}

export enum ShippingDestination {
  portugal = 'PT',
  europe = 'EU',
  worldwide = 'WW',
  us = 'US'
}
