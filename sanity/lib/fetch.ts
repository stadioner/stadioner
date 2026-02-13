import 'server-only'

import { client } from '@/sanity/lib/client'

type SanityFetchOptions = {
  query: string
  params?: Record<string, unknown>
  revalidate?: number | false
  tags?: string[]
}

export const sanityFetch = async <T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: SanityFetchOptions): Promise<T> => {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}
