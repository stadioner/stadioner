'use client'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'

export default function SalesLocationsError({
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { language } = useLanguage()

  return (
    <main className='bg-brand-primary pt-32 pb-20 md:pt-40'>
      <Container className='max-w-[60ch]'>
        <h1 className='text-brand-action text-3xl font-bold md:text-4xl'>
          {language === 'en' && 'This page could not be loaded'}
          {language === 'de' && 'Diese Seite konnte nicht geladen werden'}
          {language !== 'en' && language !== 'de' && 'Stránku se nepodařilo načíst'}
        </h1>
        <p className='text-brand-action/80 mt-4'>
          {language === 'en' &&
            'Please try again. If the problem continues, come back later.'}
          {language === 'de' &&
            'Bitte versuchen Sie es erneut. Wenn das Problem weiterhin besteht, kommen Sie später wieder.'}
          {language !== 'en' &&
            language !== 'de' &&
            'Zkuste to znovu. Pokud problém přetrvává, vraťte se později.'}
        </p>
        <Button
          type='button'
          variant='green'
          className='mt-6'
          onClick={reset}
        >
          {language === 'en' && 'Try again'}
          {language === 'de' && 'Erneut versuchen'}
          {language !== 'en' && language !== 'de' && 'Zkusit znovu'}
        </Button>
      </Container>
    </main>
  )
}
