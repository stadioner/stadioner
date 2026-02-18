'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { ExternalLinkIcon, FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'

export const Footer = () => {
  const { language } = useLanguage()
  const localizedRootPath = `/${language}`
  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language,
    markSubscribed: false,
  })

  return (
    <footer className='bg-brand-secondary pt-20 pb-10'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 md:gap-10 lg:gap-12'>
          <div className='grid text-xl gap-2'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Odkazy'}
              {language === 'en' && 'Links'}
              {language === 'de' && 'Links'}
            </h4>
            <Link href={localizedRootPath}>
              {language === 'cs' && 'Domů'}
              {language === 'en' && 'Home'}
              {language === 'de' && 'Startseite'}
            </Link>
            <Link href={`${localizedRootPath}/produkty`}>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </Link>
            <Link href={`${localizedRootPath}/prodejni-mista`}>
              {language === 'cs' && 'Prodejní Místa'}
              {language === 'en' && 'Sales Locations'}
              {language === 'de' && 'Verkaufsstellen'}
            </Link>
            <Link href={`${localizedRootPath}/udalosti`}>
              {language === 'cs' && 'Události'}
              {language === 'en' && 'Events'}
              {language === 'de' && 'Veranstaltungen'}
            </Link>
            <Link href={`${localizedRootPath}/clanky`}>
              {language === 'cs' && 'Články'}
              {language === 'en' && 'Articles'}
              {language === 'de' && 'Artikel'}
            </Link>
            <Link href={`${localizedRootPath}/historie`}>
              {language === 'cs' && 'Historie'}
              {language === 'en' && 'History'}
              {language === 'de' && 'Geschichte'}
            </Link>
            <Link href={`${localizedRootPath}/kontakt`}>
              {language === 'cs' && 'Kontakt'}
              {language === 'en' && 'Contact'}
              {language === 'de' && 'Kontakt'}
            </Link>
            <Link href={`${localizedRootPath}/cookies`}>
              {language === 'cs' && 'Cookies'}
              {language === 'en' && 'Cookies'}
              {language === 'de' && 'Cookies'}
            </Link>
            <Link href={`${localizedRootPath}/gdpr`}>
              {language === 'cs' && 'GDPR'}
              {language === 'en' && 'GDPR'}
              {language === 'de' && 'GDPR'}
            </Link>
          </div>
          <div className='flex flex-col text-xl gap-2'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </h4>
            <Link href={`${localizedRootPath}/produkty?produkt=safar-15&kategorie=pivo`}>
              Šafář 15
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=profesor-12&kategorie=pivo`}>
              Profesor 12
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=hvozdar-12&kategorie=pivo`}>
              Hvozdář 12
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=experiment-11&kategorie=pivo`}>
              Experiment 11
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=pozarnik-10&kategorie=pivo`}>
              Požárník 10
            </Link>

            <Link href={`${localizedRootPath}/produkty?produkt=limonada-pomeranc&kategorie=limo`}>
              {language === 'cs' && 'Limonáda pomeranč'}
              {language === 'en' && 'Orange Lemonade'}
              {language === 'de' && 'Orangenlimonade'}
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=limonada-citron&kategorie=limo`}>
              {language === 'cs' && 'Limonáda citrón'}
              {language === 'en' && 'Lemon Lemonade'}
              {language === 'de' && 'Zitronenlimonade'}
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=cola-mix&kategorie=limo`}>
              {language === 'cs' && 'Cola mix'}
              {language === 'en' && 'Cola mix'}
              {language === 'de' && 'Cola Mix'}
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=pramenita-voda-perliva&kategorie=voda`}>
              {language === 'cs' && 'Pramenitá voda (Sycená)'}
              {language === 'en' && 'Spring water (Sparkling)'}
              {language === 'de' && 'Quellwasser (Kohlensäurehaltig)'}
            </Link>
            <Link href={`${localizedRootPath}/produkty?produkt=pramenita-voda-neperliva&kategorie=voda`}>
              {language === 'cs' && 'Pramenitá voda (Nesycená)'}
              {language === 'en' && 'Spring water (Still)'}
              {language === 'de' && 'Quellwasser (Still)'}
            </Link>
          </div>
          <div className='flex flex-col text-xl gap-4'>
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
            </div>
          </div>

          {/* Newsletter Section */}
          <div className='flex flex-col gap-4 text-xl'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Newsletter'}
              {language === 'en' && 'Newsletter'}
              {language === 'de' && 'Newsletter'}
            </h4>
            <p className='text-sm text-brand-action/80'>
              {copy.info}
            </p>

            <form onSubmit={submit} className='flex flex-col gap-3'>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={copy.placeholder}
                required
                className='px-3 py-2 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50'
              />
              <Button
                type='submit'
                disabled={isSubmitting}
                variant='green'
                size='sm'
                className='w-fit'
              >
                {isSubmitting ? copy.submitting : copy.submit}
              </Button>

              <p className='text-xs text-brand-action/60'>
                {copy.gdprPrefix}{' '}
                <Link
                  href={`${localizedRootPath}/gdpr`}
                  className='underline hover:text-brand-action'
                >
                  {copy.gdprLink}
                </Link>
                {language === 'de' && ' zu'}
              </p>
            </form>
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
