'use client'

import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { Container } from './container'
import { useState } from 'react'

export const CookieConsent = () => {
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
            Tento web používá cookies pro zlepšení uživatelského zážitku.
            Pokračováním souhlasíte s jejich použitím.
          </p>
        </div>
        <div className='flex gap-2 shrink-0'>
          <Button
            variant='outline'
            onClick={handleDecline}
            className='text-brand-action border-brand-action'
          >
            Zamítnout
          </Button>
          <Button variant='green' onClick={handleAccept}>
            Přijmout
          </Button>
        </div>
      </Container>
    </div>
  )
}
