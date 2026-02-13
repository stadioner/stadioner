import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'QR Redirect',
  robots: {
    index: false,
    follow: false,
  },
}

export default function QrPage() {
  redirect('/rozcestnik')
}
