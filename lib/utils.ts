import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Same rules as Sanity `LocalizedSlugInput` — for fallback when localized slugs were never generated. */
export function slugifyAscii(value: string): string {
  const s = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s.length > 0 ? s : 'kategorie'
}
