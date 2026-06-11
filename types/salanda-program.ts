import type { SupportedLanguage } from '@/lib/i18n/site-languages'

export type LocalizedStringValue = Partial<Record<SupportedLanguage, string>>

export type SanitySalandaProgramItem = {
  date: string
  time?: string
  title?: LocalizedStringValue
  description?: LocalizedStringValue
}

export type SanitySalandaWeeklyProgram = {
  _id: string
  isActive?: boolean
  programItems?: SanitySalandaProgramItem[]
}

export type SalandaProgramEntry = {
  date: string
  dateLabel: string
  time?: string
  title: string
  description?: string
}

export type SalandaWeeklyProgramView = {
  id: string
  entries: SalandaProgramEntry[]
}
