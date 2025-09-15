'use client'

import { useCookieManagement } from '@/hooks/use-cookie-management'

// This component handles the actual cookie enforcement
export const CookieManager = () => {
  useCookieManagement()

  // This component doesn't render anything, it just manages cookies
  return null
}
