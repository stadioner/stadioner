'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface NavItemProps {
  href: string
  label: string
  phone?: boolean
  setIsOpen?: (state: boolean) => void
}

export const NavItem: FC<NavItemProps> = ({
  href,
  label,
  phone,
  setIsOpen
}) => {
  const pathname = usePathname()
  const currentPath = pathname ?? ''
  const isActive =
    href === '/' ?
      currentPath === '/'
    : currentPath === href || currentPath.startsWith(`${href}/`)

  return (
    <li
      onClick={() => setIsOpen && setIsOpen(false)}
      className={cn(
        phone ?
          'text-brand-primary w-full text-2xl font-bold md:text-3xl'
        : 'text-brand-action text-lg',
        phone && isActive && 'underline underline-offset-4',
        !phone && isActive && 'font-bold'
      )}
    >
      <Link href={href}>{label}</Link>
    </li>
  )
}
