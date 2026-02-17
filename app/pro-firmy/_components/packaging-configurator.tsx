'use client'

import { Products } from '@/components/products'
import { useLanguage } from '@/store/use-language'
import { b2bContent, getB2BLanguage } from './content'

export const B2BPackagingConfigurator = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]

  return (
    <section className='bg-brand-action py-8'>
      <Products
        hScreen
        b2bMode
        b2bNote={copy.packaging.priceListNote}
        b2bCtaLabel={copy.packaging.requestPriceList}
        b2bCtaHref='#b2b-contact'
      />
    </section>
  )
}
