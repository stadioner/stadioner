import type { Metadata } from 'next'
import { Caladea, Mohave } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar/navbar'
import { Footer } from '@/components/layout/footer'
import { AgeGate } from '@/components/age-gate'
import { CookieConsent } from '@/components/cookie-consent'
import { CookieManager } from '@/components/cookie-manager'
import { NewsletterPopup } from '@/components/newsletter-popup'
import { Analytics } from '@vercel/analytics/next'
import { ToastProvider } from '@/components/custom-toast'
import { siteUrl } from '@/lib/seo/site'

const mohave = Mohave({
  variable: '--font-mohave',
  subsets: ['latin']
})

const caladea = Caladea({
  variable: '--font-caladea',
  weight: '400',
  subsets: ['latin']
})

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  title: {
    default: 'Pivovar Kout na Šumavě',
    template: '%s | STADIONER'
  },
  description:
    'Tradiční pivovar STADIONER v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů. Navštivte nás nebo najděte naše produkty v Plzeňském kraji.',
  keywords: [
    'pivovar',
    'pivo',
    'Kout na Šumavě',
    'STADIONER',
    'řemeslné pivo',
    'Šumava',
    'limonády',
    'voda'
  ],
  authors: [{ name: 'STADIONER' }],
  creator: 'STADIONER',
  publisher: 'STADIONER',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteUrl,
    siteName: 'STADIONER',
    title: 'Pivovar Kout na Šumavě',
    description:
      'Tradiční pivovar STADIONER v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'STADIONER Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STADIONER - Pivovar Kout na Šumavě',
    description:
      'Tradiční pivovar STADIONER v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    images: ['/logo.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification:
    googleSiteVerification ?
      {
        google: googleSiteVerification
      }
    : undefined
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='cs'>
      <body
        className={cn(
          'font-mohave bg-brand-action antialiased',
          mohave.variable,
          caladea.variable
        )}
      >
        <Analytics />
        <ToastProvider>
          <CookieManager />
          <Navbar />
          <AgeGate>
            <NewsletterPopup />
            {children}
            <Footer />
            <CookieConsent />
          </AgeGate>
        </ToastProvider>
      </body>
    </html>
  )
}
