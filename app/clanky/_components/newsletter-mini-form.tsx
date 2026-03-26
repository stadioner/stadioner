'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'
import { useNewsletterForm } from '@/hooks/use-newsletter-form'

export const NewsletterMiniForm = () => {
  const { language } = useLanguage()
  const { email, setEmail, isSubmitting, submit, copy } = useNewsletterForm({
    language
  })

  return (
    <form
      onSubmit={submit}
      className='space-y-2'
    >
      <p className='text-brand-action/80 text-sm'>{copy.info}</p>
      <div>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          required
          className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action focus:ring-brand-action/50 w-full border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
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
      <p className='text-brand-action/70 text-[11px]'>
        {copy.gdprPrefix}{' '}
        <Link
          href={`/${language}/gdpr`}
          className='hover:text-brand-action underline'
        >
          {copy.gdprLink}
        </Link>
        {language === 'de' && ' zu'}
      </p>
    </form>
  )
}
