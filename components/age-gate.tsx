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

export const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [ageVerified, setAgeVerified] = useState(false)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem('age-verified') === 'true'
      setAgeVerified(verified)
      setOpen(!verified)
    }
  }, [])

  const handleVerify = () => {
    setAgeVerified(true)
    setOpen(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('age-verified', 'true')
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Je vám 18 let nebo více?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleVerify} autoFocus>
              Ano, je mi 18+
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {ageVerified && children}
    </>
  )
}
