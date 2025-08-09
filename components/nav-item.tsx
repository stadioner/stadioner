'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname()

  return (
    <li
      className={cn(
        'text-brand-action text-lg',
        pathname === href && 'font-bold'
      )}
    >
      <Link href={href}>{label}</Link>
    </li>
  )
}
