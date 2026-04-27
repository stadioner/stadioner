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
  /** Cena za lahev / jednotku v Kč */
  bottlePriceCzk?: number
  /** Cena za bednu (20 ks) v Kč */
  cratePriceCzk?: number
  /** Ceny sudů v Kč (barrel30 = menší sud v e-shopu, barrel50 = 50 l) */
  kegPricesCzk?: Partial<Record<'barrel30' | 'barrel50', number>>
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
