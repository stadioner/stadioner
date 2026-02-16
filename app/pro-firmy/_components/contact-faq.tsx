'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { b2bContent, getB2BLanguage } from './content'
import { B2BInquiryForm } from './b2b-inquiry-form'
import { FaqAccordion } from './faq-accordion'

export const B2BContactFaq = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]

  return (
    <section id='b2b-contact' className='bg-brand-secondary py-20 scroll-mt-40'>
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-action text-3xl md:text-4xl lg:text-5xl font-bold'>
            {copy.contactFaq.title}
          </h2>
          <p className='mt-4 text-brand-action/90 text-lg'>
            {copy.contactFaq.description}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 xl:grid-cols-2 gap-7 items-start'>
          <Border background>
            <div className='bg-brand-action p-6 md:p-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-brand-primary mb-6'>
                {copy.contactFaq.formTitle}
              </h3>
              <B2BInquiryForm />
            </div>
          </Border>

          <Border backgroundLight>
            <div className='bg-brand-primary p-6 md:p-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-brand-action mb-6'>
                {copy.contactFaq.faqTitle}
              </h3>
              <FaqAccordion items={copy.faq} />
            </div>
          </Border>
        </div>
      </Container>
    </section>
  )
}
