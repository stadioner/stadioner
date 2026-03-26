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
    <section
      id='b2b-contact'
      className='bg-brand-secondary scroll-mt-16 py-20'
    >
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-5xl'>
            {copy.contactFaq.title}
          </h2>
          <p className='text-brand-action/90 mt-4 text-lg'>
            {copy.contactFaq.description}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 items-start gap-7 xl:grid-cols-2'>
          <div className='order-1 xl:sticky xl:top-36 xl:order-2'>
            <Border backgroundLight>
              <div className='bg-brand-primary p-6 md:p-8'>
                <h3 className='text-brand-action mb-6 text-2xl font-bold md:text-3xl'>
                  {copy.contactFaq.faqTitle}
                </h3>
                <FaqAccordion items={copy.faq} />
              </div>
            </Border>
          </div>

          <div className='order-2 xl:order-1'>
            <Border background>
              <div className='bg-brand-action p-6 md:p-8'>
                <h3 className='text-brand-primary mb-6 text-2xl font-bold md:text-3xl'>
                  {copy.contactFaq.formTitle}
                </h3>
                <B2BInquiryForm />
              </div>
            </Border>
          </div>
        </div>
      </Container>
    </section>
  )
}
