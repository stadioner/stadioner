import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'QR Redirect',
  description: 'Přesměrování na rozcestník pivovaru Stadioner.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function QrPage() {
  redirect('/cs/rozcestnik')
}
