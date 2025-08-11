'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useCookieConsent } from './use-cookie-consent'

interface LanguageStore {
  language: string
  imgSrc: (lang: string) => string
  setLanguage: (value: string) => void
}

let memoryLanguage = 'cs'

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: memoryLanguage,
  imgSrc: lang => `/flags/${lang}.webp`,
  setLanguage: value => {
    const { hasConsented } = useCookieConsent.getState()
    set({ language: value })
    memoryLanguage = value
    if (hasConsented) {
      // Ulož do cookies
      document.cookie = `language-storage=${value}; path=/; max-age=${60 * 60 * 24 * 365}`
    } else {
      // Smaž cookie pokud existuje
      document.cookie = `language-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  },
}))

// Při inicializaci načti jazyk z cookies pouze pokud je hasConsented true
if (typeof window !== 'undefined') {
  const { hasConsented } = useCookieConsent.getState()
  if (hasConsented) {
    const cookies = document.cookie.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
      },
      {} as Record<string, string>
    )
    if (cookies['language-storage']) {
      memoryLanguage = cookies['language-storage']
    }
  }
}
