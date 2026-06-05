'use client'

import { ReactNode } from 'react'
import { NavItem } from '@/components/layout/navbar/nav-item'
import { SalesLocationsNav } from '@/components/layout/navbar/sales-locations-nav'
import { useLanguage } from '@/store/use-language'
import {
  isSupportedLanguage,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'
import { getMobileMenuCloseLabel } from '@/lib/i18n/mobile-menu'
import { motion } from 'framer-motion'

interface MenuProps {
  setIsOpen: (state: boolean) => void
}

const MobileMenuSection = ({
  divider,
  children
}: {
  divider?: boolean
  children: ReactNode
}) => (
  <li
    className={
      divider ?
        'border-brand-primary/25 w-full border-t pt-8 md:pt-10'
      : 'w-full'
    }
  >
    <ul className='flex w-full flex-col gap-4 md:items-center md:gap-5'>
      {children}
    </ul>
  </li>
)

export const Menu = ({ setIsOpen }: MenuProps) => {
  const { language } = useLanguage()
  const currentLanguage: SupportedLanguage = isSupportedLanguage(language) ?
      language
    : 'cs'
  const localizedRootPath = `/${currentLanguage}`
  const closeLabel = getMobileMenuCloseLabel(currentLanguage)

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: [0.12, 0, 0.39, 0]
        }
      }}
      exit={{
        scaleY: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      className='bg-brand-action fixed top-0 left-0 z-[1002] flex h-screen w-screen origin-top flex-col'
    >
      <button
        onClick={() => setIsOpen(false)}
        className='text-brand-primary absolute top-10 right-8 z-[1004] cursor-pointer px-2 py-1 text-lg md:top-12 md:right-12 md:text-xl'
      >
        {closeLabel}
      </button>

      <nav className='z-[1003] flex flex-1 items-center justify-center overflow-y-auto px-8 py-24 md:px-12'>
        <ul className='flex w-full max-w-sm flex-col gap-8 pb-8 md:max-w-lg md:items-center md:gap-10 md:text-center'>
          <MobileMenuSection>
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Produkty / E-shop'
                : currentLanguage === 'en' ?
                  'Products / E-shop'
                : 'Produkte / E-shop'
              }
              href={`${localizedRootPath}/produkty`}
            />
          </MobileMenuSection>

          <MobileMenuSection divider>
            <SalesLocationsNav
              phone
              setIsOpen={setIsOpen}
            />
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Pro Firmy'
                : currentLanguage === 'en' ?
                  'For Companies'
                : 'Für Unternehmen'
              }
              href={`${localizedRootPath}/pro-firmy`}
            />
          </MobileMenuSection>

          <MobileMenuSection divider>
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Události'
                : currentLanguage === 'en' ?
                  'Events'
                : 'Veranstaltungen'
              }
              href={`${localizedRootPath}/udalosti`}
            />
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Články'
                : currentLanguage === 'en' ?
                  'Articles'
                : 'Artikel'
              }
              href={`${localizedRootPath}/clanky`}
            />
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Historie'
                : currentLanguage === 'en' ?
                  'History'
                : 'Geschichte'
              }
              href={`${localizedRootPath}/historie`}
            />
            <NavItem
              phone
              setIsOpen={setIsOpen}
              label={
                currentLanguage === 'cs' ? 'Kontakt'
                : currentLanguage === 'en' ?
                  'Contact'
                : 'Kontakt'
              }
              href={`${localizedRootPath}/kontakt`}
            />
          </MobileMenuSection>
        </ul>
      </nav>
    </motion.div>
  )
}
