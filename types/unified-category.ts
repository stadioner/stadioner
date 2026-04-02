export interface LocalizedValue<T> {
  cs?: T
  en?: T
  de?: T
}

export interface UnifiedCategory {
  _id: string
  _updatedAt?: string
  title?: LocalizedValue<string>
  slug?: LocalizedValue<{ current?: string }>
}

export const supportedUnifiedLanguages = ['cs', 'en', 'de'] as const
