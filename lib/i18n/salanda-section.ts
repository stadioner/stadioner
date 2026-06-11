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
  introParagraphs: string[]
  openingHoursTitle: string
  openingHours: OpeningHourRow[]
  closedLabel: string
  programTitle: string
  programEmpty: string
  programContactTitle: string
  programContactDescription: string
}

const contentByLanguage: Record<SupportedLanguage, SalandaSectionContent> = {
  cs: {
    sectionTitle: 'Výčep na Šalandě',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'Výčep na Šalandě je místo v areálu pivovaru, kde si můžete dát produkty STADIONER – pivo, limonádu i vodu. K tomu najdete i něco malého k jídlu od lokálních podniků, například uzeniny z Mrákova.',
      'Doporučujeme si vzít něco teplého na sebe – uvnitř bývá chladněji.'
    ],
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
    programEmpty: 'Program na tento týden právě připravujeme. Sledujte nás na sociálních sítích.',
    programContactTitle: 'Chcete vystoupit nebo něco navrhnout?',
    programContactDescription:
      'Součástí programu je živá hudba a vystoupení. Kdokoliv se může ozvat a mít zde své vlastní vystoupení.'
  },
  en: {
    sectionTitle: 'Taproom at Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'The taproom at Šalanda is located in the brewery premises, where you can enjoy STADIONER products – beer, lemonade and water. You will also find light bites from local businesses, such as smoked meats from Mrákova.',
      'We recommend bringing something warm to wear – it tends to be colder inside.'
    ],
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
      'We are currently preparing the program for this week. Follow us on social media.',
    programContactTitle: 'Want to perform or suggest something?',
    programContactDescription:
      'The program includes live music and performances. Anyone can get in touch and have their own performance here.'
  },
  de: {
    sectionTitle: 'Ausschank auf Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'Der Ausschank auf Šalanda befindet sich auf dem Brauereigelände, wo Sie STADIONER-Produkte genießen können – Bier, Limonade und Wasser. Dazu gibt es kleine Speisen von lokalen Betrieben, zum Beispiel Wurstwaren aus Mrákova.',
      'Wir empfehlen, etwas Warmes anzuziehen – drinnen ist es oft kühler.'
    ],
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
      'Das Programm für diese Woche wird gerade vorbereitet. Folgen Sie uns in den sozialen Netzwerken.',
    programContactTitle: 'Möchten Sie auftreten oder etwas vorschlagen?',
    programContactDescription:
      'Zum Programm gehören Live-Musik und Auftritte. Jeder kann sich melden und hier seinen eigenen Auftritt haben.'
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
