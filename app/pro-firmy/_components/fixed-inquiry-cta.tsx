'use client'

import { useEffect, useState } from 'react'
import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { captureB2bEvent } from '@/lib/b2b-posthog'
import { getB2BLanguage } from './content'

export const FixedInquiryCta = () => {
  const { language } = useLanguage()
  const [bottomOffset, setBottomOffset] = useState(16)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const buttonLabel =
    language === 'en' ? 'Non-binding order'
    : language === 'de' ? 'Unverbindliche Bestellung'
    : 'Nezávazná objednávka'

  useEffect(() => {
    const cookieBannerId = 'cookie-consent-banner'
    let resizeObserver: ResizeObserver | null = null

    const updateOffset = () => {
      const cookieBanner = document.getElementById(cookieBannerId)

      if (!cookieBanner) {
        setBottomOffset(16)
        return
      }

      setBottomOffset(cookieBanner.offsetHeight + 8)
    }

    const observeCookieBanner = () => {
      resizeObserver?.disconnect()
      resizeObserver = null

      const cookieBanner = document.getElementById(cookieBannerId)
      if (!cookieBanner) {
        updateOffset()
        return
      }

      resizeObserver = new ResizeObserver(updateOffset)
      resizeObserver.observe(cookieBanner)
      updateOffset()
    }

    const mutationObserver = new MutationObserver(observeCookieBanner)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    observeCookieBanner()
    window.addEventListener('resize', updateOffset)

    return () => {
      resizeObserver?.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', updateOffset)
    }
  }, [])

  useEffect(() => {
    const form = document.getElementById('b2b-form')
    if (!form) {
      setIsFormVisible(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsFormVisible(entry.isIntersecting)
      },
      {
        threshold: 0.15
      }
    )

    observer.observe(form)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const hero = document.getElementById('b2b-hero')
    if (!hero) {
      setIsHeroVisible(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      }
    )

    observer.observe(hero)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleClick = () => {
    captureB2bEvent('b2b_fixed_cta_click', {
      language: getB2BLanguage(language)
    })

    const form = document.getElementById('b2b-form')

    if (!form) {
      return
    }

    const topOffset = 120
    const targetPosition =
      form.getBoundingClientRect().top + window.scrollY - topOffset

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth'
    })
  }

  return (
    <div
      className='fixed inset-x-0 z-[1002] transition-opacity duration-200'
      style={{
        bottom: `${bottomOffset}px`,
        opacity: isFormVisible || isHeroVisible ? 0 : 1,
        pointerEvents: isFormVisible || isHeroVisible ? 'none' : 'auto'
      }}
    >
      <Container>
        <Border
          shop
          className='w-full'
        >
          <button
            type='button'
            onClick={handleClick}
            className='bg-brand-shop text-brand-primary hover:bg-brand-shop/90 block w-full px-6 py-3 text-center text-base font-bold transition-colors'
          >
            {buttonLabel}
          </button>
        </Border>
      </Container>
    </div>
  )
}
