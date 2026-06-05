import type { SupportedLanguage } from '@/lib/i18n/site-languages'

export type SalandaProgramDay =
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun'

export type LocalizedStringValue = Partial<Record<SupportedLanguage, string>>

export type SanitySalandaProgramItem = {
  day: SalandaProgramDay
  time?: string
  title?: LocalizedStringValue
  description?: LocalizedStringValue
}

export type SanitySalandaWeeklyProgram = {
  _id: string
  title?: LocalizedStringValue
  weekStart: string
  weekEnd: string
  isActive?: boolean
  programItems?: SanitySalandaProgramItem[]
}

export type SalandaProgramEntry = {
  time?: string
  title: string
  description?: string
}

export type SalandaProgramDayGroup = {
  day: SalandaProgramDay
  label: string
  entries: SalandaProgramEntry[]
}

export type SalandaWeeklyProgramView = {
  id: string
  title: string
  weekStart: string
  weekEnd: string
  dayGroups: SalandaProgramDayGroup[]
}
