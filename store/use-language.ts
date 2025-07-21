'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface LanguageStore {
  language: string
  imgSrc: (lang: string) => string
  setLanguage: (value: string) => void
}

export const useLanguage = create(
  persist<LanguageStore>(
    set => ({
      language:
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('language-storage') || 'cs'
          : 'cs',
      imgSrc: lang => `/flags/${lang}.webp`,
      setLanguage: value => {
        set({ language: value })
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
