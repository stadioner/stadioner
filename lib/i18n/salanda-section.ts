import type { SupportedLanguage } from '@/lib/i18n/site-languages'

type OpeningHourRow = {
  key: string
  label: string
  value: string
  closed: boolean
}

export type SalandaOccasionOption = {
  value: string
  label: string
}

export type SalandaReservationFormCopy = {
  title: string
  subtitle: string
  adventOnlySubtitle: string
  phoneHint: string
  phoneDisplay: string
  phoneHref: string
  fullName: string
  fullNamePlaceholder: string
  phone: string
  phonePlaceholder: string
  email: string
  emailPlaceholder: string
  reservationDate: string
  adventDatePlaceholder: string
  arrivalTime: string
  guests: string
  guestsLabel: (count: number) => string
  guestsLabel13Plus: string
  occasion: string
  occasionPlaceholder: string
  occasionOptions: SalandaOccasionOption[]
  note: string
  notePlaceholder: string
  submit: string
  submitting: string
  requiredLegend: string
  success: string
  error: string
  gdprPrefix: string
  gdprLink: string
}

type SalandaSectionContent = {
  sectionTitle: string
  address: string
  introParagraphs: string[]
  packagesNotice: string
  winterClosureNotice: string
  openingHoursTitle: string
  openingHours: OpeningHourRow[]
  closedLabel: string
  programTitle: string
  adventProgramTitle: string
  programEmpty: string
  programContactTitle: string
  programContactDescription: string
  reservation: SalandaReservationFormCopy
}

/** Flip to false when Šalanda reopens for the season. */
export const isSalandaWinterClosed = true

const contentByLanguage: Record<SupportedLanguage, SalandaSectionContent> = {
  cs: {
    sectionTitle: 'Výčep Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'Výčep Šalanda je místo v areálu pivovaru, kde si můžete dát produkty STADIONER – pivo, limonádu i vodu. K tomu najdete i něco malého k jídlu od lokálních podniků, například uzeniny z Mrákova.',
      'Doporučujeme si vzít něco teplého na sebe – uvnitř bývá chladněji.'
    ],
    packagesNotice: 'Od května 2027 spouštíme programové balíčky.',
    winterClosureNotice:
      'Výčep Šalanda je v zimním období uzavřen. Výjimkou jsou adventní neděle 6., 13. a 20. prosince – na ty můžete rezervovat stůl.',
    openingHoursTitle: 'Otevírací doba',
    openingHours: [
      { key: 'mon', label: 'Pondělí', value: 'ZAVŘENO', closed: true },
      { key: 'tue', label: 'Úterý', value: 'ZAVŘENO', closed: true },
      { key: 'wed', label: 'Středa', value: 'ZAVŘENO', closed: true },
      { key: 'thu', label: 'Čtvrtek', value: 'ZAVŘENO', closed: true },
      { key: 'fri', label: 'Pátek', value: '14:00 - 22:00', closed: false },
      { key: 'sat', label: 'Sobota', value: '14:00 - 22:00', closed: false },
      { key: 'sun', label: 'Neděle', value: '17:00 - 22:00', closed: false }
    ],
    closedLabel: 'ZAVŘENO',
    programTitle: 'Program týdne',
    adventProgramTitle: 'Adventní program',
    programEmpty: 'Program na tento týden právě připravujeme. Sledujte nás na sociálních sítích.',
    programContactTitle: 'Chcete vystoupit nebo něco navrhnout?',
    programContactDescription:
      'Součástí programu je živá hudba a vystoupení. Kdokoliv se může ozvat a mít zde své vlastní vystoupení.',
    reservation: {
      title: 'Rezervace stolu',
      subtitle: 'Těšíme se na vaši návštěvu!',
      adventOnlySubtitle:
        'Rezervace je dočasně dostupná pouze na adventní hudební program (6., 13. a 20. 12.).',
      phoneHint: 'Nebo volejte:',
      phoneDisplay: '+420 721 980 257',
      phoneHref: 'tel:+420721980257',
      fullName: 'Jméno a příjmení',
      fullNamePlaceholder: 'Vyplňte jméno a příjmení',
      phone: 'Telefonní číslo',
      phonePlaceholder: '+420 777 123 456',
      email: 'E-mail',
      emailPlaceholder: 'vas@email.cz',
      reservationDate: 'Datum rezervace',
      adventDatePlaceholder: 'Vyberte adventní neděli',
      arrivalTime: 'Čas příchodu',
      guests: 'Počet osob',
      guestsLabel: (count) =>
        count === 1 ? '1 osoba' : count < 5 ? `${count} osoby` : `${count} osob`,
      guestsLabel13Plus: '13+ osob',
      occasion: 'Událost / příležitost',
      occasionPlaceholder: 'Vyberte příležitost',
      occasionOptions: [
        { value: 'advent', label: 'Adventní hudební program' },
        { value: 'regular', label: 'Běžná rezervace stolu' },
        { value: 'birthday', label: 'Narozeniny' },
        { value: 'family', label: 'Rodinná oslava' },
        { value: 'corporate', label: 'Firemní setkání' },
        { value: 'other', label: 'Jiné' }
      ],
      note: 'Poznámka k rezervaci',
      notePlaceholder: 'Speciální požadavky, výzdoba, dětská židlička...',
      submit: 'Odeslat rezervaci',
      submitting: 'Odesílám...',
      requiredLegend: '* Povinné údaje',
      success: 'Děkujeme! Rezervaci jsme přijali a brzy se vám ozveme.',
      error: 'Omlouváme se, došlo k chybě. Zkuste to prosím znovu.',
      gdprPrefix: 'Odesláním souhlasíte s',
      gdprLink: 'ochranou osobních údajů'
    }
  },
  en: {
    sectionTitle: 'Šalanda Taproom',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'The Šalanda taproom is located in the brewery premises, where you can enjoy STADIONER products – beer, lemonade and water. You will also find light bites from local businesses, such as smoked meats from Mrákova.',
      'We recommend bringing something warm to wear – it tends to be colder inside.'
    ],
    packagesNotice: 'From May 2027 we will launch program packages.',
    winterClosureNotice:
      'Šalanda Taproom is closed for the winter season. Exception: Advent Sundays 6, 13 and 20 December – you can reserve a table for those dates.',
    openingHoursTitle: 'Opening hours',
    openingHours: [
      { key: 'mon', label: 'Monday', value: 'CLOSED', closed: true },
      { key: 'tue', label: 'Tuesday', value: 'CLOSED', closed: true },
      { key: 'wed', label: 'Wednesday', value: 'CLOSED', closed: true },
      { key: 'thu', label: 'Thursday', value: 'CLOSED', closed: true },
      { key: 'fri', label: 'Friday', value: '14:00 - 22:00', closed: false },
      { key: 'sat', label: 'Saturday', value: '14:00 - 22:00', closed: false },
      { key: 'sun', label: 'Sunday', value: '17:00 - 22:00', closed: false }
    ],
    closedLabel: 'CLOSED',
    programTitle: 'Weekly program',
    adventProgramTitle: 'Advent program',
    programEmpty:
      'We are currently preparing the program for this week. Follow us on social media.',
    programContactTitle: 'Want to perform or suggest something?',
    programContactDescription:
      'The program includes live music and performances. Anyone can get in touch and have their own performance here.',
    reservation: {
      title: 'Table reservation',
      subtitle: 'We look forward to your visit!',
      adventOnlySubtitle:
        'Reservations are temporarily available only for the Advent music program (6, 13 and 20 Dec).',
      phoneHint: 'Or call:',
      phoneDisplay: '+420 721 980 257',
      phoneHref: 'tel:+420721980257',
      fullName: 'Full name',
      fullNamePlaceholder: 'Enter your full name',
      phone: 'Phone number',
      phonePlaceholder: '+420 777 123 456',
      email: 'E-mail',
      emailPlaceholder: 'you@email.com',
      reservationDate: 'Reservation date',
      adventDatePlaceholder: 'Select an Advent Sunday',
      arrivalTime: 'Arrival time',
      guests: 'Number of guests',
      guestsLabel: (count) =>
        count === 1 ? '1 person' : `${count} people`,
      guestsLabel13Plus: '13+ people',
      occasion: 'Occasion',
      occasionPlaceholder: 'Select an occasion',
      occasionOptions: [
        { value: 'advent', label: 'Advent music program' },
        { value: 'regular', label: 'Regular table reservation' },
        { value: 'birthday', label: 'Birthday' },
        { value: 'family', label: 'Family celebration' },
        { value: 'corporate', label: 'Corporate gathering' },
        { value: 'other', label: 'Other' }
      ],
      note: 'Reservation note',
      notePlaceholder: 'Special requests, decorations, high chair...',
      submit: 'Send reservation',
      submitting: 'Sending...',
      requiredLegend: '* Required fields',
      success: 'Thank you! We have received your reservation and will get back to you soon.',
      error: 'Sorry, something went wrong. Please try again.',
      gdprPrefix: 'By submitting you agree to our',
      gdprLink: 'privacy policy'
    }
  },
  de: {
    sectionTitle: 'Ausschank Šalanda',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    introParagraphs: [
      'Der Ausschank Šalanda befindet sich auf dem Brauereigelände, wo Sie STADIONER-Produkte genießen können – Bier, Limonade und Wasser. Dazu gibt es kleine Speisen von lokalen Betrieben, zum Beispiel Wurstwaren aus Mrákova.',
      'Wir empfehlen, etwas Warmes anzuziehen – drinnen ist es oft kühler.'
    ],
    packagesNotice: 'Ab Mai 2027 starten wir Programmpakete.',
    winterClosureNotice:
      'Der Ausschank Šalanda ist in der Wintersaison geschlossen. Ausnahme: die Adventssonntage 6., 13. und 20. Dezember – für diese Termine können Sie einen Tisch reservieren.',
    openingHoursTitle: 'Öffnungszeiten',
    openingHours: [
      { key: 'mon', label: 'Montag', value: 'GESCHLOSSEN', closed: true },
      { key: 'tue', label: 'Dienstag', value: 'GESCHLOSSEN', closed: true },
      { key: 'wed', label: 'Mittwoch', value: 'GESCHLOSSEN', closed: true },
      { key: 'thu', label: 'Donnerstag', value: 'GESCHLOSSEN', closed: true },
      { key: 'fri', label: 'Freitag', value: '14:00 - 22:00', closed: false },
      { key: 'sat', label: 'Samstag', value: '14:00 - 22:00', closed: false },
      { key: 'sun', label: 'Sonntag', value: '17:00 - 22:00', closed: false }
    ],
    closedLabel: 'GESCHLOSSEN',
    programTitle: 'Wochenprogramm',
    adventProgramTitle: 'Adventsprogramm',
    programEmpty:
      'Das Programm für diese Woche wird gerade vorbereitet. Folgen Sie uns in den sozialen Netzwerken.',
    programContactTitle: 'Möchten Sie auftreten oder etwas vorschlagen?',
    programContactDescription:
      'Zum Programm gehören Live-Musik und Auftritte. Jeder kann sich melden und hier seinen eigenen Auftritt haben.',
    reservation: {
      title: 'Tischreservierung',
      subtitle: 'Wir freuen uns auf Ihren Besuch!',
      adventOnlySubtitle:
        'Reservierungen sind vorübergehend nur für das adventliche Musikprogramm (6., 13. und 20. 12.) möglich.',
      phoneHint: 'Oder rufen Sie an:',
      phoneDisplay: '+420 721 980 257',
      phoneHref: 'tel:+420721980257',
      fullName: 'Vor- und Nachname',
      fullNamePlaceholder: 'Namen eingeben',
      phone: 'Telefonnummer',
      phonePlaceholder: '+420 777 123 456',
      email: 'E-Mail',
      emailPlaceholder: 'ihre@email.de',
      reservationDate: 'Reservierungsdatum',
      adventDatePlaceholder: 'Adventssonntag wählen',
      arrivalTime: 'Ankunftszeit',
      guests: 'Anzahl der Personen',
      guestsLabel: (count) =>
        count === 1 ? '1 Person' : `${count} Personen`,
      guestsLabel13Plus: '13+ Personen',
      occasion: 'Anlass',
      occasionPlaceholder: 'Anlass auswählen',
      occasionOptions: [
        { value: 'advent', label: 'Adventliches Musikprogramm' },
        { value: 'regular', label: 'Normale Tischreservierung' },
        { value: 'birthday', label: 'Geburtstag' },
        { value: 'family', label: 'Familienfeier' },
        { value: 'corporate', label: 'Firmenevent' },
        { value: 'other', label: 'Sonstiges' }
      ],
      note: 'Hinweis zur Reservierung',
      notePlaceholder: 'Besondere Wünsche, Dekoration, Hochstuhl...',
      submit: 'Reservierung senden',
      submitting: 'Wird gesendet...',
      requiredLegend: '* Pflichtfelder',
      success:
        'Danke! Wir haben Ihre Reservierung erhalten und melden uns bald.',
      error: 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      gdprPrefix: 'Mit dem Absenden stimmen Sie der',
      gdprLink: 'Datenschutzerklärung'
    }
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
