'use client'

import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { useLanguage } from '@/store/use-language'
import { Container } from './container'
import { useState } from 'react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const CookieConsent = () => {
  const { language } = useLanguage()
  const {
    hasConsented,
    isHydrated,
    setConsented,
    cookiePreferences,
    setCookiePreferences,
  } = useCookieConsent()
  const [sessionDeclined, setSessionDeclined] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const pathname = usePathname()

  // Don't render until hydrated to prevent flash
  if (!isHydrated) {
    return null
  }

  // Don't show cookie consent on studio pages
  if (pathname.includes('/studio')) {
    return null
  }

  if (hasConsented || sessionDeclined) {
    return null
  }

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    })
    setConsented(true)
  }

  const handleAcceptSelected = () => {
    setConsented(true)
  }

  const handleDecline = () => {
    setSessionDeclined(true)
  }

  const handlePreferenceChange = (
    type: keyof typeof cookiePreferences,
    value: boolean
  ) => {
    if (type === 'essential') return // Essential cookies can't be disabled
    setCookiePreferences({ [type]: value })
  }

  const translations = {
    cs: {
      title: 'Tento web používá cookies',
      description:
        'Používáme cookies pro zlepšení vašeho uživatelského zážitku. Můžete si vybrat, které typy cookies chcete povolit.',
      learnMore: 'Více informací',
      acceptAll: 'Přijmout vše',
      acceptSelected: 'Přijmout vybrané',
      decline: 'Zamítnout',
      customize: 'Přizpůsobit',
      essential: 'Nezbytné cookies',
      essentialDesc: 'Potřebné pro základní funkčnost webu',
      functional: 'Funkční cookies',
      functionalDesc: 'Umožňují zapamatovat si vaše preference',
      analytics: 'Analytické cookies',
      analyticsDesc: 'Pomáhají nám pochopit, jak používáte web',
      marketing: 'Marketingové cookies',
      marketingDesc: 'Používají se pro zobrazování relevantních reklam',
    },
    en: {
      title: 'This website uses cookies',
      description:
        'We use cookies to improve your user experience. You can choose which types of cookies you want to allow.',
      learnMore: 'Learn more',
      acceptAll: 'Accept all',
      acceptSelected: 'Accept selected',
      decline: 'Decline',
      customize: 'Customize',
      essential: 'Essential cookies',
      essentialDesc: 'Necessary for basic website functionality',
      functional: 'Functional cookies',
      functionalDesc: 'Allow us to remember your preferences',
      analytics: 'Analytics cookies',
      analyticsDesc: 'Help us understand how you use the website',
      marketing: 'Marketing cookies',
      marketingDesc: 'Used to display relevant advertisements',
    },
    de: {
      title: 'Diese Website verwendet Cookies',
      description:
        'Wir verwenden Cookies, um Ihr Benutzererlebnis zu verbessern. Sie können wählen, welche Arten von Cookies Sie zulassen möchten.',
      learnMore: 'Mehr erfahren',
      acceptAll: 'Alle akzeptieren',
      acceptSelected: 'Ausgewählte akzeptieren',
      decline: 'Ablehnen',
      customize: 'Anpassen',
      essential: 'Notwendige Cookies',
      essentialDesc: 'Notwendig für die grundlegende Website-Funktionalität',
      functional: 'Funktionale Cookies',
      functionalDesc: 'Ermöglichen es uns, Ihre Präferenzen zu speichern',
      analytics: 'Analytische Cookies',
      analyticsDesc: 'Helfen uns zu verstehen, wie Sie die Website nutzen',
      marketing: 'Marketing-Cookies',
      marketingDesc: 'Werden verwendet, um relevante Anzeigen anzuzeigen',
    },
  }

  const t =
    translations[language as keyof typeof translations] || translations.cs

  return (
    <div className='fixed bottom-0 left-0 right-0 z-[1001] bg-brand-primary border-t border-brand-action p-4 shadow-lg'>
      <Container className='max-w-6xl'>
        <div className='space-y-4'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row items-start justify-between gap-4'>
            <div className='text-sm text-brand-action flex-1'>
              <h3 className='font-semibold text-base mb-2'>{t.title}</h3>
              <p className='mb-2'>{t.description}</p>
              <Link
                href={`/${language}/cookies`}
                className='text-brand-action underline hover:no-underline'
              >
                {t.learnMore}
              </Link>
            </div>
            <div className='flex gap-2 shrink-0'>
              <Button
                variant='outline'
                onClick={handleDecline}
                className='text-brand-action border-brand-action'
              >
                {t.decline}
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowDetails(!showDetails)}
                className='text-brand-action border-brand-action'
              >
                {t.customize}
                {showDetails ? (
                  <ChevronUp className='ml-1 h-4 w-4' />
                ) : (
                  <ChevronDown className='ml-1 h-4 w-4' />
                )}
              </Button>
              <Button variant='green' onClick={handleAcceptAll}>
                {t.acceptAll}
              </Button>
            </div>
          </div>

          {/* Detailed Preferences */}
          {showDetails && (
            <div className='border-t border-brand-action pt-4'>
              <div className='grid gap-4'>
                {/* Essential Cookies */}
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h4 className='font-medium text-brand-action'>
                      {t.essential}
                    </h4>
                    <p className='text-sm text-gray-600'>{t.essentialDesc}</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.essential}
                    disabled={true}
                    className='opacity-50'
                  />
                </div>

                {/* Functional Cookies */}
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h4 className='font-medium text-brand-action'>
                      {t.functional}
                    </h4>
                    <p className='text-sm text-gray-600'>{t.functionalDesc}</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.functional}
                    onCheckedChange={checked =>
                      handlePreferenceChange('functional', checked)
                    }
                  />
                </div>

                {/* Analytics Cookies */}
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h4 className='font-medium text-brand-action'>
                      {t.analytics}
                    </h4>
                    <p className='text-sm text-gray-600'>{t.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.analytics}
                    onCheckedChange={checked =>
                      handlePreferenceChange('analytics', checked)
                    }
                  />
                </div>

                {/* Marketing Cookies */}
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h4 className='font-medium text-brand-action'>
                      {t.marketing}
                    </h4>
                    <p className='text-sm text-gray-600'>{t.marketingDesc}</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.marketing}
                    onCheckedChange={checked =>
                      handlePreferenceChange('marketing', checked)
                    }
                  />
                </div>

                {/* Accept Selected Button */}
                <div className='flex justify-end pt-2'>
                  <Button variant='green' onClick={handleAcceptSelected}>
                    {t.acceptSelected}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
