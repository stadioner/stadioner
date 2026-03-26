'use client'

import { useEffect, useRef } from 'react'
import { useCookieConsent } from '@/store/use-cookie-consent'

type TrackingParams = [command: string, ...values: unknown[]]
type ScriptKey = 'ga' | 'fb'

type GtagFunction = ((...args: TrackingParams) => void) & {
  q?: TrackingParams[]
}

type FbqFunction = ((...args: TrackingParams) => void) & {
  callMethod?: (...args: TrackingParams) => void
  push: (...args: TrackingParams) => void
  loaded: boolean
  version: string
  queue: TrackingParams[]
}

const createGtagStub = (): GtagFunction =>
  Object.assign(
    (...args: TrackingParams) => {
      window.gtag.q ??= []
      window.gtag.q.push(args)
    },
    {
      q: [] as TrackingParams[]
    }
  )

const createNoopGtag = (): GtagFunction =>
  Object.assign(
    (...args: TrackingParams) => {
      void args
    },
    {
      q: [] as TrackingParams[]
    }
  )

const createFbqStub = (): FbqFunction => {
  const fbq = Object.assign(
    (...args: TrackingParams) => {
      if (typeof fbq.callMethod === 'function') {
        fbq.callMethod(...args)
        return
      }

      fbq.queue.push(args)
    },
    {
      callMethod: undefined as ((...args: TrackingParams) => void) | undefined,
      push: (...args: TrackingParams) => {
        fbq.queue.push(args)
      },
      loaded: false,
      version: '2.0',
      queue: [] as TrackingParams[]
    }
  )

  fbq.push = fbq
  return fbq
}

const createNoopFbq = (): FbqFunction =>
  Object.assign(
    (...args: TrackingParams) => {
      void args
    },
    {
      push: (...args: TrackingParams) => {
        void args
      },
      loaded: false,
      version: '0',
      queue: [] as TrackingParams[]
    }
  )

// Cookie management hook that enforces user preferences
export const useCookieManagement = () => {
  const { cookiePreferences, hasConsented } = useCookieConsent()
  const scriptsLoaded = useRef<Set<ScriptKey>>(new Set())

  useEffect(() => {
    if (!hasConsented) return

    // Clear existing analytics cookies if disabled
    if (!cookiePreferences.analytics) {
      // Remove Google Analytics cookies
      const gaCookies = ['_ga', '_ga_', '_gid', '_gat', '_gat_gtag_']
      gaCookies.forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      })
    }

    // Clear existing marketing cookies if disabled
    if (!cookiePreferences.marketing) {
      // Remove Facebook Pixel cookies
      const fbCookies = ['_fbp', '_fbc', 'fr']
      fbCookies.forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      })
    }

    // Manage Google Analytics
    if (cookiePreferences.analytics && !scriptsLoaded.current.has('ga')) {
      // Enable Google Analytics
      window.gtag = window.gtag || createGtagStub()

      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}`
      script.onload = () => {
        window.gtag('js', new Date())
        window.gtag(
          'config',
          process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID',
          {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          }
        )
        scriptsLoaded.current.add('ga')
      }
      document.head.appendChild(script)
    } else if (!cookiePreferences.analytics) {
      // Disable Google Analytics
      window.gtag = createNoopGtag()
    }

    // Manage Marketing cookies (Facebook Pixel, etc.)
    if (cookiePreferences.marketing && !scriptsLoaded.current.has('fb')) {
      // Enable Facebook Pixel
      if (typeof window !== 'undefined' && !window.fbq) {
        window.fbq = createFbqStub()
        if (!window._fbq) window._fbq = window.fbq
        window.fbq.loaded = !0
        window.fbq.version = '2.0'
        window.fbq.queue = []
      }

      // Load Facebook Pixel
      const fbScript = document.createElement('script')
      fbScript.async = true
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js'
      fbScript.onload = () => {
        scriptsLoaded.current.add('fb')
      }
      document.head.appendChild(fbScript)
    } else if (!cookiePreferences.marketing) {
      // Disable Facebook Pixel
      window.fbq = createNoopFbq()
    }

    // Manage Functional cookies (language preferences, etc.)
    if (!cookiePreferences.functional) {
      // Disable functional features
      // Clear language preferences from localStorage
      localStorage.removeItem('language')
      localStorage.removeItem('cookie-consent')
    }
  }, [cookiePreferences, hasConsented])

  return {
    isAnalyticsEnabled: cookiePreferences.analytics,
    isMarketingEnabled: cookiePreferences.marketing,
    isFunctionalEnabled: cookiePreferences.functional,
    isEssentialEnabled: cookiePreferences.essential
  }
}

// Declare global types for TypeScript
declare global {
  interface Window {
    _fbq?: FbqFunction
    gtag: GtagFunction
    fbq: FbqFunction
  }
}
