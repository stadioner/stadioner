'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { Border } from './border'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'
import {
  NEWSLETTER_STORAGE_KEYS,
  getNewsletterPopupCloseCount,
  increaseNewsletterPopupCloseCount,
} from '@/lib/newsletter/submit'

export const NewsletterPopup = () => {
  const { language } = useLanguage()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = () => {
    setIsVisible(false)
    increaseNewsletterPopupCloseCount()
  }

  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language,
    onSubmitted: () => {
      setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    },
  })

  useEffect(() => {
    // Don't show popup on newsletter or studio pages
    if (pathname === '/newsletter' || pathname.includes('/studio')) {
      return
    }

    // Check if user has already dismissed the popup permanently
    const hasSeenPopup = localStorage.getItem(
      NEWSLETTER_STORAGE_KEYS.popupDismissed,
    )
    if (hasSeenPopup) return

    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem(
      NEWSLETTER_STORAGE_KEYS.subscribed,
    )
    if (hasSubscribed) return

    // Check if user has closed popup 3 times
    const closeCount = getNewsletterPopupCloseCount()
    if (closeCount >= 3) return

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className='fixed left-0 right-0 top-28 z-[1001]'>
      <Container className='w-full'>
        <Border background>
          <div className='bg-brand-action'>
            {/* Mobile layout */}
            <div className='px-4 py-3 lg:hidden'>
              {/* Header with close button */}
              <div className='flex items-start justify-between mb-3'>
                <h3 className='text-brand-primary text-lg font-semibold pr-2'>
                  {copy.heading}
                </h3>
                <Button
                  type='button'
                  onClick={handleClose}
                  variant='ghost'
                  size='icon'
                  className='text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary flex-shrink-0'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              {/* Description */}
              <p className='text-brand-primary/80 text-sm mb-4'>
                {copy.description}{' '}
                <Link href='/gdpr' className='underline hover:text-brand-primary'>
                  {copy.gdprLink}
                </Link>
              </p>

              {/* Form */}
              <form onSubmit={submit} className='flex flex-col gap-3'>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={copy.placeholder}
                  required
                  className='px-3 py-2 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full'
                />
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  variant='secondary'
                  size='sm'
                  className='w-full'
                >
                  {isSubmitting ? copy.submitting : copy.submit}
                </Button>
              </form>
            </div>

            {/* Desktop layout - original */}
            <div className='hidden lg:flex items-center justify-between px-4 py-3'>
              <div className='flex-1'>
                <h3 className='text-brand-primary text-lg font-semibold mb-1'>
                  {copy.heading}
                </h3>
                <p className='text-brand-primary/80 text-sm'>
                  {copy.description}{' '}
                  <Link
                    href='/gdpr'
                    className='underline hover:text-brand-primary'
                  >
                    {copy.gdprLink}
                  </Link>
                </p>
              </div>

              <form onSubmit={submit} className='flex items-center gap-3 ml-6'>
                <div className='relative'>
                  <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={copy.placeholder}
                    required
                    className='px-3 py-2 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-64'
                  />
                </div>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  variant='secondary'
                  size='sm'
                  className='whitespace-nowrap'
                >
                  {isSubmitting ? copy.submitting : copy.submit}
                </Button>
                <Button
                  type='button'
                  onClick={handleClose}
                  variant='ghost'
                  size='icon'
                  className='text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary'
                >
                  <X className='h-4 w-4' />
                </Button>
              </form>
            </div>
          </div>
        </Border>
      </Container>
    </div>
  )
}
