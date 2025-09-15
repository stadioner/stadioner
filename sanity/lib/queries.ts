import { groq } from 'next-sanity'

// Language-specific queries
export const postsByLanguageQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    excerpt,
    author->{
      name,
      image
    },
    mainImage,
    publishedAt,
    featured,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    body,
    seo
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    excerpt,
    author->{
      name,
      image,
      bio
    },
    mainImage,
    publishedAt,
    featured,
    categories[]->{
      _id,
      title,
      slug,
      color,
      description
    },
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
    _id,
    title,
    slug,
    language,
    excerpt,
    author->{
      name,
      image
    },
    mainImage,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && language == $language && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    language,
    excerpt,
    author->{
      name,
      image
    },
    mainImage,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && language == $language && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    excerpt,
    author->{
      name,
      image
    },
    mainImage,
    publishedAt,
    featured,
    categories[]->{
      _id,
      title,
      slug,
      color
    }
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
        author->,
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
        author->,
        categories[]->
    }
`
