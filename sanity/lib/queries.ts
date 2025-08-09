import { groq } from 'next-sanity'

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
        writtenby->,
        categories[]->
    }
`
