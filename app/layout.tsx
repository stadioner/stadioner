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

const mohave = Mohave({
  variable: '--font-mohave',
  subsets: ['latin'],
})

const caladea = Caladea({
  variable: '--font-caladea',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Pivovar Kout na Šumavě',
    template: '%s | Stadioner',
  },
  description:
    'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů. Navštivte nás nebo najděte naše produkty v Plzeňském kraji.',
  keywords: [
    'pivovar',
    'pivo',
    'Kout na Šumavě',
    'Stadioner',
    'řemeslné pivo',
    'Šumava',
    'limonády',
    'voda',
  ],
  authors: [{ name: 'Stadioner' }],
  creator: 'Stadioner',
  publisher: 'Stadioner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stadioner.cz'),
  alternates: {
    canonical: '/',
    languages: {
      cs: '/',
      en: '/en',
      de: '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://stadioner.cz',
    siteName: 'Stadioner',
    title: 'Pivovar Kout na Šumavě',
    description:
      'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Stadioner Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stadioner - Pivovar Kout na Šumavě',
    description:
      'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'antialiased font-mohave bg-brand-action',
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
