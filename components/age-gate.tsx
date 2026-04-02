'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAgeVerification } from '@/store/use-age-verification'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { useLanguage } from '@/store/use-language'
import { Border } from './border'

const ageGateSessionKey = 'age-verification-session'

export const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage()
  const {
    isVerified,
    isHydrated: isAgeStoreHydrated,
    setVerified
  } = useAgeVerification()
  const { hasConsented, isHydrated: isConsentStoreHydrated } =
    useCookieConsent()
  const [sessionVerified, setSessionVerified] = useState(false)
  const [isClientHydrated, setIsClientHydrated] = useState(false)
  const pathname = usePathname()
  const currentPath = pathname ?? ''
  const isExcludedPage =
    currentPath === '/rozcestnik' ||
    currentPath === '/qr' ||
    currentPath.includes('/studio') ||
    currentPath === '/newsletter'

  const isHydrated =
    isClientHydrated && isAgeStoreHydrated && isConsentStoreHydrated
  const shouldShowAgeGate = !(isVerified || sessionVerified) && !isExcludedPage

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsClientHydrated(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setSessionVerified(
      window.sessionStorage.getItem(ageGateSessionKey) === 'true'
    )
  }, [])

  useEffect(() => {
    if (isHydrated) {
      setOpen(shouldShowAgeGate)
    }
  }, [
    isHydrated,
    isVerified,
    sessionVerified,
    isExcludedPage,
    shouldShowAgeGate
  ])

  const handleVerify = () => {
    if (hasConsented) {
      setVerified(true)
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(ageGateSessionKey)
      }
    } else {
      setSessionVerified(true)
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(ageGateSessionKey, 'true')
      }
    }
    setOpen(false)
  }

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    if (!hasConsented && isVerified) {
      setVerified(false)
      setSessionVerified(true)
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(ageGateSessionKey, 'true')
      }
    }
  }, [hasConsented, isHydrated, isVerified, setVerified])

  if (!isHydrated) {
    return <section className='bg-brand-action'>{children}</section>
  }

  return (
    <section className='bg-brand-action'>
      {open && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
          {/* Custom overlay that doesn't block navbar */}
          <div className='absolute inset-0 bg-black/50' />
          <div className='relative z-[1000] mx-4 w-full max-w-md'>
            <Border backgroundLight>
              <div className='bg-brand-primary p-6 shadow-lg'>
                <div className='text-center'>
                  <h2 className='text-brand-action mb-6 text-2xl font-bold'>
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
