import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN in production for published content. Local dev keeps fresh responses.
  useCdn: process.env.NODE_ENV === 'production',
})
