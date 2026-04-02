import type { PortableTextBlock } from 'sanity'

export interface LocalizedValue<T> {
  cs?: T
  en?: T
  de?: T
}

export interface UnifiedEvent {
  _id: string
  _updatedAt?: string
  dateTime: string
  endDateTime?: string
  location?: string
  isComingSoon?: boolean
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  rsvpCount?: number
  rsvpVoterHashes?: string[]
  title?: LocalizedValue<string>
  slug?: LocalizedValue<{ current?: string }>
  description?: LocalizedValue<PortableTextBlock[]>
  recap?: LocalizedValue<PortableTextBlock[]>
}

export const supportedEventLanguages = ['cs', 'en', 'de'] as const
