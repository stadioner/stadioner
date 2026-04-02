import { createHash, randomUUID } from 'crypto'
import { groq } from 'next-sanity'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { hasSanityWriteToken, writeClient } from '@/sanity/lib/write-client'
import { isEventPast } from '@/lib/events/date-time'

const RSVP_COOKIE_NAME = 'stadioner-rsvp-id'
const RSVP_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5

const eventIdentityByIdQuery = groq`
  *[_type == "event" && _id == $eventId][0]{
    _id,
    translationKey,
    dateTime,
    endDateTime,
    rsvpCount,
    rsvpVoterHashes
  }
`

const unifiedEventIdentityByIdQuery = groq`
  *[_type == "unifiedEvent" && _id == $eventId][0]{
    _id,
    dateTime,
    endDateTime,
    rsvpCount,
    rsvpVoterHashes
  }
`

const eventsByTranslationKeyQuery = groq`
  *[_type == "event" && translationKey == $translationKey]{
    _id,
    dateTime,
    endDateTime,
    rsvpCount,
    rsvpVoterHashes
  }
`

type RouteContext = {
  params: Promise<{ eventId: string }>
}

type EventIdentity = {
  _id: string
  translationKey?: string
  dateTime?: string
  endDateTime?: string
  rsvpCount?: number
  rsvpVoterHashes?: string[]
}

type UnifiedEventIdentity = {
  _id: string
  dateTime?: string
  endDateTime?: string
  rsvpCount?: number
  rsvpVoterHashes?: string[]
}

type RsvpRequestBody = {
  participating: boolean
}

const cacheControlHeaders = {
  'Cache-Control': 'no-store, max-age=0'
}

const liveReadClient = client.withConfig({ useCdn: false })
const readClient = hasSanityWriteToken ? writeClient : liveReadClient

const toVisitorHash = (visitorToken: string): string =>
  createHash('sha256').update(visitorToken).digest('hex')

const getEventIdentity = async (
  eventId: string
): Promise<EventIdentity | null> =>
  readClient.fetch<EventIdentity | null>(eventIdentityByIdQuery, {
    eventId
  })

const getUnifiedEventIdentity = async (
  eventId: string
): Promise<UnifiedEventIdentity | null> =>
  readClient.fetch<UnifiedEventIdentity | null>(unifiedEventIdentityByIdQuery, {
    eventId
  })

const toHashSet = (hashes?: string[]): Set<string> =>
  new Set(Array.isArray(hashes) ? hashes.filter(Boolean) : [])

const getEventIdFromContext = async (
  context: RouteContext
): Promise<string> => {
  const params = await context.params
  return decodeURIComponent(params.eventId)
}

const getOrSetVisitorToken = async (): Promise<string> => {
  const cookieStore = await cookies()
  const existingToken = cookieStore.get(RSVP_COOKIE_NAME)?.value

  if (typeof existingToken === 'string' && existingToken.length > 0) {
    return existingToken
  }

  const createdToken = randomUUID()
  cookieStore.set({
    name: RSVP_COOKIE_NAME,
    value: createdToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: RSVP_COOKIE_MAX_AGE
  })

  return createdToken
}

const readVisitorToken = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  const visitorToken = cookieStore.get(RSVP_COOKIE_NAME)?.value

  if (typeof visitorToken !== 'string' || visitorToken.length === 0) {
    return null
  }

  return visitorToken
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const eventId = await getEventIdFromContext(context)
    const unifiedEventIdentity = await getUnifiedEventIdentity(eventId)
    const legacyEventIdentity =
      unifiedEventIdentity ? null : await getEventIdentity(eventId)
    const eventIdentity = unifiedEventIdentity ?? legacyEventIdentity

    if (!eventIdentity) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const visitorToken = await readVisitorToken()
    const visitorHash = visitorToken ? toVisitorHash(visitorToken) : null
    const hashSet = toHashSet(eventIdentity.rsvpVoterHashes)
    const count =
      typeof eventIdentity.rsvpCount === 'number' ?
        eventIdentity.rsvpCount
      : hashSet.size
    const participating = visitorHash ? hashSet.has(visitorHash) : false

    return NextResponse.json(
      { count, participating },
      { headers: cacheControlHeaders }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to load RSVP data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    if (!hasSanityWriteToken) {
      return NextResponse.json(
        { error: 'Missing SANITY_API_WRITE_TOKEN' },
        { status: 503 }
      )
    }

    const payload = (await request
      .json()
      .catch(() => null)) as Partial<RsvpRequestBody> | null

    if (typeof payload?.participating !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400, headers: cacheControlHeaders }
      )
    }

    const eventId = await getEventIdFromContext(context)
    const unifiedEventIdentity = await getUnifiedEventIdentity(eventId)
    const legacyEventIdentity =
      unifiedEventIdentity ? null : await getEventIdentity(eventId)
    const eventIdentity = unifiedEventIdentity ?? legacyEventIdentity

    if (!eventIdentity) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404, headers: cacheControlHeaders }
      )
    }

    if (isEventPast(eventIdentity)) {
      return NextResponse.json(
        { error: 'Event has already ended' },
        { status: 409, headers: cacheControlHeaders }
      )
    }

    const visitorToken = await getOrSetVisitorToken()
    const visitorHash = toVisitorHash(visitorToken)
    let hashSet = toHashSet(eventIdentity.rsvpVoterHashes)

    const translationKey = legacyEventIdentity?.translationKey

    if (translationKey && !unifiedEventIdentity) {
      const variants = await readClient.fetch<EventIdentity[]>(
        eventsByTranslationKeyQuery,
        { translationKey }
      )

      hashSet = variants.reduce<Set<string>>((acc, item) => {
        for (const hash of toHashSet(item.rsvpVoterHashes)) {
          acc.add(hash)
        }

        return acc
      }, hashSet)
    }

    if (payload.participating) {
      hashSet.add(visitorHash)
    } else {
      hashSet.delete(visitorHash)
    }

    const nextHashes = Array.from(hashSet)
    const count = nextHashes.length

    const eventIds =
      unifiedEventIdentity ? [eventIdentity._id]
      : translationKey ?
        await readClient.fetch<string[]>(
          `*[_type == "event" && translationKey == $translationKey]._id`,
          { translationKey }
        )
      : [eventIdentity._id]

    await writeClient.mutate(
      eventIds.map((eventDocumentId) => ({
        patch: {
          id: eventDocumentId,
          set: {
            rsvpVoterHashes: nextHashes,
            rsvpCount: count
          }
        }
      }))
    )

    return NextResponse.json(
      {
        count,
        participating: hashSet.has(visitorHash)
      },
      { headers: cacheControlHeaders }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to update RSVP' },
      { status: 500, headers: cacheControlHeaders }
    )
  }
}
