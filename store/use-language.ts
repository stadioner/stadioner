'use client'

import { create } from 'zustand'
import { useEffect } from 'react'
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
      document.cookie = `language-storage=${value}; path=/; max-age=${60 * 60 * 24 * 365}`
    } else {
      document.cookie = `language-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  },
}))

// Synchronizace jazyka z cookies při mountu a při změně souhlasu
export const useLanguageSync = () => {
  const { hasConsented } = useCookieConsent()
  const setLanguage = useLanguage(state => state.setLanguage)
  useEffect(() => {
    if (typeof window !== 'undefined' && hasConsented) {
      const cookies = document.cookie.split(';').reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split('=')
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      )
      if (cookies['language-storage']) {
        setLanguage(cookies['language-storage'])
      }
    }
  }, [hasConsented, setLanguage])
}
