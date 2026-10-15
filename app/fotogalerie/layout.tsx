import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { createLocalizedAlternates } from '@/lib/seo/alternates'
import {
  localizedSeoLocales,
  toLocalePath,
  type LocalizedSeoLocale
} from '@/lib/seo/site'

const pathsByLocale = localizedSeoLocales.reduce<
  Partial<Record<LocalizedSeoLocale, string>>
>((acc, locale) => {
  acc[locale] = toLocalePath(locale, '/fotogalerie')
  return acc
}, {})

const alternates = createLocalizedAlternates({
  canonicalPath: toLocalePath('cs', '/fotogalerie'),
  pathsByLocale
})

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotogalerie',
  description:
    'Fotogalerie z akcí pivovaru STADIONER. Prohlédněte si fotografie z proběhlých událostí.',
  canonicalPath: alternates.canonical,
  alternates,
  keywords: [
    'fotogalerie',
    'fotky',
    'akce',
    'události',
    'STADIONER',
    'pivovar'
  ],
  twitterCard: 'summary_large_image'
})

export default function FotogalerieLayout({ children }: PropsWithChildren) {
  return children
}
