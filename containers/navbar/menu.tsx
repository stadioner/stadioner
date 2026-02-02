'use client'

import { NavItem } from '@/components/nav-item'
import { useLanguage } from '@/store/use-language'
import { motion } from 'framer-motion'

interface MenuProps {
  setIsOpen: (state: boolean) => void
}

export const Menu = ({ setIsOpen }: MenuProps) => {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: [0.12, 0, 0.39, 0],
        },
      }}
      exit={{
        scaleY: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className='fixed left-0 top-0 z-[1002] grid h-screen w-screen origin-top justify-between bg-brand-action'
    >
      <button
        onClick={() => setIsOpen(false)}
        className='absolute right-11 top-11 cursor-pointer text-brand-primary'
      >
        {language === 'cs' && 'Zavřít'}
        {language === 'en' && 'Close'}
        {language === 'de' && 'Zurück'}
      </button>

      <ul className='absolute left-1/2 top-60 flex -translate-x-1/2 flex-col items-center gap-6 text-center text-white z-[1003]'>
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Produkty / E-shop'
              : language === 'en'
                ? 'Products / E-shop'
                : language === 'de'
                  ? 'Produkte / E-shop'
                  : ''
          }
          href='/produkty'
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Prodejní Místa'
              : language === 'en'
                ? 'Sales Locations'
                : language === 'de'
                  ? 'Verkaufsstellen'
                  : ''
          }
          href='/prodejni-mista'
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Pro Firmy'
              : language === 'en'
                ? 'For Companies'
                : language === 'de'
                  ? 'Für Unternehmen'
                  : ''
          }
          href='/pro-firmy'
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Události'
              : language === 'en'
                ? 'Events'
                : language === 'de'
                  ? 'Veranstaltungen'
                  : ''
          }
          href={`/udalosti`}
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Články'
              : language === 'en'
                ? 'Articles'
                : language === 'de'
                  ? 'Artikel'
                  : ''
          }
          href='/clanky'
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Historie'
              : language === 'en'
                ? 'History'
                : language === 'de'
                  ? 'Geschichte'
                  : ''
          }
          href='/historie'
        />
        <NavItem
          phone
          setIsOpen={setIsOpen}
          label={
            language === 'cs'
              ? 'Kontakt'
              : language === 'en'
                ? 'Contact'
                : language === 'de'
                  ? 'Kontakt'
                  : ''
          }
          href='/kontakt'
        />
      </ul>
    </motion.div>
  )
}
