const PHONE_DISPLAY = '+420 606 074 929'
const PHONE_HREF = 'tel:+420606074929'

interface AvailabilityNoticeProps {
  text: string
}

export const AvailabilityNotice = ({ text }: AvailabilityNoticeProps) => {
  return (
    <p className='mx-auto mt-3 max-w-2xl px-2 text-center text-xs leading-snug text-zinc-300 sm:mt-4'>
      {text}{' '}
      <a
        href={PHONE_HREF}
        className='text-brand-primary font-medium underline decoration-brand-primary/50 underline-offset-2 transition hover:decoration-brand-primary'
      >
        {PHONE_DISPLAY}
      </a>
      .
    </p>
  )
}
