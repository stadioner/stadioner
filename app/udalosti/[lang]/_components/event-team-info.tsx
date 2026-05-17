import { Calendar, MapPin, UserCheck, Users } from 'lucide-react'
import { type EventTeamInfo } from '@/lib/events/team-info'
import { type SupportedLanguage } from '@/types/blog'

interface EventTeamInfoSectionProps {
  info: EventTeamInfo
  language: SupportedLanguage
}

const capacityLabel: Record<SupportedLanguage, string> = {
  cs: 'Přihlášené týmy',
  en: 'Registered teams',
  de: 'Angemeldete Teams'
}

const teamBadgeLabel: Record<SupportedLanguage, string> = {
  cs: 'Tým',
  en: 'Team',
  de: 'Team'
}

export function EventTeamInfoSection({
  info,
  language
}: EventTeamInfoSectionProps) {
  return (
    <aside
      className='border-brand-action bg-brand-shop/10 mb-8 border-2 p-5 md:p-6'
      aria-labelledby='event-team-info-heading'
    >
      <div className='flex items-start gap-3'>
        <div className='bg-brand-action text-brand-primary mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center'>
          <Users
            className='h-5 w-5'
            aria-hidden='true'
          />
        </div>
        <div>
          <p className='text-brand-shop text-xs font-bold tracking-[0.2em] uppercase'>
            {teamBadgeLabel[language]}
          </p>
          <h2
            id='event-team-info-heading'
            className='text-brand-action font-mohave text-2xl font-bold tracking-wide uppercase md:text-3xl'
          >
            {info.title}
          </h2>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-end gap-4'>
        <div className='bg-brand-action text-brand-primary min-w-[8.5rem] px-4 py-3'>
          <p className='text-brand-primary/80 text-xs font-semibold tracking-wide uppercase'>
            {capacityLabel[language]}
          </p>
          <p className='font-mohave mt-1 text-3xl leading-none font-bold'>
            {info.registeredTeams}
            <span className='text-brand-primary/70 text-xl font-semibold'>
              {' '}
              / {info.teamCapacity}
            </span>
          </p>
        </div>
      </div>

      <div className='mt-5 space-y-3'>
        {info.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className='text-brand-action text-[1.0625rem] leading-[1.75] md:text-[1.125rem]'
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className='border-brand-action/25 mt-6 border-t pt-6'>
        <h3 className='text-brand-action font-mohave text-xl font-bold tracking-wide uppercase md:text-2xl'>
          {info.meeting.heading}
        </h3>
        <ul className='text-brand-action mt-4 space-y-3 text-[1.0625rem] leading-[1.75] md:text-[1.125rem]'>
          <li className='flex gap-3'>
            <Calendar
              className='text-brand-shop mt-1 h-5 w-5 shrink-0'
              aria-hidden='true'
            />
            <span>{info.meeting.date}</span>
          </li>
          <li className='flex gap-3'>
            <MapPin
              className='text-brand-shop mt-1 h-5 w-5 shrink-0'
              aria-hidden='true'
            />
            <span>{info.meeting.location}</span>
          </li>
          <li className='flex gap-3'>
            <Users
              className='text-brand-shop mt-1 h-5 w-5 shrink-0'
              aria-hidden='true'
            />
            <span>{info.meeting.purpose}</span>
          </li>
          <li className='flex gap-3'>
            <UserCheck
              className='text-brand-shop mt-1 h-5 w-5 shrink-0'
              aria-hidden='true'
            />
            <span>{info.meeting.attendance}</span>
          </li>
        </ul>

        <div className='bg-brand-action text-brand-primary mt-5 px-4 py-4 md:px-5'>
          <p className='text-brand-primary/80 text-xs font-bold tracking-wide uppercase'>
            {info.meeting.bringLabel}
          </p>
          <p className='font-mohave mt-1 text-xl font-bold uppercase md:text-2xl'>
            {info.meeting.bringItem}
          </p>
        </div>
      </div>

      <p className='text-brand-action border-brand-action/25 mt-6 border-t pt-6 text-[1.0625rem] leading-[1.75] font-medium md:text-[1.125rem]'>
        {info.charityPurpose}
      </p>
    </aside>
  )
}
