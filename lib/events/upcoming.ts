import { isEventPast } from '@/lib/events/date-time'
import { type Event } from '@/types/event'

export const getNextUpcomingEvent = (
  events: Event[],
  referenceDate: Date = new Date()
): Event | null => {
  const upcomingEvents = events
    .filter((event) => !isEventPast(event, referenceDate))
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    )

  return upcomingEvents[0] ?? null
}
