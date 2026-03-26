'use client'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'
import { Border } from '@/components/border'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'

export default function NewsletterPage() {
  const { language } = useLanguage()
  const localizedRootPath = `/${language}`
  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language
  })

  return (
    <div className='bg-brand-secondary min-h-screen pt-32'>
      <Container>
        <div className='mx-auto max-w-3xl'>
          <Border background>
            <div className='bg-brand-action p-8 lg:p-12'>
              {/* Header */}
              <div className='mb-8 text-center'>
                <h1 className='text-brand-primary mb-4 text-3xl font-bold lg:text-4xl'>
                  {copy.heading}
                </h1>
              </div>

              {/* Form */}
              <form
                onSubmit={submit}
                className='space-y-6'
              >
                <div>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.placeholder}
                    required
                    className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action focus:ring-brand-action/50 w-full border px-4 py-3 text-lg focus:ring-2 focus:outline-none'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  variant='secondary'
                  size='lg'
                  className='w-full py-3 text-lg'
                >
                  {isSubmitting ? copy.submitting : copy.submit}
                </Button>

                <p className='text-brand-primary/60 text-center text-sm'>
                  {copy.gdprPrefix}{' '}
                  <Link
                    href={`${localizedRootPath}/gdpr`}
                    className='hover:text-brand-primary underline'
                  >
                    {copy.gdprLink}
                  </Link>
                  {language === 'de' && ' zu'}
                </p>
              </form>

              {/* Additional Info */}
              <div className='border-brand-primary/20 mt-12 border-t pt-8'>
                <h2 className='text-brand-primary mb-4 text-center text-xl font-semibold'>
                  {language === 'cs' && 'Co můžete očekávat?'}
                  {language === 'en' && 'What can you expect?'}
                  {language === 'de' && 'Was können Sie erwarten?'}
                </h2>
                <div className='text-brand-primary/80 grid grid-cols-1 gap-6 text-sm md:grid-cols-2'>
                  <div>
                    <h3 className='mb-1 font-semibold'>
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
                    <h3 className='mb-1 font-semibold'>
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
                    <h3 className='mb-1 font-semibold'>
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
                    <h3 className='mb-1 font-semibold'>
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
