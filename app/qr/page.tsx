'use client'

import { useRouter } from 'next/navigation'

export default function QrPage() {
  const router = useRouter()

  router.push('/rozcestnik')
}
