'use client'

import type { TakeoverFaqItem } from './content'

export const TakeoverFaqAccordion = ({
  items
}: {
  items: TakeoverFaqItem[]
}) => {
  return (
    <div className='space-y-3'>
      {items.map((item, index) => {
        const panelId = `takeover-faq-panel-${index}`
        const buttonId = `takeover-faq-button-${index}`

        return (
          <details
            key={`${item.question}-${index}`}
            className='group border-brand-action/30 bg-brand-primary/55 open:bg-brand-primary border'
            name='takeover-faq'
          >
            <summary
              id={buttonId}
              className='text-brand-action flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 font-semibold md:px-5 md:py-4'
              aria-controls={panelId}
            >
              <span className='text-lg leading-tight'>{item.question}</span>
              <span
                className='text-brand-action transition-transform duration-300 group-open:rotate-45'
                aria-hidden
              >
                +
              </span>
            </summary>
            <div
              id={panelId}
              role='region'
              aria-labelledby={buttonId}
              className='text-brand-action/85 px-4 pb-4 text-base md:px-5 md:pb-5'
            >
              {item.answer}
            </div>
          </details>
        )
      })}
    </div>
  )
}
