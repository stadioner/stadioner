import type { Metadata } from 'next'
import { Caladea, Mohave } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const mohave = Mohave({
  variable: '--font-mohave',
})

const caladea = Caladea({
  variable: '--font-caladea',
  weight: '400',
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
        {children}
      </body>
    </html>
  )
}
