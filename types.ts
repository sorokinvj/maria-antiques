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
}

export interface LibParams {
  slug?: string
}

interface LocalProduct {
  name: string
  slug: string
}
