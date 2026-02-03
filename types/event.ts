import { PortableTextBlock } from 'sanity'

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  dateTime: string
  endDateTime?: string
  location?: string
  isComingSoon?: boolean
  mainImage?: any
  description?: PortableTextBlock[]
}
