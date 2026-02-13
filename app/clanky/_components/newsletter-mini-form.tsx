'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'

export const NewsletterMiniForm = () => {
  const { language } = useLanguage()
  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language,
  })

  return (
    <form onSubmit={submit} className='space-y-2'>
      <p className='text-sm text-brand-action/80'>{copy.info}</p>
      <div>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          required
          className='px-3 py-2 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-sm'
        />
      </div>
      <Button
        type='submit'
        disabled={isSubmitting}
        variant='secondary'
        size='sm'
        className='w-full'
      >
        {isSubmitting ? '…' : copy.submit}
      </Button>
      <p className='text-[11px] text-brand-action/70'>
        {copy.gdprPrefix}{' '}
        <Link href='/gdpr' className='underline hover:text-brand-action'>
          {copy.gdprLink}
        </Link>
        {language === 'de' && ' zu'}
      </p>
    </form>
  )
}
