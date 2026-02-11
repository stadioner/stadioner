'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { Border } from '@/components/border'
import { useLanguage } from '@/store/use-language'
import { useToast } from '@/components/custom-toast'

interface FormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  vatNumber: string
  message: string
}

export default function ProFirmyPage() {
  const { language } = useLanguage()
  const { showToast } = useToast()
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

  const translations = {
    cs: {
      title: 'Pro Firmy',
      subtitle: 'Zajímá vás spolupráce? Kontaktujte nás!',
      companyName: 'Název firmy',
      contactName: 'Jméno kontaktní osoby',
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresa společnosti',
      vatNumber: 'IČO (volitelné)',
      message: 'Vaše zpráva',
      submit: 'Odeslat poptávku',
      submitting: 'Odesílám...',
      success:
        'Děkujeme! Vaše poptávka byla úspěšně odeslána. Brzy vás budeme kontaktovat.',
      error: 'Omlouváme se, došlo k chybě. Zkuste to prosím znovu.',
      required: 'Toto pole je povinné',
      gdprPrefix: 'Odesláním souhlasíte s',
      gdprLink: 'ochranou osobních údajů',
    },
    en: {
      title: 'For Companies',
      subtitle: 'Interested in cooperation? Contact us!',
      companyName: 'Company name',
      contactName: 'Contact person name',
      email: 'Email',
      phone: 'Phone',
      address: 'Company address',
      vatNumber: 'VAT number (optional)',
      message: 'Your message',
      submit: 'Send inquiry',
      submitting: 'Sending...',
      success:
        'Thank you! Your inquiry has been sent successfully. We will contact you soon.',
      error: 'Sorry, an error occurred. Please try again.',
      required: 'This field is required',
      gdprPrefix: 'By submitting you agree to our',
      gdprLink: 'personal data protection',
    },
    de: {
      title: 'Für Unternehmen',
      subtitle: 'Interessiert an Zusammenarbeit? Kontaktieren Sie uns!',
      companyName: 'Firmenname',
      contactName: 'Name der Kontaktperson',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Firmenadresse',
      vatNumber: 'Umsatzsteuer-ID (optional)',
      message: 'Ihre Nachricht',
      submit: 'Anfrage senden',
      submitting: 'Sende...',
      success:
        'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir werden Sie bald kontaktieren.',
      error:
        'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      required: 'Dieses Feld ist erforderlich',
      gdprPrefix: 'Mit der Übermittlung stimmen Sie unserem',
      gdprLink: 'Datenschutz',
    },
  }

  const t =
    translations[language as keyof typeof translations] || translations.cs

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        vat_number: formData.vatNumber || null, // null pro podmíněné zobrazení v template
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

      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      })

      showToast(t.success, 'success')

      // Reset form
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
      showToast(t.error, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-brand-secondary pt-32 pb-16'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          <Border background>
            <div className='bg-brand-action p-8 lg:p-12'>
              {/* Header */}
              <div className='text-center mb-8'>
                <h1 className='text-brand-primary text-3xl lg:text-4xl font-bold mb-4'>
                  {t.title}
                </h1>
                <p className='text-brand-primary/90 text-lg'>{t.subtitle}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor='companyName'
                      className='block text-brand-primary text-sm font-medium mb-2'
                    >
                      {t.companyName} *
                    </label>
                    <input
                      type='text'
                      id='companyName'
                      name='companyName'
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor='contactName'
                      className='block text-brand-primary text-sm font-medium mb-2'
                    >
                      {t.contactName} *
                    </label>
                    <input
                      type='text'
                      id='contactName'
                      name='contactName'
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-brand-primary text-sm font-medium mb-2'
                    >
                      {t.email} *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-brand-primary text-sm font-medium mb-2'
                    >
                      {t.phone} *
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor='address'
                    className='block text-brand-primary text-sm font-medium mb-2'
                  >
                    {t.address} *
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                  />
                </div>

                {/* VAT Number */}
                <div>
                  <label
                    htmlFor='vatNumber'
                    className='block text-brand-primary text-sm font-medium mb-2'
                  >
                    {t.vatNumber}
                  </label>
                  <input
                    type='text'
                    id='vatNumber'
                    name='vatNumber'
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base'
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='block text-brand-primary text-sm font-medium mb-2'
                  >
                    {t.message} *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='px-4 py-3 bg-brand-primary text-brand-action placeholder:text-brand-action/60 border border-brand-action focus:outline-none focus:ring-2 focus:ring-brand-action/50 w-full text-base resize-none'
                  />
                </div>

                {/* Submit Button */}
                <div className='pt-4 space-y-2'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    variant='default'
                    size='lg'
                    className='w-full md:w-auto min-w-[200px] bg-brand-primary text-brand-action hover:bg-brand-primary/90'
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </Button>
                  <p className='text-xs text-brand-primary/80'>
                    {t.gdprPrefix}{' '}
                    <Link
                      href='/gdpr'
                      className='underline hover:text-brand-primary'
                    >
                      {t.gdprLink}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Border>
        </div>
      </Container>
    </div>
  )
}
