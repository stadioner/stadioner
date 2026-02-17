'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { useToast } from '@/components/custom-toast'
import { b2bContent, getB2BLanguage } from './content'

interface FormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  vatNumber: string
  message: string
}

export const B2BInquiryForm = () => {
  const { language } = useLanguage()
  const { showToast } = useToast()
  const copy = b2bContent[getB2BLanguage(language)].form

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    vatNumber: '',
    message: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
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

      const templateParams = {
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        vat_number: formData.vatNumber || null,
        message: formData.message,
        language:
          language === 'cs'
            ? 'Čeština'
            : language === 'en'
              ? 'Angličtina'
              : 'Němčina',
        date: new Date().toLocaleString('cs-CZ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      })

      showToast(copy.success, 'success')

      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        vatNumber: '',
        message: '',
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      showToast(copy.error, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id='b2b-form' onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='companyName'
            className='block text-brand-primary text-sm font-medium mb-2'
          >
            {copy.companyName} *
          </label>
          <input
            type='text'
            id='companyName'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            required
            className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
          />
        </div>

        <div>
          <label
            htmlFor='contactName'
            className='block text-brand-primary text-sm font-medium mb-2'
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
            className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='email'
            className='block text-brand-primary text-sm font-medium mb-2'
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
            className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
          />
        </div>

        <div>
          <label
            htmlFor='phone'
            className='block text-brand-primary text-sm font-medium mb-2'
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
            className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
          />
        </div>
      </div>

      <div>
        <label
          htmlFor='address'
          className='block text-brand-primary text-sm font-medium mb-2'
        >
          {copy.address} *
        </label>
        <input
          type='text'
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          required
          className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
        />
      </div>

      <div>
        <label
          htmlFor='vatNumber'
          className='block text-brand-primary text-sm font-medium mb-2'
        >
          {copy.vatNumber}
        </label>
        <input
          type='text'
          id='vatNumber'
          name='vatNumber'
          value={formData.vatNumber}
          onChange={handleChange}
          className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
        />
      </div>

      <div>
        <label
          htmlFor='message'
          className='block text-brand-primary text-sm font-medium mb-2'
        >
          {copy.message} *
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action/65 focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base resize-none'
        />
      </div>

      <div className='pt-2 space-y-2'>
        <Button
          type='submit'
          disabled={isSubmitting}
          variant='outline'
          size='lg'
          className='w-full md:w-auto min-w-[210px] bg-brand-primary text-brand-action border-brand-primary hover:bg-brand-primary/90 hover:text-brand-action'
        >
          {isSubmitting ? copy.submitting : copy.submit}
        </Button>
        <p className='text-xs text-brand-primary/80'>
          {copy.gdprPrefix}{' '}
          <Link href='/gdpr' className='underline hover:text-brand-primary'>
            {copy.gdprLink}
          </Link>
        </p>
      </div>
    </form>
  )
}
