import { type PortableTextBlock } from 'sanity'
import { type SupportedLanguage } from '@/types/blog'
import { type Event } from '@/types/event'
import {
  supportedEventLanguages,
  type UnifiedEvent
} from '@/types/unified-event'

const getLocalizedValue = <T>(
  value: { cs?: T; en?: T; de?: T } | undefined,
  language: SupportedLanguage
): T | undefined => value?.[language]

export const mapUnifiedEventToEvent = (
  unifiedEvent: UnifiedEvent,
  language: SupportedLanguage
): Event | null => {
  const title = getLocalizedValue(unifiedEvent.title, language)
  const slugValue = getLocalizedValue(unifiedEvent.slug, language)?.current

  if (!title || !slugValue) {
    return null
  }

  return {
    _id: unifiedEvent._id,
    title,
    slug: {
      current: slugValue
    },
    dateTime: unifiedEvent.dateTime,
    endDateTime: unifiedEvent.endDateTime,
    location: unifiedEvent.location,
    isComingSoon: unifiedEvent.isComingSoon,
    rsvpCount: unifiedEvent.rsvpCount,
    mainImage: unifiedEvent.mainImage,
    description: getLocalizedValue(unifiedEvent.description, language),
    recap: getLocalizedValue(unifiedEvent.recap, language)
  }
}

export const getUnifiedEventVariants = (
  unifiedEvent: UnifiedEvent
): Array<{ locale: SupportedLanguage; slug: string }> =>
  supportedEventLanguages.reduce<
    Array<{ locale: SupportedLanguage; slug: string }>
  >((acc, locale) => {
    const slug = unifiedEvent.slug?.[locale]?.current

    if (!slug) {
      return acc
    }

    acc.push({ locale, slug })
    return acc
  }, [])

export const getLocalizedRecap = (
  unifiedEvent: UnifiedEvent,
  language: SupportedLanguage
): PortableTextBlock[] | undefined =>
  getLocalizedValue(unifiedEvent.recap, language)
