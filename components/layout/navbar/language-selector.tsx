'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage, useLanguageSync } from '@/store/use-language'
import { Border } from '@/components/border'
import {
  NAV_DROPDOWN_SIDE_OFFSET,
  navDropdownContentClassName,
  navDropdownTriggerClassName,
  useNavDropdownHover,
  useNavDropdownMobileAlign
} from '@/components/layout/navbar/nav-dropdown'
import { usePathname, useRouter } from 'next/navigation'
import {
  isSupportedLanguage,
  supportedLanguages
} from '@/lib/i18n/site-languages'
import type { SupportedLanguage } from '@/lib/i18n/site-languages'

const flagByLanguage = {
  cs: '/flags/cs.svg',
  en: '/flags/en.svg',
  de: '/flags/de.svg'
} as const

const languages = supportedLanguages.map((value) => ({
  value,
  src: flagByLanguage[value]
}))

type DetailSection = 'clanky' | 'udalosti'

const isDetailSection = (section: string): section is DetailSection => {
  return section === 'clanky' || section === 'udalosti'
}

const getAlternatePathForLocale = (
  locale: SupportedLanguage
): string | null => {
  if (typeof document === 'undefined') {
    return null
  }

  const alternateLink = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${locale}"]`
  )

  if (!alternateLink?.href) {
    return null
  }

  try {
    const url = new URL(alternateLink.href)
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

const getDetailSectionFromPath = (pathname: string): DetailSection | null => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length < 2) {
    return null
  }

  if (isSupportedLanguage(segments[0])) {
    const [, section, slug] = segments
    if (!slug || !isDetailSection(section)) {
      return null
    }

    return section
  }

  const [section, maybeLanguage, slug] = segments
  if (!isDetailSection(section)) {
    return null
  }

  const hasLegacyLanguageSegment = isSupportedLanguage(maybeLanguage ?? '')
  if (hasLegacyLanguageSegment) {
    return slug ? section : null
  }

  return maybeLanguage ? section : null
}

export const LanguageSelector = () => {
  useLanguageSync()
  const { language, imgSrc, setLanguage } = useLanguage((state) => state)
  const pathname = usePathname()
  const currentPath = pathname ?? '/'
  const router = useRouter()
  const pushPreservingScroll = (targetPath: string) => {
    router.push(targetPath, { scroll: false })
  }

  const triggerRef = useRef<HTMLButtonElement>(null)
  const { open, setOpen, openMenu, scheduleClose, closeMenu } =
    useNavDropdownHover()
  const { align, alignOffset, isMobile } = useNavDropdownMobileAlign(
    triggerRef,
    open
  )

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          className={navDropdownTriggerClassName(
            'cursor-pointer justify-between border-none !bg-transparent p-0 shadow-none hover:bg-transparent'
          )}
        >
          <Image
            src={imgSrc(language)}
            width={30}
            height={30}
            alt={language}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={NAV_DROPDOWN_SIDE_OFFSET}
        align={align}
        alignOffset={alignOffset}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        className={navDropdownContentClassName(
          'relative w-[100px]',
          !isMobile && 'mr-5'
        )}
      >
        <div
          aria-hidden
          className='absolute -top-5 right-0 left-0 h-5'
        />
        <Border>
          <Command>
            <CommandGroup className='bg-brand-secondary space-y-2'>
              {languages.map(
                ({ src, value }: { src: string; value: SupportedLanguage }) => (
                  <CommandItem
                    key={value}
                    onSelect={async () => {
                      if (value === language) {
                        closeMenu()
                        return
                      }

                      setLanguage(value)
                      closeMenu()

                      const query =
                        typeof window !== 'undefined' ?
                          window.location.search
                        : ''
                      const hash =
                        typeof window !== 'undefined' ?
                          window.location.hash
                        : ''
                      const detailSection =
                        getDetailSectionFromPath(currentPath)

                      const alternatePath = getAlternatePathForLocale(value)
                      if (alternatePath && !detailSection) {
                        pushPreservingScroll(alternatePath)
                        return
                      }
                      if (alternatePath && detailSection) {
                        pushPreservingScroll(alternatePath)
                        return
                      }
                      if (detailSection) {
                        pushPreservingScroll(
                          `/${value}/${detailSection}${query}`
                        )
                        return
                      }

                      const pathSegments = currentPath
                        .split('/')
                        .filter(Boolean)
                      const [firstSegment, ...remainingSegments] = pathSegments

                      const normalizedPath =
                        isSupportedLanguage(firstSegment) ?
                          `/${remainingSegments.join('/')}`
                        : currentPath

                      const basePath =
                        normalizedPath === '/' ? '' : normalizedPath
                      const targetPath = `/${value}${basePath}${query}${hash}`

                      pushPreservingScroll(targetPath)
                    }}
                    className='mb-2 cursor-pointer'
                  >
                    <Check
                      className={cn(
                        'mr-1 h-4 w-4',
                        language === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <Image
                      src={src}
                      width={30}
                      height={30}
                      alt={value}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </Command>
        </Border>
      </PopoverContent>
    </Popover>
  )
}
