'use client'

import { B2BFaqItem } from './content'

export const FaqAccordion = ({ items }: { items: B2BFaqItem[] }) => {
  return (
    <div className='space-y-3'>
      {items.map((item, index) => (
        <FaqRow
          key={`${item.question}-${index}`}
          item={item}
          index={index}
        />
      ))}
    </div>
  )
}

const FaqRow = ({ item, index }: { item: B2BFaqItem; index: number }) => {
  const panelId = `b2b-faq-panel-${index}`
  const buttonId = `b2b-faq-button-${index}`

  return (
    <details
      className='group border-brand-action/30 bg-brand-primary/55 open:bg-brand-primary border'
      name='b2b-faq'
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
}
