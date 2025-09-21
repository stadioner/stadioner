'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { ExternalLinkIcon, FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  const { language } = useLanguage()

  return (
    <footer className='bg-brand-secondary pt-20 pb-10'>
      <Container>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20 md:gap-10'>
          <div className='grid text-xl'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Odkazy'}
              {language === 'en' && 'Links'}
              {language === 'de' && 'Links'}
            </h4>
            <Link href='/'>
              {language === 'cs' && 'Domů'}
              {language === 'en' && 'Home'}
              {language === 'de' && 'Startseite'}
            </Link>
            <Link href='/produkty'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </Link>
            <Link href='/prodejni-mista'>
              {language === 'cs' && 'Prodejní Místa'}
              {language === 'en' && 'Sales Locations'}
              {language === 'de' && 'Verkaufsstellen'}
            </Link>
            <Link href='/blog'>
              {language === 'cs' && 'Články'}
              {language === 'en' && 'Articles'}
              {language === 'de' && 'Artikel'}
            </Link>
            <Link href='/historie'>
              {language === 'cs' && 'Historie'}
              {language === 'en' && 'History'}
              {language === 'de' && 'Geschichte'}
            </Link>
            <Link href='/kontakt'>
              {language === 'cs' && 'Kontakt'}
              {language === 'en' && 'Contact'}
              {language === 'de' && 'Kontakt'}
            </Link>
            <Link href='/cookies'>
              {language === 'cs' && 'Cookies'}
              {language === 'en' && 'Cookies'}
              {language === 'de' && 'Cookies'}
            </Link>
            <Link href='/gdpr'>
              {language === 'cs' && 'GDPR'}
              {language === 'en' && 'GDPR'}
              {language === 'de' && 'GDPR'}
            </Link>
          </div>
          <div className='flex flex-col justify-self-center text-xl'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </h4>
            <Link href='/produkty?produkt=profesor-dvanactka&kategorie=pivo'>
              {language === 'cs' && 'Profesor dvanáctka'}
              {language === 'en' && 'Professor 12'}
              {language === 'de' && 'Professor 12'}
            </Link>
            {/* <Link href='/produkty?produkt=koutska-jedenactka&kategorie=pivo'>
              Koutská Jedenáctka
            </Link> */}
            <Link href='/produkty?produkt=limonada-pomeranc&kategorie=limo'>
              {language === 'cs' && 'Limonáda pomeranč'}
              {language === 'en' && 'Orange Lemonade'}
              {language === 'de' && 'Orangenlimonade'}
            </Link>
            <Link href='/produkty?produkt=limonada-citron&kategorie=limo'>
              {language === 'cs' && 'Limonáda citrón'}
              {language === 'en' && 'Lemon Lemonade'}
              {language === 'de' && 'Zitronenlimonade'}
            </Link>
            <Link href='/produkty?produkt=cola-mix&kategorie=limo'>
              {language === 'cs' && 'Cola mix'}
              {language === 'en' && 'Cola mix'}
              {language === 'de' && 'Cola Mix'}
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-sycena&kategorie=voda'>
              {language === 'cs' && 'Pramenitá voda (Sycená)'}
              {language === 'en' && 'Spring water (Sparkling)'}
              {language === 'de' && 'Quellwasser (Kohlensäurehaltig)'}
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-nesycena&kategorie=voda'>
              {language === 'cs' && 'Pramenitá voda (Nesycená)'}
              {language === 'en' && 'Spring water (Still)'}
              {language === 'de' && 'Quellwasser (Still)'}
            </Link>
          </div>
          <div className='grid justify-between md:justify-self-end gap-4 text-xl'>
            <div>
              <h4 className='text-3xl font-bold text-brand-action'>
                {language === 'cs' && 'Adresa'}
                {language === 'en' && 'Address'}
                {language === 'de' && 'Adresse'}
              </h4>
              <p>Kout na Šumavě 2</p>
              <p>34502 Kout na Šumavě</p>
              <Link
                href='https://maps.app.goo.gl/XQF36VsckwAMPkmRA'
                target='_blank'
                className='text-zinc-700 inline-flex items-center gap-1 mt-2'
              >
                <ExternalLinkIcon size={15} />

                {language === 'cs' && 'Trasa'}
                {language === 'en' && 'Route'}
                {language === 'de' && 'Strecke'}
              </Link>
            </div>

            <div className='flex gap-4 w-min h-min'>
              <Link
                href='https://www.facebook.com/stadioner.cz'
                target='_blank'
              >
                <FacebookIcon size={25} className='stroke-brand-action' />
              </Link>
              <Link
                href='https://www.instagram.com/stadioner.cz/'
                target='_blank'
              >
                <InstagramIcon size={25} className='stroke-brand-action' />
              </Link>
              <Link href='https://www.tiktok.com/@stadioner.cz' target='_blank'>
                <svg
                  width={25}
                  height={25}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  className='stroke-brand-action'
                >
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <p className='pt-14 text-xs text-center'>
          &copy; {new Date().getFullYear()} Stadioner -{' '}
          {language === 'cs' && 'Všechna práva vyhrazena'}
          {language === 'en' && 'All rights reserved'}
          {language === 'de' && 'Alle Rechte vorbehalten'}.{' '}
          <br className='md:hidden' />
          {language === 'cs' && 'Vytvořil'}
          {language === 'en' && 'Created by'}
          {language === 'de' && 'Erstellt von'}{' '}
          <Link href='https://baudys.dev' target='_blank' className='underline'>
            Daniel Anthony Baudyš
          </Link>
        </p>
      </Container>
    </footer>
  )
}
