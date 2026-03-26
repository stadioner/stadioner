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

      const templateParams = {
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        vat_number: formData.vatNumber || null,
        message: formData.message,
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
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        vatNumber: '',
        message: ''
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      showToast(copy.error, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id='b2b-form'
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label
            htmlFor='companyName'
            className='text-brand-primary mb-2 block text-sm font-medium'
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
          htmlFor='address'
          className='text-brand-primary mb-2 block text-sm font-medium'
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
          className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
        />
      </div>

      <div>
        <label
          htmlFor='vatNumber'
          className='text-brand-primary mb-2 block text-sm font-medium'
        >
          {copy.vatNumber}
        </label>
        <input
          type='text'
          id='vatNumber'
          name='vatNumber'
          value={formData.vatNumber}
          onChange={handleChange}
          className='bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none'
        />
      </div>

      <div>
        <label
          htmlFor='message'
          className='text-brand-primary mb-2 block text-sm font-medium'
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
