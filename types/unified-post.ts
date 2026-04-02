import type { PortableTextBlock } from 'sanity'
import type { UnifiedCategory } from '@/types/unified-category'
import type { LocalizedValue } from '@/types/unified-category'

export interface UnifiedCategoryReference {
  _key: string
  _type: 'reference'
  _ref: string
}

export interface UnifiedPost {
  _id: string
  _updatedAt?: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt?: string
  featured?: boolean
  categories?: Array<UnifiedCategory | UnifiedCategoryReference>
  title?: LocalizedValue<string>
  slug?: LocalizedValue<{ current?: string }>
  body?: LocalizedValue<PortableTextBlock[]>
}
