export const MAILCHIMP_SUBSCRIBE_URL =
  'https://stadioner.us20.list-manage.com/subscribe/post?u=0fe24a4d8159780e91fdf8f8d&id=fc6d3b1ef6&f_id=007877eef0'

export const NEWSLETTER_STORAGE_KEYS = {
  subscribed: 'newsletter-subscribed',
  popupDismissed: 'newsletter-popup-dismissed',
  popupCloseCount: 'newsletter-popup-close-count',
} as const

const buildNewsletterFormData = (email: string) => {
  const formData = new FormData()
  formData.append('EMAIL', email)
  formData.append('b_0fe24a4d8159780e91fdf8f8d_fc6d3b1ef6', '')
  formData.append('f_id', '007877eef0')
  return formData
}

export const submitNewsletter = async (email: string): Promise<void> => {
  await fetch(MAILCHIMP_SUBSCRIBE_URL, {
    method: 'POST',
    body: buildNewsletterFormData(email),
    mode: 'no-cors',
  })
}

export const submitNewsletterSafely = async (email: string): Promise<void> => {
  try {
    await submitNewsletter(email)
  } catch {
    // Mailchimp no-cors flow does not provide reliable response semantics.
    // We intentionally treat network/cors issues as accepted and keep UX consistent.
  }
}

export const markNewsletterSubscribed = (): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.subscribed, 'true')
}

export const getNewsletterPopupCloseCount = (): number => {
  if (typeof window === 'undefined') return 0
  const count = localStorage.getItem(NEWSLETTER_STORAGE_KEYS.popupCloseCount)
  const parsedCount = count ? parseInt(count, 10) : 0
  return Number.isNaN(parsedCount) ? 0 : parsedCount
}

export const increaseNewsletterPopupCloseCount = (): number => {
  if (typeof window === 'undefined') return 0

  const nextCount = getNewsletterPopupCloseCount() + 1
  localStorage.setItem(
    NEWSLETTER_STORAGE_KEYS.popupCloseCount,
    String(nextCount),
  )

  if (nextCount >= 3) {
    localStorage.setItem(NEWSLETTER_STORAGE_KEYS.popupDismissed, 'true')
  }

  return nextCount
}

