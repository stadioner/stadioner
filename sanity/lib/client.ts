import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { cache } from 'react'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const cachedClient = cache(client.fetch.bind(client))
