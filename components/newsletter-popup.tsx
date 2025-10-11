'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { useToast } from './custom-toast'
import { Border } from './border'

export const NewsletterPopup = () => {
  const { language } = useLanguage()
  const pathname = usePathname()
  const { showToast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Don't show popup on newsletter or studio pages
    if (pathname === '/newsletter' || pathname.includes('/studio')) {
      return
    }

    // Check if user has already dismissed the popup permanently
    const hasSeenPopup = localStorage.getItem('newsletter-popup-dismissed')
    if (hasSeenPopup) return

    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('newsletter-subscribed')
    if (hasSubscribed) return

    // Check if user has closed popup 3 times
    const closeCount = localStorage.getItem('newsletter-popup-close-count')
    if (closeCount && parseInt(closeCount) >= 2) return

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleClose = () => {
    setIsVisible(false)

    // Get current close count from localStorage
    const currentCount = localStorage.getItem('newsletter-popup-close-count')
    const newCount = currentCount ? parseInt(currentCount) + 1 : 1

    // Update close count
    localStorage.setItem('newsletter-popup-close-count', newCount.toString())

    // If user has closed 3 times, permanently dismiss
    if (newCount >= 3) {
      localStorage.setItem('newsletter-popup-dismissed', 'true')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('EMAIL', email)
      formData.append('b_0fe24a4d8159780e91fdf8f8d_fc6d3b1ef6', '')
      formData.append('f_id', '007877eef0')

      const response = await fetch(
        'https://stadioner.us20.list-manage.com/subscribe/post?u=0fe24a4d8159780e91fdf8f8d&id=fc6d3b1ef6&f_id=007877eef0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // This allows the request to work with Mailchimp
        }
      )

      // With no-cors mode, we can't check response status, so we assume success
      // Mailchimp will handle the subscription on their end
      const successMessage =
        language === 'cs'
          ? 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'
          : language === 'en'
            ? 'Please check your email and confirm your subscription!'
            : language === 'de'
              ? 'Bitte überprüfen Sie Ihre E-Mail und bestätigen Sie Ihr Abonnement!'
              : 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'

      showToast(successMessage, 'success')
      setEmail('')

      // Mark user as subscribed to prevent popup from showing again
      localStorage.setItem('newsletter-subscribed', 'true')

      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      // Even if there's an error, Mailchimp might have processed the subscription
      // So we show success message
      const successMessage =
        language === 'cs'
          ? 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'
          : language === 'en'
            ? 'Please check your email and confirm your subscription!'
            : language === 'de'
              ? 'Bitte überprüfen Sie Ihre E-Mail und bestätigen Sie Ihr Abonnement!'
              : 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'

      showToast(successMessage, 'success')
      setEmail('')

      // Mark user as subscribed to prevent popup from showing again
      localStorage.setItem('newsletter-subscribed', 'true')

      setTimeout(() => {
        handleClose()
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  {language === 'cs' &&
                    'Přihlaste se k odběru našeho newsletteru'}
                  {language === 'en' && 'Subscribe to our newsletter'}
                  {language === 'de' && 'Abonnieren Sie unseren Newsletter'}
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
                {language === 'cs' && (
                  <>
                    Získejte jako první informace o našich produktech, akcích
                    apod.{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-primary'
                    >
                      Ochrana osobních údajů
                    </Link>
                  </>
                )}
                {language === 'en' && (
                  <>
                    Be the first to receive information about our products,
                    events, etc.{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-primary'
                    >
                      Personal Data Protection
                    </Link>
                  </>
                )}
                {language === 'de' && (
                  <>
                    Erhalten Sie als Erster Informationen über unsere Produkte,
                    Aktionen usw.{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-primary'
                    >
                      Datenschutz
                    </Link>
                  </>
                )}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={
                    language === 'cs'
                      ? 'Váš email'
                      : language === 'en'
                        ? 'Your email'
                        : language === 'de'
                          ? 'Ihre E-Mail'
                          : 'Váš email'
                  }
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
                  {isSubmitting
                    ? language === 'cs'
                      ? 'Odesílám...'
                      : language === 'en'
                        ? 'Sending...'
                        : language === 'de'
                          ? 'Sende...'
                          : 'Odesílám...'
                    : language === 'cs'
                      ? 'Přihlásit se'
                      : language === 'en'
                        ? 'Subscribe'
                        : language === 'de'
                          ? 'Abonnieren'
                          : 'Přihlásit se'}
                </Button>
              </form>
            </div>

            {/* Desktop layout - original */}
            <div className='hidden lg:flex items-center justify-between px-4 py-3'>
              <div className='flex-1'>
                <h3 className='text-brand-primary text-lg font-semibold mb-1'>
                  {language === 'cs' &&
                    'Přihlaste se k odběru našeho newsletteru'}
                  {language === 'en' && 'Subscribe to our newsletter'}
                  {language === 'de' && 'Abonnieren Sie unseren Newsletter'}
                </h3>
                <p className='text-brand-primary/80 text-sm'>
                  {language === 'cs' && (
                    <>
                      Získejte jako první informace o našich produktech, akcích
                      apod.{' '}
                      <Link
                        href='/gdpr'
                        className='underline hover:text-brand-primary'
                      >
                        Ochrana osobních údajů
                      </Link>
                    </>
                  )}
                  {language === 'en' && (
                    <>
                      Be the first to receive information about our products,
                      events, etc.{' '}
                      <Link
                        href='/gdpr'
                        className='underline hover:text-brand-primary'
                      >
                        Personal Data Protection
                      </Link>
                    </>
                  )}
                  {language === 'de' && (
                    <>
                      Erhalten Sie als Erster Informationen über unsere
                      Produkte, Aktionen usw.{' '}
                      <Link
                        href='/gdpr'
                        className='underline hover:text-brand-primary'
                      >
                        Datenschutz
                      </Link>
                    </>
                  )}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className='flex items-center gap-3 ml-6'
              >
                <div className='relative'>
                  <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={
                      language === 'cs'
                        ? 'Váš email'
                        : language === 'en'
                          ? 'Your email'
                          : language === 'de'
                            ? 'Ihre E-Mail'
                            : 'Váš email'
                    }
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
                  {isSubmitting
                    ? language === 'cs'
                      ? 'Odesílám...'
                      : language === 'en'
                        ? 'Sending...'
                        : language === 'de'
                          ? 'Sende...'
                          : 'Odesílám...'
                    : language === 'cs'
                      ? 'Přihlásit se'
                      : language === 'en'
                        ? 'Subscribe'
                        : language === 'de'
                          ? 'Abonnieren'
                          : 'Přihlásit se'}
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
