'use client'

import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '@/store/use-language'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'

// Typ produktu
interface Product {
  name: string
  subtitle: string
  category: string
  categoryLabel: string
  slug: string
  url: string
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
    url: 'https://eshop.stadioner.cz/products/profesor-dvanactka-lahev',
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
  {
    name: 'Experiment jedenáctka',
    subtitle: 'Limitovaný speciál na čep – pouze sudy',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'jedenactka-experiment',
    url: 'https://eshop.stadioner.cz/products/jedenactka-experiment-sud-30l',
    description:
      'Experimentální jedenáctka s moderním chmelením dostupná exkluzivně v sudech. Ideální pro podniky a akce – čerstvá, na výčepu nejlepší.',
    stats: [
      { label: 'TYP', value: 'Světlý ležák' },
      { label: 'ABV', value: '4.5%' },
      { label: 'STUPEŇ', value: '11°' },
      { label: 'DOSTUPNOST', value: 'Pouze sudy' },
    ],
    image: '/products/pivo/jedenactka-experiment/barrel-30.webp',
    icon: '/products/blank-circle-beige.svg',
    ingredients: '/products/pivo/jedenactka-experiment/barrel-30.webp',
  },
]

const limosCs: Product[] = [
  {
    name: 'Limonáda citrón',
    subtitle: 'Svěží citronová limonáda z pramenité vody',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'limonada-citron',
    url: 'https://eshop.stadioner.cz/products/limonada-citron-lahev',
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
    url: 'https://eshop.stadioner.cz/products/limonada-pomeranc-lahev',
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
    url: 'https://eshop.stadioner.cz/products/cola-mix-lahev',
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
    name: 'Pramenitá voda (Perlivá)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-perliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-perliva-lahev',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů. Ideální pro každodenní pití, sportovní aktivity nebo jako základ pro přípravu nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/voda/perliva/bottle.webp',
    icon: '/products/voda/perliva/icon.svg',
    ingredients: '/products/voda/perliva/etiq.webp',
  },
  {
    name: 'Pramenitá voda (Neperlivá)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-neperliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-neperliva-lahev',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů, a díky své jemné chuti je ideální pro každodenní pití. Vhodná k hydrataci během dne, sportu i k přípravě jídel či nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/voda/neperliva/bottle.webp',
    icon: '/products/voda/neperliva/icon.svg',
    ingredients: '/products/voda/neperliva/etiq.webp',
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
    url: 'https://eshop.stadioner.cz/products/profesor-dvanactka-lahev',
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
  {
    name: 'Experiment Eleven',
    subtitle: 'Limited special on tap – kegs only',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'jedenactka-experiment',
    url: 'https://eshop.stadioner.cz/products/jedenactka-experiment-sud-30l',
    description:
      'An experimental 11° lager with modern hopping, available exclusively in kegs. Perfect for venues and events – best enjoyed fresh on tap.',
    stats: [
      { label: 'TYPE', value: 'Pale lager' },
      { label: 'ABV', value: '4.5%' },
      { label: 'DEGREE', value: '11°' },
      { label: 'AVAILABILITY', value: 'Kegs only' },
    ],
    image: '/products/pivo/jedenactka-experiment/barrel-30.webp',
    icon: '/products/blank-circle-beige.svg',
    ingredients: '/products/pivo/jedenactka-experiment/barrel-30.webp',
  },
]

const limosEn: Product[] = [
  {
    name: 'Lemon Lemonade',
    subtitle: 'Refreshing lemon soda made from spring water',
    category: 'limo',
    categoryLabel: 'Lemonade',
    slug: 'limonada-citron',
    url: 'https://eshop.stadioner.cz/products/limonada-citron-lahev',
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
    url: 'https://eshop.stadioner.cz/products/limonada-pomeranc-lahev',
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
    url: 'https://eshop.stadioner.cz/products/cola-mix-lahev',
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
    slug: 'pramenita-voda-perliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-perliva-lahev',
    description:
      'Stadioner spring water comes from the pristine springs of the Šumava mountains. Naturally pure, without added substances or minerals. Ideal for everyday drinking, sports, or as a base for beverages. Packed in returnable bottles for sustainability.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'TYPE', value: 'Spring' },
      { label: 'COMPOSITION', value: 'Natural' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/voda/perliva/bottle.webp',
    icon: '/products/voda/perliva/icon.svg',
    ingredients: '/products/voda/perliva/etiq.webp',
  },
  {
    name: 'Spring water (Still)',
    subtitle: 'Pure water from Šumava springs',
    category: 'voda',
    categoryLabel: 'Water',
    slug: 'pramenita-voda-neperliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-neperliva-lahev',
    description:
      'Stadioner spring water comes from clean Šumava springs. Naturally pure and with a gentle taste, ideal for everyday hydration, sports, and cooking. Packed in returnable bottles to be kind to the environment.',
    stats: [
      { label: 'VOLUME', value: '500 ml' },
      { label: 'TYPE', value: 'Spring' },
      { label: 'COMPOSITION', value: 'Natural' },
      { label: 'PACKAGING', value: 'Returnable bottle' },
    ],
    image: '/products/voda/neperliva/bottle.webp',
    icon: '/products/voda/neperliva/icon.svg',
    ingredients: '/products/voda/neperliva/etiq.webp',
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
    url: 'https://eshop.stadioner.cz/products/profesor-dvanactka-lahev',
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
  {
    name: 'Experiment Elfer',
    subtitle: 'Limitierter Spezial – nur Fässer',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'jedenactka-experiment',
    url: 'https://eshop.stadioner.cz/products/jedenactka-experiment-sud-30l',
    description:
      'Experimentelles 11° Lager mit modernem Hopfen, ausschließlich in Fässern erhältlich. Ideal für Gastronomie und Events – frisch vom Fass am besten.',
    stats: [
      { label: 'TYP', value: 'Helles Lager' },
      { label: 'ABV', value: '4.5%' },
      { label: 'GRAD', value: '11°' },
      { label: 'VERFÜGBARKEIT', value: 'Nur Fässer' },
    ],
    image: '/products/pivo/jedenactka-experiment/barrel-30.webp',
    icon: '/products/blank-circle-beige.svg',
    ingredients: '/products/pivo/jedenactka-experiment/barrel-30.webp',
  },
]

const limosDe: Product[] = [
  {
    name: 'Zitronenlimonade',
    subtitle: 'Erfrischende Zitronenlimonade aus Quellwasser',
    category: 'limo',
    categoryLabel: 'Limonade',
    slug: 'limonada-citron',
    url: 'https://eshop.stadioner.cz/products/limonada-citron-lahev',
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
    url: 'https://eshop.stadioner.cz/products/limonada-pomeranc-lahev',
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
    url: 'https://eshop.stadioner.cz/products/cola-mix-lahev',
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
    slug: 'pramenita-voda-perliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-perliva-lahev',
    description:
      'Das Quellwasser von Stadioner stammt aus sauberen Quellen des Böhmerwalds. Natürlich rein, ohne Zusatzstoffe oder Mineralien. Ideal für den täglichen Genuss, Sport oder als Basis für Getränke. In Mehrwegflaschen für mehr Nachhaltigkeit.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'TYP', value: 'Quell' },
      { label: 'ZUSAMMENSETZUNG', value: 'Natürlich' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/voda/perliva/bottle.webp',
    icon: '/products/voda/perliva/icon.svg',
    ingredients: '/products/voda/perliva/etiq.webp',
  },
  {
    name: 'Quellwasser (Still)',
    subtitle: 'Reines Wasser aus Böhmerwaldquellen',
    category: 'voda',
    categoryLabel: 'Wasser',
    slug: 'pramenita-voda-neperliva',
    url: 'https://eshop.stadioner.cz/products/pramenita-voda-neperliva-lahev',
    description:
      'Stadioner Quellwasser stammt aus reinen Böhmerwaldquellen. Natürlich rein, mit sanftem Geschmack – ideal für tägliche Hydration, Sport und Kochen. In Mehrwegflaschen für die Umwelt.',
    stats: [
      { label: 'VOLUMEN', value: '500 ml' },
      { label: 'TYP', value: 'Quell' },
      { label: 'ZUSAMMENSETZUNG', value: 'Natürlich' },
      { label: 'VERPACKUNG', value: 'Mehrwegflasche' },
    ],
    image: '/products/voda/neperliva/bottle.webp',
    icon: '/products/voda/neperliva/icon.svg',
    ingredients: '/products/voda/neperliva/etiq.webp',
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
    cs: {
      composition: 'Složení',
      compositionTitle: 'Složení a Alergeny',
      depositNote: 'Lahve jsou zálohované.',
      buy: 'Koupit',
      packaging: 'Balení',
      selectPackaging: 'Vyberte balení...',
      bottle: 'Lahev',
      crate: 'Bedna',
      barrel: 'Sud',
      barrel30: 'Sud 30 l',
      barrel50: 'Sud 50 l',
    },
    en: {
      composition: 'Ingredients',
      compositionTitle: 'Ingredients & Allergens',
      depositNote: 'Bottles are subject to a deposit.',
      buy: 'Buy',
      packaging: 'Packaging',
      selectPackaging: 'Select packaging...',
      bottle: 'Bottle',
      crate: 'Crate',
      barrel: 'Keg',
      barrel30: 'Keg 30 l',
      barrel50: 'Keg 50 l',
    },
    de: {
      composition: 'Zutaten',
      compositionTitle: 'Zutaten & Allergene',
      depositNote: 'Die Flaschen sind pfandpflichtig.',
      buy: 'Kaufen',
      packaging: 'Verpackung',
      selectPackaging: 'Verpackung auswählen...',
      bottle: 'Flasche',
      crate: 'Kiste',
      barrel: 'Fass',
      barrel30: 'Fass 30 l',
      barrel50: 'Fass 50 l',
    },
  } as const
  const labels = uiLabels[activeLang as 'cs' | 'en' | 'de']
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('pivo')
  const [current, setCurrent] = useState(0)
  const [packagingOpen, setPackagingOpen] = useState(false)

  type PackagingKey = 'bottle' | 'crate' | 'barrel30' | 'barrel50'
  type PackagingAvailability = Record<PackagingKey, boolean>
  const [availabilityBySlug, setAvailabilityBySlug] = useState<
    Record<string, PackagingAvailability>
  >({})
  const [selectedPackagingBySlug, setSelectedPackagingBySlug] = useState<
    Record<string, PackagingKey>
  >({})

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

  const deriveVariantUrls = (baseImagePath: string) => {
    // Normalize directory regardless of which variant the base uses
    const baseDir = baseImagePath.replace(
      /(bottle|crate|barrel-30|barrel-50)\.webp$/,
      ''
    )
    return {
      bottle: `${baseDir}bottle.webp`,
      crate: `${baseDir}crate.webp`,
      barrel30: `${baseDir}barrel-30.webp`,
      barrel50: `${baseDir}barrel-50.webp`,
    }
  }

  const productVariantUrls = useMemo(
    () => deriveVariantUrls(product.image),
    [product.image]
  )

  useEffect(() => {
    // probe image availability for current product once
    const slug = product.slug
    if (availabilityBySlug[slug]) return

    const urls = deriveVariantUrls(product.image)
    const keys: PackagingKey[] = ['bottle', 'crate', 'barrel30', 'barrel50']

    const checkImage = (url: string) =>
      new Promise<boolean>(resolve => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
      })

    Promise.all(keys.map(k => checkImage(urls[k]))).then(results => {
      const nextAvailability: PackagingAvailability = {
        bottle: results[0],
        crate: results[1],
        barrel30: results[2],
        barrel50: results[3],
      }
      setAvailabilityBySlug(prev => ({ ...prev, [slug]: nextAvailability }))
      // default selection: bottle if available, else first available
      const defaultKey = (
        ['bottle', 'crate', 'barrel30', 'barrel50'] as PackagingKey[]
      ).find(key => nextAvailability[key]) as PackagingKey | undefined
      if (defaultKey) {
        setSelectedPackagingBySlug(prev => ({ ...prev, [slug]: defaultKey }))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug, product.image])

  const availability = availabilityBySlug[product.slug]
  const selectedPackaging: PackagingKey =
    selectedPackagingBySlug[product.slug] || 'bottle'
  const packagingOptions: {
    key: PackagingKey
    label: string
    url: string
    available: boolean
  }[] = (
    [
      { key: 'bottle', label: labels.bottle, url: productVariantUrls.bottle },
      { key: 'crate', label: labels.crate, url: productVariantUrls.crate },
      {
        key: 'barrel30',
        label: labels.barrel30,
        url: productVariantUrls.barrel30,
      },
      {
        key: 'barrel50',
        label: labels.barrel50,
        url: productVariantUrls.barrel50,
      },
    ] as const
  ).map(opt => ({
    ...opt,
    available: availability ? availability[opt.key] : opt.key === 'bottle',
  }))

  const displayedImage =
    packagingOptions.find(o => o.key === selectedPackaging)?.url ||
    product.image
  const selectedPackagingLabel =
    packagingOptions.find(o => o.key === selectedPackaging)?.label ||
    labels.packaging

  const deriveBuyUrlForPackaging = (baseUrl: string, pkg: PackagingKey) => {
    // Prefer Czech suffixes present in current data. Also handle English fallbacks if needed.
    const mapCz: Record<PackagingKey, string> = {
      bottle: 'lahev',
      crate: 'bedna',
      barrel30: 'sud-30l',
      barrel50: 'sud-50l',
    }

    // If URL already contains cz suffix
    if (/-lahev$/.test(baseUrl)) {
      return baseUrl.replace(/-lahev$/, `-${mapCz[pkg]}`)
    }
    if (/-bedna$/.test(baseUrl) || /-sud-(30|50)$/.test(baseUrl)) {
      return baseUrl.replace(/-(lahev|bedna|sud-(30|50))$/, `-${mapCz[pkg]}`)
    }

    // Fallback: append suffix
    return `${baseUrl}-${mapCz[pkg]}`
  }

  const buyUrl = deriveBuyUrlForPackaging(product.url, selectedPackaging)

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

          {/* Packaging Selector (below flavor icons) */}
          <div className='flex justify-center mt-4'>
            <Popover open={packagingOpen} onOpenChange={setPackagingOpen}>
              <PopoverTrigger asChild>
                <button
                  className='border border-brand-primary text-brand-primary font-medium py-1 px-3 cursor-pointer hover:opacity-90 transition hover:bg-brand-primary hover:text-brand-action inline-flex items-center gap-2'
                  aria-label={selectedPackagingLabel}
                >
                  <span>{selectedPackagingLabel}</span>
                  <span aria-hidden>▾</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className='p-0 w-56 bg-zinc-900 border-zinc-700'>
                <Command>
                  <CommandGroup>
                    {packagingOptions
                      .filter(o => o.available)
                      .map(option => (
                        <CommandItem
                          key={option.key}
                          value={option.key}
                          onSelect={() => {
                            setSelectedPackagingBySlug(prev => ({
                              ...prev,
                              [product.slug]: option.key,
                            }))
                            setPackagingOpen(false)
                          }}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className='flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-8 items-stretch mt-6 sm:mt-12'>
            <div className='flex-1 md:hidden flex items-center justify-center relative'>
              <AnimatePresence mode='wait'>
                <div className='relative'>
                  <motion.img
                    key={displayedImage}
                    src={displayedImage}
                    alt={product.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className='max-h-[300px] drop-shadow-2xl animate-bottle relative z-10'
                  />
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/80 rounded-full blur-lg animate-bottle-shadow' />
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
                  <div className='flex items-center gap-2'>
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
                <div className='grid place-self-end'>
                  <Button asChild variant={'shop'}>
                    <Link
                      href={buyUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {labels.buy}
                    </Link>
                  </Button>
                  <p className='text-xs text-zinc-400 mt-1'>
                    {labels.depositNote}
                  </p>
                </div>
              </div>
            </div>
            {/* Right: Product Image */}
            <div className='flex-1 hidden md:flex items-center justify-center relative'>
              <AnimatePresence mode='wait'>
                <div className='relative'>
                  <motion.img
                    key={displayedImage}
                    src={displayedImage}
                    alt={product.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className='max-h-[470px] drop-shadow-2xl animate-bottle relative z-10'
                  />
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-14 bg-black/60 rounded-full blur-lg animate-bottle-shadow' />
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
