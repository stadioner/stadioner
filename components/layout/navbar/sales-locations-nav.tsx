'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverAnchor,
  PopoverContent
} from '@/components/ui/popover'
import { Border } from '@/components/border'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/store/use-language'
import {
  isSupportedLanguage,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'
import {
  getSalesLocationsNavItems,
  getSalesLocationsNavLabels
} from '@/lib/i18n/sales-locations-nav'
import {
  NAV_DROPDOWN_SIDE_OFFSET,
  navDropdownContentClassName,
  navDropdownTriggerClassName,
  useNavDropdownHover
} from '@/components/layout/navbar/nav-dropdown'

interface SalesLocationsNavProps {
  phone?: boolean
  setIsOpen?: (state: boolean) => void
}

const PhoneSalesLocationsNav = ({
  labels,
  items,
  pagePath,
  isActive,
  onLinkClick
}: {
  labels: ReturnType<typeof getSalesLocationsNavLabels>
  items: ReturnType<typeof getSalesLocationsNavItems>
  pagePath: string
  isActive: boolean
  onLinkClick: () => void
}) => {
  return (
    <li className='w-full'>
      <Link
        href={pagePath}
        onClick={onLinkClick}
        className={cn(
          'text-brand-primary inline-flex w-full items-center gap-2 text-2xl font-bold md:justify-center md:text-3xl',
          isActive && 'underline underline-offset-4'
        )}
      >
        <span>{labels.trigger}</span>
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          aria-hidden
          className='shrink-0 rotate-180'
        />
      </Link>

      <ul className='mt-2 flex flex-col gap-2 pl-4 md:items-center md:pl-0'>
        {items.map((item) => (
          <li
            key={item.href}
            onClick={onLinkClick}
            className='text-brand-primary/80 text-lg md:text-xl'
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export const SalesLocationsNav = ({
  phone,
  setIsOpen
}: SalesLocationsNavProps) => {
  const { language } = useLanguage()
  const currentLanguage: SupportedLanguage = isSupportedLanguage(language) ?
      language
    : 'cs'
  const localizedRootPath = `/${currentLanguage}`
  const pathname = usePathname()
  const currentPath = pathname ?? ''
  const pagePath = `${localizedRootPath}/prodejni-mista`
  const isActive =
    currentPath === pagePath || currentPath.startsWith(`${pagePath}/`)

  const labels = getSalesLocationsNavLabels(currentLanguage)
  const items = getSalesLocationsNavItems(currentLanguage, localizedRootPath)
  const { open, setOpen, openMenu, scheduleClose, closeMenu } =
    useNavDropdownHover()

  const handleLinkClick = () => {
    closeMenu()
    setIsOpen?.(false)
  }

  if (phone) {
    return (
      <PhoneSalesLocationsNav
        labels={labels}
        items={items}
        pagePath={pagePath}
        isActive={isActive}
        onLinkClick={handleLinkClick}
      />
    )
  }

  return (
    <li className='flex h-9 w-fit items-center'>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverAnchor asChild>
          <div
            aria-expanded={open}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            className={navDropdownTriggerClassName(
              'text-brand-action inline-flex h-9 w-fit items-center gap-1 text-lg',
              isActive && 'font-bold'
            )}
          >
            <Link
              href={pagePath}
              onClick={closeMenu}
              className='text-brand-action text-lg'
            >
              {labels.trigger}
            </Link>
            <ChevronDown
              size={14}
              strokeWidth={2.5}
              aria-hidden
              className={cn(
                'shrink-0 transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          sideOffset={NAV_DROPDOWN_SIDE_OFFSET}
          align='start'
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          className={navDropdownContentClassName('relative w-max max-w-none')}
        >
          <div
            aria-hidden
            className='absolute -top-5 right-0 left-0 h-5'
          />
          <Border>
            <ul className='bg-brand-secondary flex flex-col py-1'>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className='text-brand-action hover:bg-brand-primary/40 block px-3 py-1.5 text-base whitespace-nowrap transition-colors'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Border>
        </PopoverContent>
      </Popover>
    </li>
  )
}
