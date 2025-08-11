'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAgeVerification } from '@/store/use-age-verification'
import { useCookieConsent } from '@/store/use-cookie-consent'

export const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const { isVerified, setVerified } = useAgeVerification()
  const { hasConsented } = useCookieConsent()
  const [sessionVerified, setSessionVerified] = useState(false)
  const [open, setOpen] = useState(!(isVerified || sessionVerified))

  useEffect(() => {
    setOpen(!(isVerified || sessionVerified))
  }, [isVerified, sessionVerified])

  const handleVerify = () => {
    if (hasConsented) {
      setVerified(true)
    } else {
      setSessionVerified(true)
    }
    setOpen(false)
  }

  // Pokud není souhlas s cookies, nikdy neukládej ověření a vždy se ptej znovu po reloadu
  useEffect(() => {
    if (!hasConsented && isVerified) {
      setVerified(false)
      setOpen(true)
    }
  }, [hasConsented])

  return (
    <section className='bg-brand-action'>
      <Dialog open={open}>
        <DialogContent showCloseButton={false} className='bg-brand-primary'>
          <DialogHeader>
            <DialogTitle className='text-brand-action text-2xl'>
              Je vám 18 let nebo více?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant='green' onClick={handleVerify} autoFocus>
              Ano, je mi 18+
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {(isVerified || sessionVerified) && children}
    </section>
  )
}
