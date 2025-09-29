'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAgeVerification } from '@/store/use-age-verification'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { useLanguage } from '@/store/use-language'
import { Border } from './border'

export const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage()
  const { isVerified, setVerified } = useAgeVerification()
  const { hasConsented } = useCookieConsent()
  const [sessionVerified, setSessionVerified] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()
  const isExcludedPage =
    pathname === '/rozcestnik' ||
    pathname === '/qr' ||
    pathname === '/studio' ||
    pathname === '/newsletter'

  const shouldShowAgeGate = !(isVerified || sessionVerified) && !isExcludedPage

  const [open, setOpen] = useState(false)

  // Wait for stores to hydrate before showing age gate
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      setOpen(shouldShowAgeGate)
    }
  }, [isHydrated, isVerified, sessionVerified, isExcludedPage])

  const handleVerify = () => {
    if (hasConsented) {
      setVerified(true)
    } else {
      setSessionVerified(true)
    }
    setOpen(false)
  }

  // Pokud není souhlas s cookies, nikdy neukládej ověření a vždy se ptej znovu po reloadu
  useEffect(() => {
    if (!hasConsented && isVerified) {
      setVerified(false)
      setOpen(true)
    }
  }, [hasConsented])

  // Don't render anything until hydrated to prevent flash
  if (!isHydrated) {
    return <section className='bg-brand-action'>{children}</section>
  }

  return (
    <section className='bg-brand-action'>
      {open && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
          {/* Custom overlay that doesn't block navbar */}
          <div className='absolute inset-0 bg-black/50' />
          <div className='relative z-[1000] max-w-md w-full mx-4'>
            <Border backgroundLight>
              <div className='bg-brand-primary p-6 shadow-lg'>
                <div className='text-center'>
                  <h2 className='text-brand-action text-2xl mb-6 font-bold'>
                    {language === 'cs' && 'Je vám 18 let nebo více?'}
                    {language === 'en' && 'Are you 18 years old or older?'}
                    {language === 'de' && 'Sind Sie 18 Jahre alt oder älter?'}
                  </h2>
                  <Button
                    variant='green'
                    onClick={handleVerify}
                    autoFocus
                    className='w-full'
                  >
                    {language === 'cs' && 'Ano, je mi 18+'}
                    {language === 'en' && 'Yes, I am 18+'}
                    {language === 'de' && 'Ja, ich bin 18+'}
                  </Button>
                </div>
              </div>
            </Border>
          </div>
        </div>
      )}
      {(isVerified || sessionVerified || isExcludedPage) && children}
    </section>
  )
}
