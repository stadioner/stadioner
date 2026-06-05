'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject
} from 'react'
import { cn } from '@/lib/utils'

/** Tailwind `lg` — below this width the compact mobile navbar is used. */
export const NAVBAR_MOBILE_MEDIA_QUERY = '(max-width: 1023px)'

/** Vertical gap between navbar trigger and dropdown (matches previous `mt-5`). */
export const NAV_DROPDOWN_SIDE_OFFSET = 20

export const navDropdownContentClassName = (...extra: string[]) =>
  cn(
    'bg-brand-secondary z-[1112] rounded-none border-none p-0 shadow-none',
    ...extra
  )

export const navDropdownTriggerClassName = (...extra: string[]) =>
  cn(
    'relative after:absolute after:inset-x-0 after:top-full after:h-5 after:content-[""]',
    ...extra
  )

export const useNavDropdownHover = () => {
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = () => {
    cancelScheduledClose()
    setOpen(true)
  }

  const scheduleClose = () => {
    cancelScheduledClose()
    closeTimerRef.current = setTimeout(() => setOpen(false), 150)
  }

  const closeMenu = () => {
    cancelScheduledClose()
    setOpen(false)
  }

  useEffect(() => () => cancelScheduledClose(), [])

  return { open, setOpen, openMenu, scheduleClose, closeMenu }
}

export const getNavbarBorderLeft = (trigger: HTMLElement): number | null => {
  const nav = trigger.closest('nav')
  if (!nav) return null

  const container = nav.firstElementChild
  if (!container) return null

  const border = container.firstElementChild
  if (!(border instanceof HTMLElement)) return null

  return border.getBoundingClientRect().left
}

export const useNavDropdownMobileAlign = (
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean
) => {
  const [align, setAlign] = useState<'start' | 'center'>('center')
  const [alignOffset, setAlignOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const updateAlign = useCallback(() => {
    const mobile = window.matchMedia(NAVBAR_MOBILE_MEDIA_QUERY).matches
    setIsMobile(mobile)

    if (!mobile) {
      setAlign('center')
      setAlignOffset(0)
      return
    }

    const trigger = triggerRef.current
    if (!trigger) return

    const borderLeft = getNavbarBorderLeft(trigger)
    if (borderLeft == null) return

    const triggerLeft = trigger.getBoundingClientRect().left
    setAlign('start')
    setAlignOffset(borderLeft - triggerLeft)
  }, [triggerRef])

  useLayoutEffect(() => {
    updateAlign()

    const mediaQuery = window.matchMedia(NAVBAR_MOBILE_MEDIA_QUERY)
    mediaQuery.addEventListener('change', updateAlign)
    window.addEventListener('resize', updateAlign)

    return () => {
      mediaQuery.removeEventListener('change', updateAlign)
      window.removeEventListener('resize', updateAlign)
    }
  }, [updateAlign, open])

  return { align, alignOffset, isMobile }
}
