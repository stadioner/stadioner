import type { SupportedLanguage } from '@/lib/i18n/site-languages'

type OpeningHourRow = {
  key: string
  label: string
  value: string
  closed: boolean
}

type SalandaSectionContent = {
  sectionTitle: string
  address: string
  intro: string
  openingHoursTitle: string
  openingHours: OpeningHourRow[]
  closedLabel: string
  programTitle: string
  programEmpty: string
}

const contentByLanguage: Record<SupportedLanguage, SalandaSectionContent> = {
  cs: {
    sectionTitle: 'Výčep na Šalandě',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    intro:
      'Výčep na Šalandě je místo v areálu pivovaru, kde na čepu točíme naše piva a pravidelně chystáme kulturní program.',
    openingHoursTitle: 'Otevírací doba',
    openingHours: [
      { key: 'mon', label: 'Pondělí', value: 'ZAVŘENO', closed: true },
      { key: 'tue', label: 'Úterý', value: 'ZAVŘENO', closed: true },
      { key: 'wed', label: 'Středa', value: '16:00 - 20:00', closed: false },
      { key: 'thu', label: 'Čtvrtek', value: '16:00 - 22:00', closed: false },
      { key: 'fri', label: 'Pátek', value: '10:00 - 22:00', closed: false },
      { key: 'sat', label: 'Sobota', value: '10:00 - 22:00', closed: false },
      { key: 'sun', label: 'Neděle', value: '14:00 - 18:00', closed: false }
    ],
    closedLabel: 'ZAVŘENO',
    programTitle: 'Program týdne',
    programEmpty: 'Program na tento týden právě připravujeme. Sledujte nás na sociálních sítích.'
  },
  en: {
    sectionTitle: 'Taproom at Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    intro:
      'The taproom at Šalanda is located in the brewery premises, where we serve our beers on tap and regularly host cultural events.',
    openingHoursTitle: 'Opening hours',
    openingHours: [
      { key: 'mon', label: 'Monday', value: 'CLOSED', closed: true },
      { key: 'tue', label: 'Tuesday', value: 'CLOSED', closed: true },
      { key: 'wed', label: 'Wednesday', value: '16:00 - 20:00', closed: false },
      { key: 'thu', label: 'Thursday', value: '16:00 - 22:00', closed: false },
      { key: 'fri', label: 'Friday', value: '10:00 - 22:00', closed: false },
      { key: 'sat', label: 'Saturday', value: '10:00 - 22:00', closed: false },
      { key: 'sun', label: 'Sunday', value: '14:00 - 18:00', closed: false }
    ],
    closedLabel: 'CLOSED',
    programTitle: 'Weekly program',
    programEmpty:
      'We are currently preparing the program for this week. Follow us on social media.'
  },
  de: {
    sectionTitle: 'Ausschank auf Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    intro:
      'Der Ausschank auf Šalanda befindet sich auf dem Brauereigelände, wo wir unsere Biere vom Fass ausschenken und regelmäßig ein Kulturprogramm veranstalten.',
    openingHoursTitle: 'Öffnungszeiten',
    openingHours: [
      { key: 'mon', label: 'Montag', value: 'GESCHLOSSEN', closed: true },
      { key: 'tue', label: 'Dienstag', value: 'GESCHLOSSEN', closed: true },
      { key: 'wed', label: 'Mittwoch', value: '16:00 - 20:00', closed: false },
      { key: 'thu', label: 'Donnerstag', value: '16:00 - 22:00', closed: false },
      { key: 'fri', label: 'Freitag', value: '10:00 - 22:00', closed: false },
      { key: 'sat', label: 'Samstag', value: '10:00 - 22:00', closed: false },
      { key: 'sun', label: 'Sonntag', value: '14:00 - 18:00', closed: false }
    ],
    closedLabel: 'GESCHLOSSEN',
    programTitle: 'Wochenprogramm',
    programEmpty:
      'Das Programm für diese Woche wird gerade vorbereitet. Folgen Sie uns in den sozialen Netzwerken.'
  }
}

export const getSalandaSectionContent = (
  language: SupportedLanguage
): SalandaSectionContent => contentByLanguage[language]

export const salandaDayToRowKey: Record<number, OpeningHourRow['key']> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat'
}
