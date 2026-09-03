'use client'

import { useCallback, useEffect, useId, useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Border } from '@/components/border'
import { useLanguage } from '@/store/use-language'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'
import { resolveNewsletterLanguage } from '@/lib/newsletter/copy'
import { oktoberfestNewsletterCopy } from '@/lib/newsletter/oktoberfest-copy'
import {
  hasDismissedOktoberfestNewsletterPopup,
  hasNewsletterSubscribed,
  markOktoberfestNewsletterPopupDismissed
} from '@/lib/newsletter/submit'

const SHOW_DELAY_MS = 600

export const OktoberfestNewsletterPopup = () => {
  const headingId = useId()
  const descriptionId = useId()
  const pathname = usePathname() ?? ''
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const lang = resolveNewsletterLanguage(language)
  const eventCopy = oktoberfestNewsletterCopy[lang]
  const isOktoberfestPage = pathname.includes('oktoberfest')

  const handleClose = useCallback(() => {
    setIsVisible(false)
    markOktoberfestNewsletterPopupDismissed()
  }, [])

  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language: lang,
    onSubmittedAction: () => {
      markOktoberfestNewsletterPopupDismissed()
      setIsVisible(false)
    }
  })

  useEffect(() => {
    if (!isOktoberfestPage) {
      setIsVisible(false)
      return
    }

    if (hasNewsletterSubscribed() || hasDismissedOktoberfestNewsletterPopup()) {
      return
    }

    const timer = window.setTimeout(() => {
      if (
        hasNewsletterSubscribed() ||
        hasDismissedOktoberfestNewsletterPopup()
      ) {
        return
      }

      setIsVisible(true)
    }, SHOW_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isOktoberfestPage])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose, isVisible])

  if (!isOktoberfestPage || !isVisible) {
    return null
  }

  return (
    <div className='fixed inset-0 z-[1002] flex items-center justify-center'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-black/50'
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        className='relative z-[1002] mx-4 w-full max-w-md'
      >
        <Border backgroundLight>
          <div className='bg-brand-primary p-6 shadow-lg'>
            <div className='mb-4 flex items-start justify-between gap-3'>
              <h2
                id={headingId}
                className='text-brand-action text-2xl font-bold'
              >
                {eventCopy.heading}
              </h2>
              <Button
                type='button'
                onClick={handleClose}
                variant='ghost'
                size='icon'
                aria-label={eventCopy.closeLabel}
                className='text-brand-action hover:bg-brand-action/10 hover:text-brand-action flex-shrink-0'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>

            <p
              id={descriptionId}
              className='text-brand-action/80 mb-5 text-sm'
            >
              {eventCopy.description}
            </p>

            <form
              onSubmit={submit}
              className='flex flex-col gap-3'
            >
              <input
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.placeholder}
                required
                autoFocus
                autoComplete='email'
                className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action focus:ring-brand-action/50 w-full border px-3 py-2 focus:ring-2 focus:outline-none'
              />
              <Button
                type='submit'
                disabled={isSubmitting}
                variant='green'
                className='w-full'
              >
                {isSubmitting ? copy.submitting : copy.submit}
              </Button>
              <Button
                type='button'
                onClick={handleClose}
                variant='ghost'
                className='text-brand-action/70 hover:text-brand-action w-full'
              >
                {eventCopy.dismiss}
              </Button>
            </form>

            <p className='text-brand-action/70 mt-4 text-center text-xs'>
              {copy.gdprPrefix}{' '}
              <Link
                href={`/${lang}/gdpr`}
                className='hover:text-brand-action underline'
              >
                {copy.gdprLink}
              </Link>
              {lang === 'de' ? ' zu' : null}
            </p>
          </div>
        </Border>
      </div>
    </div>
  )
}
