'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CookieConsentStore {
  hasConsented: boolean
  isHydrated: boolean
  cookiePreferences: {
    essential: boolean
    functional: boolean
    analytics: boolean
    marketing: boolean
  }
  setConsented: (consented: boolean) => void
  setCookiePreferences: (
    preferences: Partial<CookieConsentStore['cookiePreferences']>
  ) => void
  resetPreferences: () => void
  setHydrated: (hydrated: boolean) => void
}

export const useCookieConsent = create(
  persist<CookieConsentStore>(
    set => ({
      hasConsented: false,
      isHydrated: false,
      cookiePreferences: {
        essential: true, // Always true, can't be disabled
        functional: false,
        analytics: false,
        marketing: false,
      },
      setConsented: (consented: boolean) => {
        set({ hasConsented: consented })
      },
      setCookiePreferences: preferences => {
        set(state => ({
          cookiePreferences: { ...state.cookiePreferences, ...preferences },
        }))
      },
      resetPreferences: () => {
        set({
          cookiePreferences: {
            essential: true,
            functional: false,
            analytics: false,
            marketing: false,
          },
        })
      },
      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated })
      },
    }),
    {
      name: 'cookie-consent',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return {
            getItem: (name: string) => {
              const cookies = document.cookie.split(';').reduce(
                (acc, cookie) => {
                  const [key, value] = cookie.trim().split('=')
                  acc[key] = value
                  return acc
                },
                {} as Record<string, string>
              )
              return cookies[name] || null
            },
            setItem: (name: string, value: string) => {
              document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 rok
            },
            removeItem: (name: string) => {
              document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
            },
          }
        }
        return localStorage
      }),
      onRehydrateStorage: () => state => {
        state?.setHydrated(true)
      },
    }
  )
)
