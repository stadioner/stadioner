'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { useToast } from '@/components/custom-toast'
import { useTakeoverCalculator } from './calculator-context'
import { getTakeoverLanguage, takeoverContent } from './content'

interface FormData {
  venueName: string
  contactName: string
  email: string
  phone: string
  message: string
}

const numberLocaleMap = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE'
} as const

export const TakeoverInquiryForm = () => {
  const { language } = useLanguage()
  const lang = getTakeoverLanguage(language)
  const { showToast } = useToast()
  const copy = takeoverContent[lang].form
  const { getSnapshot, glassesExtra, equipmentExtra } = useTakeoverCalculator()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      const extras = [
        glassesExtra ? 'sklenice 0,3 l' : null,
        equipmentExtra ? 'výčepní zařízení' : null
      ]
        .filter(Boolean)
        .join(', ')

      const snapshot = getSnapshot(numberLocaleMap[lang])
      const userMessage = formData.message.trim()
      const messageParts = [
        userMessage,
        extras ? `Zdarma požadováno: ${extras}` : null,
        snapshot
      ].filter(Boolean)

      const templateParams = {
        company_name: formData.venueName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        message: messageParts.join('\n\n'),
        language:
          language === 'cs' ? 'Čeština'
          : language === 'en' ? 'Angličtina'
          : 'Němčina',
        date: new Date().toLocaleString('cs-CZ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey
      })

      showToast(copy.success, 'success')
      setFormData({
        venueName: '',
        contactName: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      console.error('EmailJS takeover error:', error)
      showToast(copy.error, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id='takeover-form'
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='venueName'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.venueName} *
          </label>
          <input
            type='text'
            id='venueName'
            name='venueName'
            value={formData.venueName}
            onChange={handleChange}
            required
            className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='contactName'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.contactName} *
          </label>
          <input
            type='text'
            id='contactName'
            name='contactName'
            value={formData.contactName}
            onChange={handleChange}
            required
            className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='email'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.email} *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='phone'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.phone} *
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
          />
        </div>
      </div>

      <div>
        <label
          htmlFor='message'
          className='text-brand-primary mb-2 block text-sm font-medium'
        >
          {copy.message}
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full resize-none border px-4 py-3 text-base focus:ring-2 focus:outline-none'
        />
      </div>

      <div className='space-y-2 pt-2'>
        <Button
          type='submit'
          disabled={isSubmitting}
          variant='shop'
          size='lg'
          className='w-full min-w-[210px] md:w-auto md:min-w-[240px]'
        >
          {isSubmitting ? copy.submitting : copy.submit}
        </Button>
        <p className='text-brand-primary/80 text-xs'>
          {copy.gdprPrefix}{' '}
          <Link
            href={`/${language}/gdpr`}
            className='hover:text-brand-primary underline'
          >
            {copy.gdprLink}
          </Link>
        </p>
      </div>
    </form>
  )
}
