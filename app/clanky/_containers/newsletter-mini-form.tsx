'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/types/blog'
import Link from 'next/link'

export const NewsletterMiniForm = () => {
  const { language } = useLanguage()
  const lang = language as SupportedLanguage
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const placeholders: Record<SupportedLanguage, string> = {
    cs: 'Váš email',
    en: 'Your email',
    de: 'Ihre E-Mail',
  } as const

  const labels: Record<SupportedLanguage, { submit: string; success: string }> =
    {
      cs: {
        submit: 'Přihlásit se',
        success: 'Děkujeme za přihlášení k odběru!',
      },
      en: { submit: 'Subscribe', success: 'Thank you for subscribing!' },
      de: { submit: 'Abonnieren', success: 'Vielen Dank für Ihr Abonnement!' },
    } as const

  const copy: Record<
    SupportedLanguage,
    { info: string; gdprPrefix: string; gdprLink: string }
  > = {
    cs: {
      info: 'Přihlaste se k odběru našeho newsletteru a získejte jako první informace o našich produktech, akcích apod.',
      gdprPrefix: 'Odesláním souhlasíte s',
      gdprLink: 'ochranou osobních údajů',
    },
    en: {
      info: 'Subscribe to our newsletter and be the first to receive information about our products, events, etc.',
      gdprPrefix: 'By submitting you agree to our',
      gdprLink: 'personal data protection',
    },
    de: {
      info: 'Abonnieren Sie unseren Newsletter und erhalten Sie als Erster Informationen über unsere Produkte, Aktionen usw.',
      gdprPrefix: 'Mit der Übermittlung stimmen Sie unserem',
      gdprLink: 'Datenschutz',
    },
  } as const

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('EMAIL', email)
      formData.append('b_0fe24a4d8159780e91fdf8f8d_fc6d3b1ef6', '')
      formData.append('f_id', '007877eef0')

      await fetch(
        'https://stadioner.us20.list-manage.com/subscribe/post?u=0fe24a4d8159780e91fdf8f8d&id=fc6d3b1ef6&f_id=007877eef0',
        { method: 'POST', body: formData, mode: 'no-cors' }
      )

      setMessage(labels[lang].success)
      setEmail('')
      if (typeof window !== 'undefined') {
        localStorage.setItem('newsletter-subscribed', 'true')
      }
    } catch (err) {
      setMessage(labels[lang].success)
      setEmail('')
      if (typeof window !== 'undefined') {
        localStorage.setItem('newsletter-subscribed', 'true')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <p className='text-sm text-brand-action/80'>{copy[lang].info}</p>
      <div>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholders[lang]}
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
        {isSubmitting ? '…' : labels[lang].submit}
      </Button>
      {message && (
        <div className={cn('text-xs', 'text-brand-action')}>{message}</div>
      )}
      <p className='text-[11px] text-brand-action/70'>
        {copy[lang].gdprPrefix}{' '}
        <Link href='/gdpr' className='underline hover:text-brand-action'>
          {copy[lang].gdprLink}
        </Link>
      </p>
    </form>
  )
}
