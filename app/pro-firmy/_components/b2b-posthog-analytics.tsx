'use client'

import { useEffect, useRef } from 'react'
import posthog from 'posthog-js'
import { isPosthogCaptureAllowed } from '@/lib/posthog-consent'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { useLanguage } from '@/store/use-language'
import { getB2BLanguage } from './content'

const SECTION_IDS = [
  'b2b-types',
  'b2b-coverage',
  'b2b-packaging',
  'b2b-flow',
  'b2b-contact'
] as const

export function B2BPostHogAnalytics() {
  const { language } = useLanguage()
  const locale = getB2BLanguage(language)
  const { hasConsented, isHydrated, cookiePreferences } = useCookieConsent()
  const analyticsActive =
    isHydrated && hasConsented && cookiePreferences.analytics
  const seenSections = useRef(new Set<string>())
  const pageViewSentForKey = useRef('')

  useEffect(() => {
    if (!analyticsActive) {
      seenSections.current.clear()
      pageViewSentForKey.current = ''
    }
  }, [analyticsActive])

  useEffect(() => {
    if (!analyticsActive) {
      return
    }

    const viewKey = `${locale}:${window.location.pathname}`

    const sendPageView = () => {
      if (!isPosthogCaptureAllowed()) {
        return
      }
      if (pageViewSentForKey.current === viewKey) {
        return
      }
      pageViewSentForKey.current = viewKey
      posthog.capture('b2b_page_viewed', {
        language: locale,
        pathname: window.location.pathname
      })
    }

    sendPageView()
    const retryId = window.setTimeout(sendPageView, 120)

    return () => {
      window.clearTimeout(retryId)
    }
  }, [analyticsActive, locale])

  useEffect(() => {
    if (!analyticsActive) {
      return
    }

    seenSections.current.clear()

    let observer: IntersectionObserver | null = null
    let cancelled = false

    const setup = () => {
      if (cancelled || !isPosthogCaptureAllowed()) {
        return false
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!isPosthogCaptureAllowed()) {
            return
          }
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue
            }
            const id = entry.target.id
            if (!id || seenSections.current.has(id)) {
              continue
            }
            seenSections.current.add(id)
            posthog.capture('b2b_section_viewed', {
              section_id: id,
              language: locale
            })
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
      )

      for (const sectionId of SECTION_IDS) {
        const el = document.getElementById(sectionId)
        if (el) {
          observer.observe(el)
        }
      }
      return true
    }

    if (!setup()) {
      const deferId = window.setTimeout(() => {
        if (!cancelled) {
          setup()
        }
      }, 120)
      return () => {
        cancelled = true
        window.clearTimeout(deferId)
        observer?.disconnect()
      }
    }

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [analyticsActive, locale])

  return null
}
