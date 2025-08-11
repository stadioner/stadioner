'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AgeVerificationStore {
  isVerified: boolean
  setVerified: (verified: boolean) => void
}

export const useAgeVerification = create(
  persist<AgeVerificationStore>(
    set => ({
      isVerified: false,
      setVerified: (verified: boolean) => {
        set({ isVerified: verified })
      },
    }),
    {
      name: 'age-verification',
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
    }
  )
)
