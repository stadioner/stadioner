import { TypedObject } from 'sanity'

export interface Post {
  _id: string
  mainImage: string
  slug: {
    current: string
  }
  publishedAt: string
  author: {
    name: string
    image: string
  }
  categories: {
    _id: string
    title: string
  }[]
  title: string
  body: TypedObject
}
