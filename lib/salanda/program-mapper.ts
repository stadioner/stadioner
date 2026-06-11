import { pickLocalizedString } from '@/lib/i18n/pick-localized'
import type { SupportedLanguage } from '@/lib/i18n/site-languages'
import { formatSalandaProgramDate } from '@/lib/salanda/format-program-date'
import type {
  SalandaProgramEntry,
  SalandaWeeklyProgramView,
  SanitySalandaProgramItem,
  SanitySalandaWeeklyProgram
} from '@/types/salanda-program'

const mapProgramItem = (
  item: SanitySalandaProgramItem,
  language: SupportedLanguage
): SalandaProgramEntry | null => {
  const title = pickLocalizedString(item.title, language)
  if (!title || !item.date) {
    return null
  }

  const description = pickLocalizedString(item.description, language)

  return {
    date: item.date,
    dateLabel: formatSalandaProgramDate(item.date, language),
    time: item.time?.trim() || undefined,
    title,
    description
  }
}

export const mapSalandaWeeklyProgram = (
  program: SanitySalandaWeeklyProgram | null,
  language: SupportedLanguage
): SalandaWeeklyProgramView | null => {
  if (!program) {
    return null
  }

  const entries = (program.programItems ?? [])
    .map((item) => mapProgramItem(item, language))
    .filter((entry): entry is SalandaProgramEntry => entry !== null)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (entries.length === 0) {
    return null
  }

  return {
    id: program._id,
    entries
  }
}
