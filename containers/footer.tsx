'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { ExternalLinkIcon, FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/custom-toast'

export const Footer = () => {
  const { language } = useLanguage()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('EMAIL', email)
      formData.append('b_0fe24a4d8159780e91fdf8f8d_fc6d3b1ef6', '')
      formData.append('f_id', '007877eef0')

      await fetch(
        'https://stadioner.us20.list-manage.com/subscribe/post?u=0fe24a4d8159780e91fdf8f8d&id=fc6d3b1ef6&f_id=007877eef0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        },
      )

      const successMessage =
        language === 'cs'
          ? 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'
          : language === 'en'
            ? 'Please check your email and confirm your subscription!'
            : language === 'de'
              ? 'Bitte überprüfen Sie Ihre E-Mail und bestätigen Sie Ihr Abonnement!'
              : 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'

      showToast(successMessage, 'success')
      setEmail('')
    } catch (error) {
      const successMessage =
        language === 'cs'
          ? 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'
          : language === 'en'
            ? 'Please check your email and confirm your subscription!'
            : language === 'de'
              ? 'Bitte überprüfen Sie Ihre E-Mail und bestätigen Sie Ihr Abonnement!'
              : 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!'

      showToast(successMessage, 'success')
      setEmail('')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <Link href='/clanky'>
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
          <div className='flex flex-col text-xl gap-2'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </h4>
            <Link href='/produkty?produkt=safar-15&kategorie=pivo'>
              Šafář 15
            </Link>
            <Link href='/produkty?produkt=profesor-12&kategorie=pivo'>
              Profesor 12
            </Link>
            <Link href='/produkty?produkt=hvozdar-12&kategorie=pivo'>
              Hvozdář 12
            </Link>
            <Link href='/produkty?produkt=experiment-11&kategorie=pivo'>
              Experiment 11
            </Link>
            <Link href='/produkty?produkt=pozarnik-10&kategorie=pivo'>
              Požárník 10
            </Link>

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
            <Link href='/produkty/?produkt=pramenita-voda-perliva&kategorie=voda'>
              {language === 'cs' && 'Pramenitá voda (Sycená)'}
              {language === 'en' && 'Spring water (Sparkling)'}
              {language === 'de' && 'Quellwasser (Kohlensäurehaltig)'}
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-neperliva&kategorie=voda'>
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
              {language === 'cs' &&
                'Přihlaste se k odběru našeho newsletteru a získejte jako první informace o našich produktech, akcích apod.'}
              {language === 'en' &&
                'Sign up for our newsletter and be the first to receive information about our products, events, etc.'}
              {language === 'de' &&
                'Abonnieren Sie unseren Newsletter und erhalten Sie als Erste Informationen über unsere Produkte, Aktionen usw.'}
            </p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={
                  language === 'cs'
                    ? 'Váš email'
                    : language === 'en'
                      ? 'Your email'
                      : language === 'de'
                        ? 'Ihre E-Mail'
                        : 'Váš email'
                }
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
                {isSubmitting
                  ? language === 'cs'
                    ? 'Odesílám...'
                    : language === 'en'
                      ? 'Sending...'
                      : language === 'de'
                        ? 'Sende...'
                        : 'Odesílám...'
                  : language === 'cs'
                    ? 'Přihlásit se'
                    : language === 'en'
                      ? 'Subscribe'
                      : language === 'de'
                        ? 'Abonnieren'
                        : 'Přihlásit se'}
              </Button>

              <p className='text-xs text-brand-action/60'>
                {language === 'cs' && (
                  <>
                    Odesláním souhlasíte s{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-action'
                    >
                      ochranou osobních údajů
                    </Link>
                  </>
                )}
                {language === 'en' && (
                  <>
                    By submitting you agree to our{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-action'
                    >
                      personal data protection
                    </Link>
                  </>
                )}
                {language === 'de' && (
                  <>
                    Mit der Übermittlung stimmen Sie unserem{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-action'
                    >
                      Datenschutz
                    </Link>{' '}
                    zu
                  </>
                )}
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
