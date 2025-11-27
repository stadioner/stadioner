export interface Product {
  name: string
  subtitle: string
  category: string
  categoryLabel: string
  slug: string
  url: string
  description: string
  stats: { label: string; value: string }[]
  image: string
  icon: string
  ingredients: string
}

export type PackagingKey = 'bottle' | 'crate' | 'barrel30' | 'barrel50'

export type PackagingAvailability = Record<PackagingKey, boolean>

export type Language = 'cs' | 'en' | 'de'

export interface Category {
  id: string
  label: string
}

export interface ProductVariantUrls {
  bottle: string
  crate: string
  barrel30: string
  barrel50: string
}

export interface PackagingOption {
  key: PackagingKey
  label: string
  url: string
  available: boolean
}

