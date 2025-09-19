'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/store/use-language'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Typ produktu
interface Product {
  name: string
  subtitle: string
  category: string
  categoryLabel: string
  slug: string
  description: string
  stats: { label: string; value: string }[]
  image: string
  icon: string
  ingredients: string
}

// Rozdělené produkty podle kategorií (čeština)
const beersCs: Product[] = [
  {
    name: 'Profesor dvanáctka',
    subtitle: 'Klasický nefiltrovaný ležák s plnou chutí',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'profesor-dvanactka',
    description:
      'Pivo Profesor 12 je ideální volbou pro ty, kdo hledají poctivé, nekompromisní pivo bez zbytečných úprav. Je nefiltrované a nepasterizované, takže si zachovává přirozenou chuť a charakter skutečného českého ležáku. Perfektně se hodí ke grilovaným masům, sýrům i jen tak k posezení s přáteli.',
    stats: [
      { label: 'TYP', value: 'Ležák světlý' },
      { label: 'ABV', value: '5.1%' },
      { label: 'STUPEŇ', value: '12°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/pivo/dvanactka/bottle.webp',
    icon: '/products/pivo/dvanactka/icon.svg',
    ingredients: '/products/pivo/dvanactka/etiq.webp',
  },
  //   {
  //     name: 'Koutská jedenáctka',
  //     subtitle: 'Lehký ležák s jemnou hořkostí',
  //     category: 'pivo',
  //     categoryLabel: 'Pivo',
  //     slug: 'koutska-jedenactka',
  //     description:
  //       'Tato jedenáctka vyniká svou pitelností, čistým profilem a jemně chmelovým aroma. Skvěle se hodí k české kuchyni, lehkým jídlům nebo jen tak k posezení s přáteli. Pokud hledáš poctivé řemeslné pivo s nižší stupňovitostí, Koutská 11 je sázka na jistotu.',
  //     stats: [
  //       { label: 'TYP PIVA', value: 'Ležák světlý' },
  //       { label: 'ABV', value: '4.2%' },
  //       { label: 'STUPEŇ', value: '11°' },
  //       { label: 'FILTRACE', value: 'Nefiltrované' },
  //     ],
  //     image: '/products/bottle.webp',
  //     icon: '/products/pivo/jedenactka/icon.svg',
  //     ingredients: '/products/limo/citron/etiq.webp',
  //   },
]

const limosCs: Product[] = [
  {
    name: 'Limonáda citrón',
    subtitle: 'Svěží citronová limonáda z pramenité vody',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'limonada-citron',
    description:
      'Citronová limonáda Stadioner je svěží nealkoholický nápoj vyráběný z pramenité vody z šumavských lesů. Vyniká příjemně kyselou chutí citronu, která osvěží v každé situaci – ať už při práci, sportu nebo odpočinku. Díky pečlivě zvolenému složení bez zbytečných konzervantů je limonáda lehká, přírodní a vyvážená.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Citrón' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/limo/citron/bottle.webp',
    icon: '/products/limo/citron/icon.svg',
    ingredients: '/products/limo/citron/etiq.webp',
  },
  {
    name: 'Limonáda pomeranč',
    subtitle: 'Osvěžující pomerančová limonáda z pramenité vody',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'limonada-pomeranc',
    description:
      'Pomerančová limonáda Stadioner je sladší nealkoholický nápoj s výraznou ovocnou chutí, vyráběný z pramenité vody z šumavských lesů. Díky jemnému sycení a přírodnímu aroma nabízí osvěžení, které potěší v horkých dnech i při odpočinku. Bez zbytečných konzervantů a umělých barviv.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Pomeranč' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/limo/pomeranc/bottle.webp',
    icon: '/products/limo/pomeranc/icon.svg',
    ingredients: '/products/limo/pomeranc/etiq.webp',
  },
  {
    name: 'Cola mix',
    subtitle: 'Klasická cola s jemným citronovým nádechem',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'cola-mix',
    description:
      'Cola mix Stadioner spojuje tradiční colovou chuť s osvěžujícím citronovým nádechem. Vyrábí se z pramenité vody z šumavských lesů a je jemně sycená pro ideální pitelný zážitek. Perfektní volba pro milovníky coly, kteří chtějí něco neobvyklého, ale přitom známého.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Cola s citronem' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/limo/colamix/bottle.webp',
    icon: '/products/limo/colamix/icon.svg',
    ingredients: '/products/limo/colamix/etiq.webp',
  },
]

const watersCs: Product[] = [
  {
    name: 'Pramenitá voda (Sycená)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-sycena',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů. Ideální pro každodenní pití, sportovní aktivity nebo jako základ pro přípravu nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/voda/sycena/bottle.webp',
    icon: '/products/voda/sycena/icon.svg',
    ingredients: '/products/voda/sycena/etiq.webp',
  },
  {
    name: 'Pramenitá voda (Nesycená)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-nesycena',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů, a díky své jemné chuti je ideální pro každodenní pití. Vhodná k hydrataci během dne, sportu i k přípravě jídel či nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/voda/nesycena/bottle.webp',
    icon: '/products/voda/nesycena/icon.svg',
    ingredients: '/products/voda/nesycena/etiq.webp',
  },
]

// English
const beersEn: Product[] = [
  {
    name: 'Professor 12',
    subtitle: 'Classic unfiltered lager with full flavor',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'profesor-dvanactka',
    description:
      'Professor 12 is the perfect choice for those who seek an honest, uncompromising beer without unnecessary tweaks. Unfiltered and unpasteurized, it preserves the natural taste and character of a true Czech lager. Perfect with grilled meats, cheeses, or just for a relaxed evening with friends.',
    stats: [
      { label: 'TYPE', value: 'Pale lager' },
      { label: 'ABV', value: '5.1%' },
      { label: 'DEGREE', value: '12°' },
      { label: 'FILTRATION', value: 'Unfiltered' },
    ],
    image: '/products/pivo/dvanactka/bottle.webp',
    icon: '/products/pivo/dvanactka/icon.svg',
    ingredients: '/products/pivo/dvanactka/etiq.webp',
  },
  //   {
  //     name: 'Koutska 11',
  //     subtitle: 'Light lager with gentle bitterness',
  //     category: 'pivo',
  //     categoryLabel: 'Beer',
  //     slug: 'koutska-jedenactka',
  //     description:
  //       'This 11° stands out for its drinkability, clean profile, and a delicate hop aroma. Great with Czech cuisine, lighter meals, or simply for an easy-going get-together. If you want honest craft beer with a lower gravity, Koutska 11 is a safe bet.',
  //     stats: [
  //       { label: 'TYPE', value: 'Pale lager' },
  //       { label: 'ABV', value: '4.2%' },
  //       { label: 'DEGREE', value: '11°' },
  //       { label: 'FILTRATION', value: 'Unfiltered' },
  //     ],
  //     image: '/products/bottle.webp',
  //     icon: '/products/pivo/jedenactka/icon.svg',
  //     ingredients: '/products/limo/citron/etiq.webp',
  //   },
]

const limosEn: Product[] = [
  {
    name: 'Lemon Lemonade',
    subtitle: 'Refreshing lemon soda made from spring water',
    category: 'limo',
    categoryLabel: 'Lemonade',
    slug: 'limonada-citron',
    description:
      'Stadioner Lemon Lemonade is a refreshing non-alcoholic drink made from spring water from the Šumava forests. It features a pleasantly tart lemon taste that refreshes in any situation—at work, during sports, or while relaxing. Carefully balanced without unnecessary preservatives.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'FLAVOR', value: 'Lemon' },
      { label: 'INGREDIENTS', value: 'Spring water' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/limo/citron/bottle.webp',
    icon: '/products/limo/citron/icon.svg',
    ingredients: '/products/limo/citron/etiq.webp',
  },
  {
    name: 'Orange Lemonade',
    subtitle: 'Refreshing orange soda made from spring water',
    category: 'limo',
    categoryLabel: 'Lemonade',
    slug: 'limonada-pomeranc',
    description:
      'Stadioner Orange Lemonade is a sweeter non-alcoholic drink with a pronounced fruity taste, made from spring water from the Šumava forests. Gently carbonated and naturally flavored for a pleasant refreshment.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'FLAVOR', value: 'Orange' },
      { label: 'INGREDIENTS', value: 'Spring water' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/limo/pomeranc/bottle.webp',
    icon: '/products/limo/pomeranc/icon.svg',
    ingredients: '/products/limo/pomeranc/etiq.webp',
  },
  {
    name: 'Cola mix',
    subtitle: 'Classic cola with a hint of lemon',
    category: 'limo',
    categoryLabel: 'Lemonade',
    slug: 'cola-mix',
    description:
      'Stadioner Cola mix combines the traditional cola taste with a refreshing lemon note. Made from spring water from the Šumava forests and gently carbonated for ideal drinkability.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'FLAVOR', value: 'Cola with lemon' },
      { label: 'INGREDIENTS', value: 'Spring water' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/limo/colamix/bottle.webp',
    icon: '/products/limo/colamix/icon.svg',
    ingredients: '/products/limo/colamix/etiq.webp',
  },
]

const watersEn: Product[] = [
  {
    name: 'Spring water (Sparkling)',
    subtitle: 'Pure water from Šumava springs',
    category: 'voda',
    categoryLabel: 'Water',
    slug: 'pramenita-voda-sycena',
    description:
      'Stadioner spring water comes from the pristine springs of the Šumava mountains. Naturally pure, without added substances or minerals. Ideal for everyday drinking, sports, or as a base for beverages. Packed in returnable bottles for sustainability.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'TYPE', value: 'Spring' },
      { label: 'COMPOSITION', value: 'Natural' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/voda/sycena/bottle.webp',
    icon: '/products/voda/sycena/icon.svg',
    ingredients: '/products/voda/sycena/etiq.webp',
  },
  {
    name: 'Spring water (Still)',
    subtitle: 'Pure water from Šumava springs',
    category: 'voda',
    categoryLabel: 'Water',
    slug: 'pramenita-voda-nesycena',
    description:
      'Stadioner spring water comes from clean Šumava springs. Naturally pure and with a gentle taste, ideal for everyday hydration, sports, and cooking. Packed in returnable bottles to be kind to the environment.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'TYPE', value: 'Spring' },
      { label: 'COMPOSITION', value: 'Natural' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/voda/nesycena/bottle.webp',
    icon: '/products/voda/nesycena/icon.svg',
    ingredients: '/products/voda/nesycena/etiq.webp',
  },
]

// Deutsch
const beersDe: Product[] = [
  {
    name: 'Professor 12',
    subtitle: 'Klassisches ungefiltertes Lager mit vollem Geschmack',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'profesor-dvanactka',
    description:
      'Professor 12 ist die ideale Wahl für alle, die ein ehrliches, kompromissloses Bier ohne unnötige Zusätze suchen. Ungefiltert und unpasteurisiert bewahrt es den natürlichen Geschmack und Charakter eines echten tschechischen Lagers. Perfekt zu Gegrilltem, Käse oder einfach zum gemütlichen Beisammensein.',
    stats: [
      { label: 'TYP', value: 'Helles Lager' },
      { label: 'ABV', value: '5.1%' },
      { label: 'GRAD', value: '12°' },
      { label: 'FILTRATION', value: 'Ungefiltert' },
    ],
    image: '/products/pivo/dvanactka/bottle.webp',
    icon: '/products/pivo/dvanactka/icon.svg',
    ingredients: '/products/pivo/dvanactka/etiq.webp',
  },
  //   {
  //     name: 'Koutska 11',
  //     subtitle: 'Leichtes Lager mit feiner Bittere',
  //     category: 'pivo',
  //     categoryLabel: 'Bier',
  //     slug: 'koutska-jedenactka',
  //     description:
  //       'Dieses 11° ist besonders trinkbar, mit sauberem Profil und feinem Hopfenaroma. Passt hervorragend zur tschechischen Küche, zu leichten Gerichten oder einfach zum gemütlichen Abend. Wer ehrliches Craft-Bier mit niedriger Stammwürze sucht, liegt mit Koutska 11 richtig.',
  //     stats: [
  //       { label: 'TYP', value: 'Helles Lager' },
  //       { label: 'ABV', value: '4.2%' },
  //       { label: 'GRAD', value: '11°' },
  //       { label: 'FILTRATION', value: 'Ungefiltert' },
  //     ],
  //     image: '/products/bottle.webp',
  //     icon: '/products/pivo/jedenactka/icon.svg',
  //     ingredients: '/products/limo/citron/etiq.webp',
  //   },
]

const limosDe: Product[] = [
  {
    name: 'Zitronenlimonade',
    subtitle: 'Erfrischende Zitronenlimonade aus Quellwasser',
    category: 'limo',
    categoryLabel: 'Limonade',
    slug: 'limonada-citron',
    description:
      'Die Zitronenlimonade von Stadioner ist ein erfrischendes alkoholfreies Getränk aus Quellwasser des Böhmerwalds. Angenehm säuerlich und ideal zum Arbeiten, Sport oder Entspannen. Ohne unnötige Konservierungsstoffe – leicht, natürlich und ausgewogen.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'GESCHMACK', value: 'Zitrone' },
      { label: 'ZUSAMMENSETZUNG', value: 'Quellwasser' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/limo/citron/bottle.webp',
    icon: '/products/limo/citron/icon.svg',
    ingredients: '/products/limo/citron/etiq.webp',
  },
  {
    name: 'Orangenlimonade',
    subtitle: 'Erfrischende Orangenlimonade aus Quellwasser',
    category: 'limo',
    categoryLabel: 'Limonade',
    slug: 'limonada-pomeranc',
    description:
      'Die Orangenlimonade von Stadioner ist ein süßer, fruchtiger Durstlöscher aus Quellwasser des Böhmerwalds. Sanft kohlensäurehaltig mit natürlichem Aroma – ideal zur Erfrischung.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'GESCHMACK', value: 'Orange' },
      { label: 'ZUSAMMENSETZUNG', value: 'Quellwasser' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/limo/pomeranc/bottle.webp',
    icon: '/products/limo/pomeranc/icon.svg',
    ingredients: '/products/limo/pomeranc/etiq.webp',
  },
  {
    name: 'Cola Mix',
    subtitle: 'Klassische Cola mit einem Hauch Zitrone',
    category: 'limo',
    categoryLabel: 'Limonade',
    slug: 'cola-mix',
    description:
      'Stadioner Cola Mix verbindet den traditionellen Cola-Geschmack mit einer erfrischenden Zitronennote. Aus Quellwasser des Böhmerwalds und sanft kohlensäurehaltig – ideal trinkbar.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'GESCHMACK', value: 'Cola mit Zitrone' },
      { label: 'ZUSAMMENSETZUNG', value: 'Quellwasser' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/limo/colamix/bottle.webp',
    icon: '/products/limo/colamix/icon.svg',
    ingredients: '/products/limo/colamix/etiq.webp',
  },
]

const watersDe: Product[] = [
  {
    name: 'Quellwasser (Kohlensäurehaltig)',
    subtitle: 'Reines Wasser aus Böhmerwaldquellen',
    category: 'voda',
    categoryLabel: 'Wasser',
    slug: 'pramenita-voda-sycena',
    description:
      'Das Quellwasser von Stadioner stammt aus sauberen Quellen des Böhmerwalds. Natürlich rein, ohne Zusatzstoffe oder Mineralien. Ideal für den täglichen Genuss, Sport oder als Basis für Getränke. In Mehrwegflaschen für mehr Nachhaltigkeit.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'TYP', value: 'Quell' },
      { label: 'ZUSAMMENSETZUNG', value: 'Natürlich' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/voda/sycena/bottle.webp',
    icon: '/products/voda/sycena/icon.svg',
    ingredients: '/products/voda/sycena/etiq.webp',
  },
  {
    name: 'Quellwasser (Still)',
    subtitle: 'Reines Wasser aus Böhmerwaldquellen',
    category: 'voda',
    categoryLabel: 'Wasser',
    slug: 'pramenita-voda-nesycena',
    description:
      'Stadioner Quellwasser stammt aus reinen Böhmerwaldquellen. Natürlich rein, mit sanftem Geschmack – ideal für tägliche Hydration, Sport und Kochen. In Mehrwegflaschen für die Umwelt.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'TYP', value: 'Quell' },
      { label: 'ZUSAMMENSETZUNG', value: 'Natürlich' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/voda/nesycena/bottle.webp',
    icon: '/products/voda/nesycena/icon.svg',
    ingredients: '/products/voda/nesycena/etiq.webp',
  },
]

// Kategorie (labels) podle jazyka
const categoriesCs = [
  { id: 'pivo', label: 'Piva' },
  { id: 'limo', label: 'Limonády' },
  { id: 'voda', label: 'Vody' },
]
const categoriesEn = [
  { id: 'pivo', label: 'Beers' },
  { id: 'limo', label: 'Lemonades' },
  { id: 'voda', label: 'Water' },
]
const categoriesDe = [
  { id: 'pivo', label: 'Biere' },
  { id: 'limo', label: 'Limonaden' },
  { id: 'voda', label: 'Wasser' },
]

export const Products = ({
  rippedPaper,
  hScreen,
}: {
  rippedPaper?: boolean
  hScreen?: boolean
}) => {
  const { language } = useLanguage()
  const activeLang = language === 'en' || language === 'de' ? language : 'cs'

  // Mapování kategorií na pole produktů dle jazyka
  const productMap: { [key: string]: Product[] } =
    activeLang === 'cs'
      ? { pivo: beersCs, limo: limosCs, voda: watersCs }
      : activeLang === 'en'
        ? { pivo: beersEn, limo: limosEn, voda: watersEn }
        : { pivo: beersDe, limo: limosDe, voda: watersDe }

  const categories =
    activeLang === 'cs'
      ? categoriesCs
      : activeLang === 'en'
        ? categoriesEn
        : categoriesDe

  const uiLabels = {
    cs: { composition: 'Složení', compositionTitle: 'Složení a Alergeny' },
    en: {
      composition: 'Ingredients',
      compositionTitle: 'Ingredients & Allergens',
    },
    de: { composition: 'Zutaten', compositionTitle: 'Zutaten & Allergene' },
  } as const
  const labels = uiLabels[activeLang as 'cs' | 'en' | 'de']
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('pivo')
  const [current, setCurrent] = useState(0)

  // Vždy aktuální pole produktů podle kategorie
  const filteredProducts = productMap[selectedCategory] || []

  // Handle URL changes on mount and when searchParams change
  useEffect(() => {
    const productSlug = searchParams.get('produkt')
    const categoryParam = searchParams.get('kategorie')

    if (categoryParam && productMap[categoryParam]) {
      setSelectedCategory(categoryParam)
    }

    let idx = 0
    if (productSlug) {
      const targetCategory = categoryParam || selectedCategory
      const foundIdx = (productMap[targetCategory] || []).findIndex(
        (p: Product) => p.slug === productSlug
      )
      if (foundIdx !== -1) {
        idx = foundIdx
      }
    }
    setCurrent(idx)
  }, [searchParams, productMap, selectedCategory])

  const updateURL = (productIndex: number, category?: string) => {
    const targetCategory = category || selectedCategory
    const targetFilteredProducts = productMap[targetCategory] || []
    const safeIndex = Math.max(
      0,
      Math.min(productIndex, targetFilteredProducts.length - 1)
    )
    const product = targetFilteredProducts[safeIndex]
    if (!product) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('produkt', product.slug)
    params.set('kategorie', targetCategory)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrent(0)
    updateURL(0, category)
  }

  const handlePrev = () => {
    const newIndex = current === 0 ? filteredProducts.length - 1 : current - 1
    setCurrent(newIndex)
    updateURL(newIndex)
  }

  const handleNext = () => {
    const newIndex = current === filteredProducts.length - 1 ? 0 : current + 1
    setCurrent(newIndex)
    updateURL(newIndex)
  }

  const handleSelect = (idx: number) => {
    setCurrent(idx)
    updateURL(idx)
  }

  const product = filteredProducts[current] || filteredProducts[0]
  if (!product) {
    return null
  }

  return (
    <section className={cn('relative', !hScreen && 'bg-brand-secondary')}>
      <div className={cn('bg-brand-action py-8', hScreen && '')}>
        {rippedPaper && (
          <div
            className='absolute -top-4 left-0 w-full z-10'
            style={{ lineHeight: 0 }}
          >
            <RippedPaperSVG flip />
          </div>
        )}
        <Container className=''>
          {/* Category Selector */}
          <div className='flex justify-center'>
            <div className='flex bg-zinc-800/50 p-1 backdrop-blur-sm'>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    'px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    selectedCategory === category.id
                      ? 'bg-brand-primary text-brand-action shadow-lg'
                      : 'text-brand-primary hover:bg-zinc-700/50'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation arrows and product icons */}
          <div className='flex items-center justify-center gap-4 mt-6'>
            <button
              onClick={handlePrev}
              className='size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
              aria-label='Previous product'
            >
              &#8592;
            </button>

            <div className='flex gap-2'>
              {filteredProducts.map((p: Product, idx: number) => (
                <motion.button
                  key={p.name}
                  onClick={() => handleSelect(idx)}
                  className={`rounded-full border-2 cursor-pointer ${
                    current === idx
                      ? 'border-brand-secondary'
                      : 'border-transparent'
                  } bg-zinc-800`}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: current === idx ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-label={`Select ${p.name}`}
                >
                  <img
                    src={p.icon}
                    alt={p.name}
                    className='size-12 md:size-14 object-cover rounded-full'
                  />
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label='Next product'
              className='size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
            >
              &#8594;
            </button>
          </div>

          <div className='flex flex-col md:grid md:grid-cols-[1.6fr_1fr] gap-8 items-stretch mt-6 sm:mt-12'>
            <div className='flex-1 md:hidden flex items-center justify-center relative'>
              <AnimatePresence mode='wait'>
                <div className='relative'>
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className='max-h-[300px] drop-shadow-2xl animate-bottle relative z-10'
                  />
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black/20 rounded-full blur-sm animate-bottle-shadow'></div>
                </div>
              </AnimatePresence>
            </div>
            {/* Left: Info & Navigation */}
            <div className='flex-1 flex flex-col justify-center'>
              <div className='mb-8'>
                <p className='uppercase tracking-widest text-xs text-zinc-300 mb-2'>
                  {product.subtitle}
                </p>
                <div className='flex items-center justify-between mb-4'>
                  <AnimatePresence mode='wait'>
                    <motion.h2
                      key={product.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className='text-3xl md:text-6xl font-bold text-brand-primary'
                    >
                      {product.name}
                    </motion.h2>
                  </AnimatePresence>
                  <Dialog>
                    <DialogTrigger className='border border-brand-primary text-brand-primary font-bold py-1 px-3 mb-2 cursor-pointer hover:opacity-90 transition hover:bg-brand-primary hover:text-brand-action self-end'>
                      {labels.composition}
                    </DialogTrigger>
                    <DialogContent className='bg-brand-primary h-[500px]'>
                      <DialogHeader>
                        <DialogTitle className='text-brand-action text-2xl'>
                          {labels.compositionTitle}
                        </DialogTitle>
                      </DialogHeader>

                      <img
                        src={product.ingredients}
                        alt='ingredients'
                        className='max-h-[400px]'
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <AnimatePresence mode='wait'>
                  <motion.p
                    key={product.description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className='text-zinc-200 mb-8 max-w-lg hidden sm:block'
                  >
                    {product.description}
                  </motion.p>
                </AnimatePresence>
                <div className='flex justify-between border-t border-zinc-600 pt-6 mb-6'>
                  {product.stats.map(
                    (stat: { label: string; value: string }) => (
                      <div
                        key={stat.label}
                        className='flex flex-col items-center min-w-[90px]'
                      >
                        <span className='text-xs text-zinc-400'>
                          {stat.label}
                        </span>
                        <span className='text-lg font-bold text-brand-primary'>
                          {stat.value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Right: Product Image */}
            <div className='flex-1 hidden md:flex items-center justify-center relative'>
              <AnimatePresence mode='wait'>
                <div className='relative'>
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className='max-h-[470px] drop-shadow-2xl animate-bottle relative z-10'
                  />
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-black/20 rounded-full blur-sm animate-bottle-shadow'></div>
                </div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
        {rippedPaper && (
          <div
            className='absolute -bottom-4 left-0 w-full z-10'
            style={{ lineHeight: 0 }}
          >
            <RippedPaperSVG />
          </div>
        )}
      </div>
    </section>
  )
}
