import {
  type SupportedLanguage,
  isSupportedLanguage,
} from '@/lib/i18n/site-languages'

export type NewsletterLanguage = SupportedLanguage

export const resolveNewsletterLanguage = (
  language: string,
): NewsletterLanguage => {
  return isSupportedLanguage(language) ? language : 'cs'
}

export const newsletterCopy: Record<
  NewsletterLanguage,
  {
    heading: string
    description: string
    info: string
    placeholder: string
    submit: string
    submitting: string
    success: string
    gdprPrefix: string
    gdprLink: string
  }
> = {
  cs: {
    heading: 'Přihlaste se k odběru našeho newsletteru',
    description: 'Získejte jako první informace o našich produktech, akcích apod.',
    info: 'Přihlaste se k odběru našeho newsletteru a získejte jako první informace o našich produktech, akcích apod.',
    placeholder: 'Váš email',
    submit: 'Přihlásit se',
    submitting: 'Odesílám...',
    success: 'Zkontrolujte svůj email a potvrďte přihlášení k odběru!',
    gdprPrefix: 'Odesláním souhlasíte s',
    gdprLink: 'ochranou osobních údajů',
  },
  en: {
    heading: 'Subscribe to our newsletter',
    description:
      'Be the first to receive information about our products, events, etc.',
    info: 'Sign up for our newsletter and be the first to receive information about our products, events, etc.',
    placeholder: 'Your email',
    submit: 'Subscribe',
    submitting: 'Sending...',
    success: 'Please check your email and confirm your subscription!',
    gdprPrefix: 'By submitting you agree to our',
    gdprLink: 'personal data protection',
  },
  de: {
    heading: 'Abonnieren Sie unseren Newsletter',
    description:
      'Erhalten Sie als Erster Informationen über unsere Produkte, Aktionen usw.',
    info: 'Abonnieren Sie unseren Newsletter und erhalten Sie als Erste Informationen über unsere Produkte, Aktionen usw.',
    placeholder: 'Ihre E-Mail',
    submit: 'Abonnieren',
    submitting: 'Sende...',
    success:
      'Bitte überprüfen Sie Ihre E-Mail und bestätigen Sie Ihr Abonnement!',
    gdprPrefix: 'Mit der Übermittlung stimmen Sie unserem',
    gdprLink: 'Datenschutz',
  },
}

