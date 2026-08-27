export type PackagingKey =
  | 'bottle'
  | 'crate'
  | 'barrel20'
  | 'barrel30'
  | 'barrel50'

export const PACKAGING_KEYS: PackagingKey[] = [
  'bottle',
  'crate',
  'barrel20',
  'barrel30',
  'barrel50'
]

export interface Product {
  name: string
  subtitle?: string
  category: string
  categoryLabel: string
  slug: string
  url: string
  description?: string
  stats: { label: string; value: string }[]
  image: string
  icon: string
  ingredients?: string
  /** Cena za lahev / jednotku v Kč */
  bottlePriceCzk?: number
  /** Cena za bednu (20 ks) v Kč */
  cratePriceCzk?: number
  /** Ceny sudů v Kč */
  kegPricesCzk?: Partial<Record<'barrel20' | 'barrel30' | 'barrel50', number>>
  /** If set, packaging options are explicit instead of derived from image files */
  packaging?: PackagingKey[]
}

export type PackagingAvailability = Record<PackagingKey, boolean>

export type Language = 'cs' | 'en' | 'de'

export interface Category {
  id: string
  label: string
}

export interface ProductVariantUrls {
  bottle: string
  crate: string
  barrel20: string
  barrel30: string
  barrel50: string
}

export interface PackagingOption {
  key: PackagingKey
  label: string
  url: string
  available: boolean
}
