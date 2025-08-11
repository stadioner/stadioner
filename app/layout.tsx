import type { Metadata } from 'next'
import { Caladea, Mohave } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/containers/navbar/navbar'
import { Footer } from '@/containers/footer'
import { AgeGate } from '@/components/age-gate'

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
  title: 'Stadioner',
  description: '',
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
          'antialiased font-mohave',
          mohave.variable,
          caladea.variable
        )}
      >
        <AgeGate>
          <Navbar />
          {children}
          <Footer />
        </AgeGate>
      </body>
    </html>
  )
}
