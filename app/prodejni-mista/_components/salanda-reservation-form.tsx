'use client'

import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/custom-toast'
import {
  getSalandaSectionContent,
  type SalandaReservationFormCopy
} from '@/lib/i18n/salanda-section'
import {
  isSupportedLanguage,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'
import { useLanguage } from '@/store/use-language'

const FIELD_CLASS =
  'bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 h-12 w-full min-w-0 max-w-full border px-4 text-base leading-normal focus:ring-2 focus:outline-none'

const TEXTAREA_CLASS =
  'bg-brand-primary text-brand-action placeholder:text-brand-action/60 border-brand-action/65 focus:ring-brand-action/50 w-full border px-4 py-3 text-base focus:ring-2 focus:outline-none resize-none'

const ARRIVAL_TIMES = [
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00'
] as const

const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

interface FormData {
  fullName: string
  phone: string
  email: string
  reservationDate: string
  arrivalTime: string
  guests: string
  occasion: string
  note: string
}

const emptyForm: FormData = {
  fullName: '',
  phone: '',
  email: '',
  reservationDate: '',
  arrivalTime: '18:00',
  guests: '2',
  occasion: 'regular',
  note: ''
}

const languageLabel = (language: SupportedLanguage): string => {
  if (language === 'cs') return 'Čeština'
  if (language === 'en') return 'Angličtina'
  return 'Němčina'
}

const todayIsoDate = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const occasionLabel = (
  copy: SalandaReservationFormCopy,
  value: string
): string => {
  const match = copy.occasionOptions.find((option) => option.value === value)
  return match?.label ?? value
}

const guestsDisplay = (
  copy: SalandaReservationFormCopy,
  guests: string
): string => {
  if (guests === '13+') return copy.guestsLabel13Plus
  const count = Number(guests)
  if (Number.isFinite(count) && count >= 1) return copy.guestsLabel(count)
  return guests
}

export const SalandaReservationForm = () => {
  const language = useLanguage((state) => state.language)
  const currentLanguage: SupportedLanguage = isSupportedLanguage(language)
    ? language
    : 'cs'
  const copy = getSalandaSectionContent(currentLanguage).reservation
  const { showToast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>(emptyForm)

  const minDate = useMemo(() => todayIsoDate(), [])

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_SALANDA_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      const templateParams = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        reservation_date: formData.reservationDate,
        reservation_time: formData.arrivalTime,
        guests: guestsDisplay(copy, formData.guests),
        occasion: occasionLabel(copy, formData.occasion),
        note: formData.note || '',
        language: languageLabel(currentLanguage),
        submitted_at: new Date().toLocaleString('cs-CZ', {
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
      setFormData(emptyForm)
    } catch (error) {
      console.error('EmailJS error:', error)
      showToast(copy.error, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className='text-brand-primary text-2xl font-bold md:text-3xl'>
        {copy.title}
      </h3>
      <p className='text-brand-primary/90 mt-2'>{copy.subtitle}</p>
      <p className='text-brand-primary/90 mt-3 text-sm'>
        {copy.phoneHint}{' '}
        <Link
          href={copy.phoneHref}
          className='hover:text-brand-primary inline-flex items-center gap-1.5 font-semibold underline underline-offset-2'
        >
          <Phone className='size-3.5 shrink-0' aria-hidden />
          {copy.phoneDisplay}
        </Link>
      </p>

      <form
        id='salanda-reservation-form'
        onSubmit={handleSubmit}
        className='mt-6 space-y-6'
      >
        <div>
          <label
            htmlFor='fullName'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.fullName} *
          </label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder={copy.fullNamePlaceholder}
            required
            autoComplete='name'
            className={FIELD_CLASS}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
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
              placeholder={copy.phonePlaceholder}
              required
              autoComplete='tel'
              className={FIELD_CLASS}
            />
          </div>

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
              placeholder={copy.emailPlaceholder}
              required
              autoComplete='email'
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='min-w-0'>
            <label
              htmlFor='reservationDate'
              className='text-brand-primary mb-2 block text-sm font-medium'
            >
              {copy.reservationDate} *
            </label>
            {/* iOS Safari gives date inputs an intrinsic min width and paints
                them outside the card. The shell keeps the border; the inner
                box clips that overflow. */}
            <div className='border-brand-action/65 bg-brand-primary focus-within:ring-brand-action/50 h-12 w-full min-w-0 max-w-full border focus-within:ring-2'>
              <div className='grid h-full min-w-0 grid-cols-[minmax(0,1fr)] overflow-clip'>
                <input
                  type='date'
                  id='reservationDate'
                  name='reservationDate'
                  value={formData.reservationDate}
                  onChange={handleChange}
                  min={minDate}
                  required
                  className='salanda-date-input text-brand-action col-start-1 row-start-1 block h-full w-full min-w-0 max-w-full border-0 bg-transparent px-4 text-base leading-[3rem] outline-none'
                />
              </div>
            </div>
          </div>

          <div className='min-w-0'>
            <label
              htmlFor='arrivalTime'
              className='text-brand-primary mb-2 block text-sm font-medium'
            >
              {copy.arrivalTime} *
            </label>
            <select
              id='arrivalTime'
              name='arrivalTime'
              value={formData.arrivalTime}
              onChange={handleChange}
              required
              className={FIELD_CLASS}
            >
              {ARRIVAL_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor='guests'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.guests} *
          </label>
          <select
            id='guests'
            name='guests'
            value={formData.guests}
            onChange={handleChange}
            required
            className={FIELD_CLASS}
          >
            {GUEST_COUNTS.map((count) => (
              <option key={count} value={String(count)}>
                {copy.guestsLabel(count)}
              </option>
            ))}
            <option value='13+'>{copy.guestsLabel13Plus}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='occasion'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.occasion}
          </label>
          <select
            id='occasion'
            name='occasion'
            value={formData.occasion}
            onChange={handleChange}
            className={FIELD_CLASS}
          >
            {copy.occasionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='note'
            className='text-brand-primary mb-2 block text-sm font-medium'
          >
            {copy.note}
          </label>
          <textarea
            id='note'
            name='note'
            value={formData.note}
            onChange={handleChange}
            placeholder={copy.notePlaceholder}
            rows={4}
            className={TEXTAREA_CLASS}
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
          <p className='text-brand-primary/80 text-xs'>{copy.requiredLegend}</p>
          <p className='text-brand-primary/80 text-xs'>
            {copy.gdprPrefix}{' '}
            <Link
              href={`/${currentLanguage}/gdpr`}
              className='hover:text-brand-primary underline'
            >
              {copy.gdprLink}
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
