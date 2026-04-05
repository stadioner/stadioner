import { NextRequest, NextResponse } from 'next/server'

import {
  blogWebhookDocumentTypes,
  revalidateBlogCachesForWebhookDocument
} from '@/sanity/lib/revalidate-blog'

const unwrapWebhookBody = (body: unknown): Record<string, unknown> | null => {
  if (!body || typeof body !== 'object') {
    return null
  }

  const o = body as Record<string, unknown>

  if (o.result && typeof o.result === 'object' && o.result !== null) {
    return o.result as Record<string, unknown>
  }

  return o
}

const isAuthorized = (request: NextRequest): boolean => {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret || secret.length === 0) {
    return false
  }

  const auth = request.headers.get('authorization')
  if (auth === `Bearer ${secret}`) {
    return true
  }

  const headerSecret = request.headers.get('x-sanity-revalidate-secret')
  if (headerSecret === secret) {
    return true
  }

  const querySecret = request.nextUrl.searchParams.get('secret')
  return querySecret === secret
}

/**
 * On-demand cache invalidation for blog (články) after Sanity publish/update/delete.
 *
 * Setup:
 * 1. Set SANITY_REVALIDATE_SECRET in the deployment environment (long random string).
 * 2. In Sanity: Project → API → Webhooks → create webhook for document create/update/delete
 *    on types post, unifiedPost, category, unifiedCategory.
 * 3. URL: https://<your-domain>/api/revalidate-sanity
 * 4. HTTP method POST, include the same secret as Bearer token in Authorization header
 *    (Sanity webhook “Secret” field), or send header x-sanity-revalidate-secret.
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const doc = unwrapWebhookBody(body)
  const docType =
    doc && typeof doc._type === 'string' ? doc._type : null

  if (
    docType !== null &&
    !blogWebhookDocumentTypes.has(docType)
  ) {
    return NextResponse.json({ skipped: true, docType })
  }

  revalidateBlogCachesForWebhookDocument(doc)

  return NextResponse.json({
    revalidated: true,
    docType: docType ?? 'unknown'
  })
}
