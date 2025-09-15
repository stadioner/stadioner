import { TypedObject } from 'sanity'

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
  language: string
}

export interface Author {
  _id: string
  name: string
  image: string
  bio?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  language: string
  excerpt?: string
  author: Author
  mainImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt: string
  featured: boolean
  categories: Category[]
  body: TypedObject
  seo?: SEO
}

export interface Language {
  id: string
  title: string
  flag: string
}

export type SupportedLanguage = 'cs' | 'en' | 'de'
