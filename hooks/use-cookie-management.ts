'use client'

import { useEffect, useRef } from 'react'
import { useCookieConsent } from '@/store/use-cookie-consent'

// Cookie management hook that enforces user preferences
export const useCookieManagement = () => {
  const { cookiePreferences, hasConsented } = useCookieConsent()
  const scriptsLoaded = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!hasConsented) return

    // Clear existing analytics cookies if disabled
    if (!cookiePreferences.analytics) {
      // Remove Google Analytics cookies
      const gaCookies = ['_ga', '_ga_', '_gid', '_gat', '_gat_gtag_']
      gaCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      })
    }

    // Clear existing marketing cookies if disabled
    if (!cookiePreferences.marketing) {
      // Remove Facebook Pixel cookies
      const fbCookies = ['_fbp', '_fbc', 'fr']
      fbCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      })
    }

    // Manage Google Analytics
    if (cookiePreferences.analytics && !scriptsLoaded.current.has('ga')) {
      // Enable Google Analytics
      window.gtag =
        window.gtag ||
        function () {
          ;(window.gtag as any).q = (window.gtag as any).q || []
          ;(window.gtag as any).q.push(arguments)
        }

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
            cookie_flags: 'SameSite=None;Secure',
          }
        )
        scriptsLoaded.current.add('ga')
      }
      document.head.appendChild(script)
    } else if (!cookiePreferences.analytics) {
      // Disable Google Analytics
      window.gtag = function () {
        // No-op function to prevent errors
      }
    }

    // Manage Marketing cookies (Facebook Pixel, etc.)
    if (cookiePreferences.marketing && !scriptsLoaded.current.has('fb')) {
      // Enable Facebook Pixel
      if (typeof window !== 'undefined' && !window.fbq) {
        window.fbq = function () {
          ;(window.fbq as any).callMethod
            ? (window.fbq as any).callMethod.apply(window.fbq, arguments)
            : (window.fbq as any).queue.push(arguments)
        }
        if (!(window as any)._fbq) (window as any)._fbq = window.fbq
        window.fbq.push = window.fbq
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
      window.fbq = function () {
        // No-op function
      }
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
    isEssentialEnabled: cookiePreferences.essential,
  }
}

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}
