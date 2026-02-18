import { PortableTextBlock } from 'sanity'

export interface Event {
  _id: string
  translationKey?: string
  title: string
  slug: {
    current: string
  }
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
  description?: PortableTextBlock[]
}
