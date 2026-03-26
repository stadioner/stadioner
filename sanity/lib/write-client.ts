import 'server-only'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN

export const hasSanityWriteToken =
  typeof sanityWriteToken === 'string' && sanityWriteToken.length > 0

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: sanityWriteToken
})
