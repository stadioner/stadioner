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
  setIsOpen,
}) => {
  const pathname = usePathname()

  return (
    <li
      onClick={() => setIsOpen && setIsOpen(false)}
      className={cn(
        phone ? 'text-brand-primary text-2xl' : 'text-brand-action text-lg',
        pathname.includes(href) && 'font-bold'
      )}
    >
      <Link href={href}>{label}</Link>
    </li>
  )
}
