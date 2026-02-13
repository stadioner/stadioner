'use client'

import { type FormEvent, useState } from 'react'
import { useToast } from '@/components/custom-toast'
import { newsletterCopy, resolveNewsletterLanguage } from '@/lib/newsletter/copy'
import {
  markNewsletterSubscribed,
  submitNewsletterSafely,
} from '@/lib/newsletter/submit'

type UseNewsletterFormOptions = {
  language: string
  onSubmitted?: () => void
  markSubscribed?: boolean
}

export const useNewsletterForm = ({
  language,
  onSubmitted,
  markSubscribed = true,
}: UseNewsletterFormOptions) => {
  const { showToast } = useToast()
  const lang = resolveNewsletterLanguage(language)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await submitNewsletterSafely(email)
      showToast(newsletterCopy[lang].success, 'success')
      setEmail('')

      if (markSubscribed) {
        markNewsletterSubscribed()
      }

      onSubmitted?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    setEmail,
    isSubmitting,
    submit,
    copy: newsletterCopy[lang],
    language: lang,
  }
}
