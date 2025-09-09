'use client'

import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { useLanguage } from '@/store/use-language'
import { Container } from './container'
import { useState } from 'react'

export const CookieConsent = () => {
  const { language } = useLanguage()
  const { hasConsented, setConsented } = useCookieConsent()
  const [sessionDeclined, setSessionDeclined] = useState(false)

  if (hasConsented || sessionDeclined) {
    return null
  }

  const handleAccept = () => {
    setConsented(true)
  }

  const handleDecline = () => {
    setSessionDeclined(true)
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 z-[1001] bg-brand-primary border-t border-brand-action p-4 shadow-lg'>
      <Container className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='text-sm text-brand-action'>
          <p>
            {language === 'cs' &&
              'Tento web používá cookies pro zlepšení uživatelského zážitku. Pokračováním souhlasíte s jejich použitím.'}
            {language === 'en' &&
              'This website uses cookies to improve your user experience. By continuing, you agree to their use.'}
            {language === 'de' &&
              'Diese Website verwendet Cookies, um Ihr Benutzererlebnis zu verbessern. Durch das Fortfahren stimmen Sie ihrer Verwendung zu.'}
          </p>
        </div>
        <div className='flex gap-2 shrink-0'>
          <Button
            variant='outline'
            onClick={handleDecline}
            className='text-brand-action border-brand-action'
          >
            {language === 'cs' && 'Zamítnout'}
            {language === 'en' && 'Decline'}
            {language === 'de' && 'Ablehnen'}
          </Button>
          <Button variant='green' onClick={handleAccept}>
            {language === 'cs' && 'Přijmout'}
            {language === 'en' && 'Accept'}
            {language === 'de' && 'Akzeptieren'}
          </Button>
        </div>
      </Container>
    </div>
  )
}
