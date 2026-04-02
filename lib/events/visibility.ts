import { isEventPast } from '@/lib/events/date-time'
import {
  hasPortableTextContent,
  type PortableTextBlockLike
} from '@/sanity/lib/portable-text'

interface EventVisibilityInput {
  dateTime?: string
  endDateTime?: string
  recap?: PortableTextBlockLike[]
}

export const eventHasRecap = (event: EventVisibilityInput): boolean =>
  hasPortableTextContent(event.recap)

export const canAccessEventDetail = (
  event: EventVisibilityInput,
  referenceDate: Date = new Date()
): boolean => !isEventPast(event, referenceDate) || eventHasRecap(event)
