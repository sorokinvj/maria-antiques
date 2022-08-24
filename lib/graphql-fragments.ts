import { gql } from '@/lib/hygraph-client'

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    description
    name
    slug
  }
`
export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    description
    name
    slug
  }
`

export const ImageFragment = gql`
  fragment ImageFragment on Asset {
    id
    height
    url
    width
  }
`

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    description
    images {
      ...ImageFragment
    }
    name
    price
    slug
  }

  ${[ImageFragment]}
`

export const ProductCardFragment = gql`
  fragment ProductCardFragment on Product {
    id
    images(first: 1) {
      ...ImageFragment
    }
    name
    price
    slug
  }

  ${[ImageFragment]}
`
