import 'server-only'

import { sanityFetch } from '@/sanity/lib/fetch'
import {
  eventsListByLanguageQuery,
  unifiedEventsQuery
} from '@/sanity/lib/queries'
import { mapUnifiedEventToEvent } from '@/lib/events/unified-event-mapper'
import { hasSanityWriteToken, writeClient } from '@/sanity/lib/write-client'
import { type Event } from '@/types/event'
import { type SupportedLanguage } from '@/types/blog'
import { type UnifiedEvent } from '@/types/unified-event'

export const getEventsForLanguage = async (
  language: SupportedLanguage
): Promise<Event[]> => {
  const unifiedEvents =
    hasSanityWriteToken ?
      await writeClient.fetch<UnifiedEvent[]>(unifiedEventsQuery)
    : await sanityFetch<UnifiedEvent[]>({
        query: unifiedEventsQuery,
        tags: ['events:unified:list'],
        revalidate: 60
      })

  const mappedUnifiedEvents = unifiedEvents
    .map((event) => mapUnifiedEventToEvent(event, language))
    .filter((event): event is Event => event !== null)

  if (mappedUnifiedEvents.length > 0) {
    return mappedUnifiedEvents
  }

  return sanityFetch<Event[]>({
    query: eventsListByLanguageQuery,
    params: { language },
    tags: [`events:list:${language}`],
    revalidate: 60
  })
}
