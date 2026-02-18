'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useLanguage, useLanguageSync } from '@/store/use-language'
import { Border } from '@/components/border'
import { usePathname, useRouter } from 'next/navigation'
import {
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/i18n/site-languages'
import type { SupportedLanguage } from '@/lib/i18n/site-languages'

const flagByLanguage = {
  cs: '/flags/cs.svg',
  en: '/flags/en.svg',
  de: '/flags/de.svg',
} as const

const languages = supportedLanguages.map(value => ({
  value,
  src: flagByLanguage[value],
}))

type DetailSection = 'clanky' | 'udalosti'

const isDetailSection = (section: string): section is DetailSection => {
  return section === 'clanky' || section === 'udalosti'
}

const getAlternatePathForLocale = (locale: SupportedLanguage): string | null => {
  if (typeof document === 'undefined') {
    return null
  }

  const alternateLink = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${locale}"]`,
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

const isNavigablePath = async (path: string): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const headResponse = await fetch(path, {
      method: 'HEAD',
      cache: 'no-store',
      redirect: 'manual',
    })

    if (headResponse.status === 405) {
      const getResponse = await fetch(path, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'manual',
      })
      return getResponse.ok || (getResponse.status >= 300 && getResponse.status < 400)
    }

    return headResponse.ok || (headResponse.status >= 300 && headResponse.status < 400)
  } catch {
    return false
  }
}

export const LanguageSelector = () => {
  useLanguageSync()
  const { language, imgSrc, setLanguage } = useLanguage(state => state)
  const pathname = usePathname()
  const router = useRouter()
  const pushPreservingScroll = (targetPath: string) => {
    router.push(targetPath, { scroll: false })
  }

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between border-none !bg-transparent hover:bg-transparent cursor-pointer p-0 shadow-none'
        >
          <Image src={imgSrc(language)} width={30} height={30} alt={language} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        className='z-[1112] w-[100px] bg-brand-secondary p-0 rounded-none mt-5 mr-5'
      >
        <Border>
          <Command>
            <CommandGroup className='space-y-2 bg-brand-secondary'>
              {languages.map(
                ({ src, value }: { src: string; value: SupportedLanguage }) => (
                  <CommandItem
                    key={value}
                    onSelect={async () => {
                      if (value === language) {
                        setOpen(false)
                        return
                      }

                      setLanguage(value)
                      setOpen(false)

                      const query =
                        typeof window !== 'undefined' ? window.location.search : ''
                      const hash =
                        typeof window !== 'undefined' ? window.location.hash : ''
                      const detailSection = getDetailSectionFromPath(pathname)

                      const alternatePath = getAlternatePathForLocale(value)
                      if (alternatePath && !detailSection) {
                        pushPreservingScroll(alternatePath)
                        return
                      }
                      if (alternatePath && detailSection) {
                        const canNavigateToAlternate =
                          await isNavigablePath(alternatePath)
                        if (canNavigateToAlternate) {
                          pushPreservingScroll(alternatePath)
                          return
                        }

                        pushPreservingScroll(`/${value}/${detailSection}${query}`)
                        return
                      }
                      if (detailSection) {
                        pushPreservingScroll(`/${value}/${detailSection}${query}`)
                        return
                      }

                      const pathSegments = pathname.split('/').filter(Boolean)
                      const [firstSegment, ...remainingSegments] = pathSegments

                      const normalizedPath = isSupportedLanguage(firstSegment)
                        ? `/${remainingSegments.join('/')}`
                        : pathname

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
                    <Image src={src} width={30} height={30} alt={value} />
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
