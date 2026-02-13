import { groq } from 'next-sanity'

const postCategoryProjection = `
  categories[]->{
    _id,
    title,
    slug
  }
`

const postListProjection = `
  _id,
  title,
  slug,
  language,
  mainImage,
  publishedAt,
  featured,
  excerpt,
  ${postCategoryProjection}
`

const eventListProjection = `
  _id,
  title,
  slug,
  dateTime,
  endDateTime,
  location,
  isComingSoon
`

// Language-specific queries
export const postsByLanguageQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) {${postListProjection}}
`

export const postsListByLanguageQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) {${postListProjection}}
`

export const postsForSitemapByLanguageQuery = groq`
  *[_type == "post" && language == $language && defined(slug.current)] | order(publishedAt desc) {
    slug,
    publishedAt
  }
`

export const postLanguageVariantsBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && language in $languages]{
    language
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    mainImage,
    publishedAt,
    featured,
    ${postCategoryProjection},
    body,
    seo
  }
`

export const categoriesByLanguageQuery = groq`
  *[_type == "category" && language == $language] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && language == $language && featured == true] | order(publishedAt desc) [0...$limit] {
    ${postListProjection}
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && language == $language && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] {
    ${postListProjection}
  }
`

export const recentPostsQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) [0...$limit] {
    ${postListProjection}
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && language == $language && $categoryId in categories[]._ref] | order(publishedAt desc) {
    ${postListProjection}
  }
`

export const postsPathsByLanguageQuery = groq`
  *[_type == "post" && language == $language && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }
`

// Legacy queries for backward compatibility
export const PostsQuery = groq`
    *[_type=='post'] {
        ...,
        categories[]->
    }
`

export const PostsPathsQuery = groq`
    *[_type == "post" && defined(slug.current)][]{
        "params": { "slug": slug.current }
    }
`

export const PostQuery = groq`
    *[_type == "post" && slug.current == $slug][0]{
        ...,
        categories[]->
    }
`

export const eventsByLanguageQuery = groq`
  *[_type == "event" && language == $language] | order(dateTime asc) {${eventListProjection}}
`

export const eventsListByLanguageQuery = groq`
  *[_type == "event" && language == $language] | order(dateTime asc) {${eventListProjection}}
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && language == $language && dateTime >= now()] | order(dateTime asc) {${eventListProjection}}
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    dateTime,
    endDateTime,
    location,
    isComingSoon,
    mainImage,
    description
  }
`

export const eventsPathsByLanguageQuery = groq`
  *[_type == "event" && language == $language && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }
`

export const eventsForSitemapByLanguageQuery = groq`
  *[_type == "event" && language == $language && defined(slug.current)] | order(dateTime asc) {
    slug,
    dateTime,
    endDateTime,
    _updatedAt
  }
`

export const eventLanguageVariantsBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && language in $languages]{
    language
  }
`
