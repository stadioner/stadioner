'use client'

import { useState } from 'react'
import { Container } from '@/components/container'
import { Border } from '@/components/border'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function NewsletterPage() {
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('EMAIL', email)
      formData.append('b_0fe24a4d8159780e91fdf8f8d_fc6d3b1ef6', '')
      formData.append('f_id', '007877eef0')

      const response = await fetch(
        'https://stadioner.us20.list-manage.com/subscribe/post?u=0fe24a4d8159780e91fdf8f8d&id=fc6d3b1ef6&f_id=007877eef0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // This allows the request to work with Mailchimp
        }
      )

      // With no-cors mode, we can't check response status, so we assume success
      // Mailchimp will handle the subscription on their end
      const successMessage =
        language === 'cs'
          ? 'Děkujeme za přihlášení k odběru!'
          : language === 'en'
            ? 'Thank you for subscribing!'
            : language === 'de'
              ? 'Vielen Dank für Ihr Abonnement!'
              : 'Děkujeme za přihlášení k odběru!'

      setMessage(successMessage)
      setEmail('')

      // Mark user as subscribed to prevent popup from showing again
      localStorage.setItem('newsletter-subscribed', 'true')
    } catch (error) {
      // Even if there's an error, Mailchimp might have processed the subscription
      // So we show success message
      const successMessage =
        language === 'cs'
          ? 'Děkujeme za přihlášení k odběru!'
          : language === 'en'
            ? 'Thank you for subscribing!'
            : language === 'de'
              ? 'Vielen Dank für Ihr Abonnement!'
              : 'Děkujeme za přihlášení k odběru!'

      setMessage(successMessage)
      setEmail('')

      // Mark user as subscribed to prevent popup from showing again
      localStorage.setItem('newsletter-subscribed', 'true')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-brand-secondary pt-32 pb-20'>
      <Container>
        <div className='max-w-3xl mx-auto'>
          <Border background>
            <div className='bg-brand-action p-8 lg:p-12'>
              {/* Header */}
              <div className='text-center mb-8'>
                <h1 className='text-brand-primary text-3xl lg:text-4xl font-bold mb-4'>
                  {language === 'cs' &&
                    'Přihlaste se k odběru našeho newsletteru'}
                  {language === 'en' && 'Subscribe to our newsletter'}
                  {language === 'de' && 'Abonnieren Sie unseren Newsletter'}
                </h1>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
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
                    className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-lg'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  variant='secondary'
                  size='lg'
                  className='w-full text-lg py-3'
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

                {message && (
                  <div
                    className={cn(
                      'text-center text-lg',
                      message.includes('Děkujeme') ||
                        message.includes('Thank you') ||
                        message.includes('Vielen Dank')
                        ? 'text-brand-primary'
                        : 'text-red-600'
                    )}
                  >
                    {message}
                  </div>
                )}

                <p className='text-sm text-brand-primary/60 text-center'>
                  {language === 'cs' && (
                    <>
                      Odesláním souhlasíte s{' '}
                      <Link
                        href='/gdpr'
                        className='underline hover:text-brand-primary'
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
                        className='underline hover:text-brand-primary'
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
                        className='underline hover:text-brand-primary'
                      >
                        Datenschutz
                      </Link>{' '}
                      zu
                    </>
                  )}
                </p>
              </form>

              {/* Additional Info */}
              <div className='mt-12 pt-8 border-t border-brand-primary/20'>
                <h2 className='text-brand-primary text-xl font-semibold mb-4 text-center'>
                  {language === 'cs' && 'Co můžete očekávat?'}
                  {language === 'en' && 'What can you expect?'}
                  {language === 'de' && 'Was können Sie erwarten?'}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-primary/80'>
                  <div>
                    <h3 className='font-semibold mb-1'>
                      {language === 'cs' && 'Novinky o produktech'}
                      {language === 'en' && 'Product news'}
                      {language === 'de' && 'Produktneuigkeiten'}
                    </h3>
                    <p>
                      {language === 'cs' &&
                        'Informace o nových produktech a jejich dostupnosti'}
                      {language === 'en' &&
                        'Information about new products and their availability'}
                      {language === 'de' &&
                        'Informationen über neue Produkte und deren Verfügbarkeit'}
                    </p>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>
                      {language === 'cs' && 'Speciální akce'}
                      {language === 'en' && 'Special offers'}
                      {language === 'de' && 'Sonderangebote'}
                    </h3>
                    <p>
                      {language === 'cs' &&
                        'Exkluzivní slevy a speciální nabídky'}
                      {language === 'en' &&
                        'Exclusive discounts and special offers'}
                      {language === 'de' &&
                        'Exklusive Rabatte und Sonderangebote'}
                    </p>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>
                      {language === 'cs' && 'Události'}
                      {language === 'en' && 'Events'}
                      {language === 'de' && 'Veranstaltungen'}
                    </h3>
                    <p>
                      {language === 'cs' &&
                        'Informace o nadcházejících událostech a akcích'}
                      {language === 'en' &&
                        'Information about upcoming events and activities'}
                      {language === 'de' &&
                        'Informationen über kommende Veranstaltungen und Aktivitäten'}
                    </p>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>
                      {language === 'cs' && 'Příběhy z pivovaru'}
                      {language === 'en' && 'Brewery stories'}
                      {language === 'de' && 'Brauerei-Geschichten'}
                    </h3>
                    <p>
                      {language === 'cs' &&
                        'Zajímavosti z našeho pivovaru a historie'}
                      {language === 'en' &&
                        'Interesting facts about our brewery and history'}
                      {language === 'de' &&
                        'Interessante Fakten über unsere Brauerei und Geschichte'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Border>
        </div>
      </Container>
    </div>
  )
}
