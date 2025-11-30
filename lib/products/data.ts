import type { Product, Category, Language } from '@/types/products'

// Czech products
export const beersCs: Product[] = [
  {
    name: 'Šafář 15°',
    subtitle: 'Mohutný patnáctistupňový speciál s hlubokou zlatou barvou',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'safar-15',
    url: 'https://eshop.stadioner.cz/products/safar-15-lahev',
    description:
      'Pivo Šafář 15 je mohutný patnáctistupňový speciál s hlubokou zlatou barvou a krémovou pěnou. Nabízí plné tělo, výraznou sladovou sladkost vyváženou pevnou hořkostí a dlouhým dozníváním. Ideální k vepřovému kolenu, kachně, tvrdým sýrům nebo k pořádnému posezení, kdy si chcete dopřát něco opravdu silného.',
    stats: [
      { label: 'TYP', value: 'Silné světlé' },
      { label: 'ABV', value: '6.5%' },
      { label: 'STUPEŇ', value: '15°' },
    ],
    image: '/products/pivo/15/bottle.webp',
    icon: '/products/pivo/15/icon.svg',
    ingredients: '/products/pivo/15/etiq.webp',
  },
  {
    name: 'Profesor 12°',
    subtitle: 'Klasický nefiltrovaný ležák s plnou chutí',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'profesor-12',
    url: 'https://eshop.stadioner.cz/products/profesor-12-lahev',
    description:
      'Pivo Profesor 12° je ideální volbou pro ty, kdo hledají poctivé, nekompromisní pivo bez zbytečných úprav. Je nefiltrované, takže si zachovává přirozenou chuť a charakter skutečného českého ležáku. Perfektně se hodí ke grilovaným masům, sýrům i jen tak k posezení s přáteli.',
    stats: [
      { label: 'TYP', value: 'Ležák světlý' },
      { label: 'ABV', value: '5.1%' },
      { label: 'STUPEŇ', value: '12°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/pivo/12/bottle.webp',
    icon: '/products/pivo/12/icon.svg',
    ingredients: '/products/pivo/12/etiq.webp',
  },
  {
    name: 'Experiment 11°',
    subtitle: 'Experimentální jedenáctka s moderním chmelením',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'experiment-11',
    url: 'https://eshop.stadioner.cz/products/experiment-11-lahev',
    description:
      'Pivo Experiment 11 je skvělou volbou pro milovníky autentického pivního zážitku. Nabízí plnou chuť s výrazným charakterem, který osloví každého, kdo ocení poctivé řemeslné pivo. Skvěle doplní grilované pokrmy, uzeniny nebo chvíle strávené v dobré společnosti.',
    stats: [
      { label: 'TYP', value: 'Světlý ležák' },
      { label: 'ABV', value: '4.5%' },
      { label: 'STUPEŇ', value: '11°' },
    ],
    image: '/products/pivo/11/bottle.webp',
    icon: '/products/pivo/11/icon.svg',
    ingredients: '/products/pivo/11/etiq.webp',
  },
  {
    name: 'Požárník 10°',
    subtitle: 'Osvěžující, poctivý desetistupňový ležák pro každou příležitost',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'pozarnik-10',
    url: 'https://eshop.stadioner.cz/products/pozarnik-10-lahev',
    description:
      'Pivo Požárník 10 je osvěžující, poctivý desetistupňový ležák pro každou příležitost. Lehčí tělo, příjemná hořkost a čistá chuť bez zbytečných efektů – přesně takové pivo, které hasí žízeň a zachraňuje večer. Výborně padne k pikantním křídýlkům, hranolkům nebo kdykoliv, když je potřeba rychle a spolehlivě „uhasit".',
    stats: [
      { label: 'TYP', value: 'Světlé výčepní' },
      { label: 'ABV', value: '4.2%' },
      { label: 'STUPEŇ', value: '10°' },
    ],
    image: '/products/pivo/10/bottle.webp',
    icon: '/products/pivo/10/icon.svg',
    ingredients: '/products/pivo/10/etiq.webp',
  },
]

export const limosCs: Product[] = [
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

export const watersCs: Product[] = [
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

// English products
export const beersEn: Product[] = [
  {
    name: 'Šafář 15°',
    subtitle: 'Powerful fifteen-degree special with deep golden color',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'safar-15',
    url: 'https://eshop.stadioner.cz/products/safar-15-lahev',
    description:
      'Šafář 15 beer is a powerful fifteen-degree special with a deep golden color and creamy foam. It offers a full body, pronounced malty sweetness balanced by firm bitterness and a long finish. Ideal with pork knuckle, duck, hard cheeses, or for a proper sit-down when you want to treat yourself to something really strong.',
    stats: [
      { label: 'TYPE', value: 'Strong pale' },
      { label: 'ABV', value: '6.5%' },
      { label: 'DEGREE', value: '15°' },
    ],
    image: '/products/pivo/15/bottle.webp',
    icon: '/products/pivo/15/icon.svg',
    ingredients: '/products/pivo/15/etiq.webp',
  },
  {
    name: 'Professor 12°',
    subtitle: 'Classic unfiltered lager with full flavor',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'profesor-12',
    url: 'https://eshop.stadioner.cz/products/profesor-12-lahev',
    description:
      'Professor 12° is the perfect choice for those who seek an honest, uncompromising beer without unnecessary tweaks. Unfiltered, it preserves the natural taste and character of a true Czech lager. Perfect with grilled meats, cheeses, or just for a relaxed evening with friends.',
    stats: [
      { label: 'TYPE', value: 'Pale lager' },
      { label: 'ABV', value: '5.1%' },
      { label: 'DEGREE', value: '12°' },
      { label: 'FILTRATION', value: 'Unfiltered' },
    ],
    image: '/products/pivo/12/bottle.webp',
    icon: '/products/pivo/12/icon.svg',
    ingredients: '/products/pivo/12/etiq.webp',
  },
  {
    name: 'Experiment 11°',
    subtitle: 'Experimental eleven-degree lager with modern hopping',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'experiment-11',
    url: 'https://eshop.stadioner.cz/products/experiment-11-lahev',
    description:
      'An experimental 11° lager with modern hopping, available exclusively in kegs. Perfect for venues and events – best enjoyed fresh on tap. This beer offers a unique taste experience for those who appreciate authentic craft brewing.',
    stats: [
      { label: 'TYPE', value: 'Pale lager' },
      { label: 'ABV', value: '4.5%' },
      { label: 'DEGREE', value: '11°' },
    ],
    image: '/products/pivo/11/bottle.webp',
    icon: '/products/pivo/11/icon.svg',
    ingredients: '/products/pivo/11/etiq.webp',
  },
  {
    name: 'Požárník 10°',
    subtitle: 'Refreshing, honest ten-degree lager for any occasion',
    category: 'pivo',
    categoryLabel: 'Beer',
    slug: 'pozarnik-10',
    url: 'https://eshop.stadioner.cz/products/pozarnik-10-lahev',
    description:
      'Požárník 10 beer is a refreshing, honest ten-degree lager for any occasion. Lighter body, pleasant bitterness, and clean taste without unnecessary effects – exactly the kind of beer that quenches thirst and saves the evening. Perfect with spicy wings, fries, or whenever you need to quickly and reliably "put out the fire".',
    stats: [
      { label: 'TYPE', value: 'Light tap beer' },
      { label: 'ABV', value: '4.2%' },
      { label: 'DEGREE', value: '10°' },
    ],
    image: '/products/pivo/10/bottle.webp',
    icon: '/products/pivo/10/icon.svg',
    ingredients: '/products/pivo/10/etiq.webp',
  },
]

export const limosEn: Product[] = [
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

export const watersEn: Product[] = [
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

// German products
export const beersDe: Product[] = [
  {
    name: 'Šafář 15°',
    subtitle: 'Kräftiger Fünfzehn-Grad-Spezial mit tiefgoldener Farbe',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'safar-15',
    url: 'https://eshop.stadioner.cz/products/safar-15-lahev',
    description:
      'Šafář 15 Bier ist ein kräftiger Fünfzehn-Grad-Spezial mit tiefgoldener Farbe und cremiger Schaumkrone. Es bietet einen vollen Körper, ausgeprägte Malzsüße, ausgewogen durch feste Bittere und langen Abgang. Ideal zu Schweinshaxe, Ente, Hartkäse oder zum gemütlichen Beisammensein, wenn Sie sich etwas wirklich Starkes gönnen möchten.',
    stats: [
      { label: 'TYP', value: 'Starkes Helles' },
      { label: 'ABV', value: '6.5%' },
      { label: 'GRAD', value: '15°' },
    ],
    image: '/products/pivo/15/bottle.webp',
    icon: '/products/pivo/15/icon.svg',
    ingredients: '/products/pivo/15/etiq.webp',
  },
  {
    name: 'Professor 12°',
    subtitle: 'Klassisches ungefiltertes Lager mit vollem Geschmack',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'profesor-12',
    url: 'https://eshop.stadioner.cz/products/profesor-12-lahev',
    description:
      'Professor 12° ist die ideale Wahl für alle, die ein ehrliches, kompromissloses Bier ohne unnötige Zusätze suchen. Ungefiltert bewahrt es den natürlichen Geschmack und Charakter eines echten tschechischen Lagers. Perfekt zu Gegrilltem, Käse oder einfach zum gemütlichen Beisammensein.',
    stats: [
      { label: 'TYP', value: 'Helles Lager' },
      { label: 'ABV', value: '5.1%' },
      { label: 'GRAD', value: '12°' },
      { label: 'FILTRATION', value: 'Ungefiltert' },
    ],
    image: '/products/pivo/12/bottle.webp',
    icon: '/products/pivo/12/icon.svg',
    ingredients: '/products/pivo/12/etiq.webp',
  },
  {
    name: 'Experiment 11°',
    subtitle: 'Experimentelles Elfer-Lager mit modernem Hopfen',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'experiment-11',
    url: 'https://eshop.stadioner.cz/products/experiment-11-lahev',
    description:
      'Experimentelles 11° Lager mit modernem Hopfen, ausschließlich in Fässern erhältlich. Ideal für Gastronomie und Events – frisch vom Fass am besten. Dieses Bier bietet ein einzigartiges Geschmackserlebnis für alle, die authentisches Handwerksbrauen schätzen.',
    stats: [
      { label: 'TYP', value: 'Helles Lager' },
      { label: 'ABV', value: '4.5%' },
      { label: 'GRAD', value: '11°' },
    ],
    image: '/products/pivo/11/bottle.webp',
    icon: '/products/pivo/11/icon.svg',
    ingredients: '/products/pivo/11/etiq.webp',
  },
  {
    name: 'Požárník 10°',
    subtitle: 'Erfrischendes, ehrliches Zehn-Grad-Lager für jeden Anlass',
    category: 'pivo',
    categoryLabel: 'Bier',
    slug: 'pozarnik-10',
    url: 'https://eshop.stadioner.cz/products/pozarnik-10-lahev',
    description:
      'Požárník 10 Bier ist ein erfrischendes, ehrliches Zehn-Grad-Lager für jeden Anlass. Leichterer Körper, angenehme Bittere und sauberer Geschmack ohne unnötige Effekte – genau das Bier, das den Durst löscht und den Abend rettet. Perfekt zu pikanten Flügeln, Pommes oder wann immer man schnell und zuverlässig "löschen" muss.',
    stats: [
      { label: 'TYP', value: 'Helles Schankbier' },
      { label: 'ABV', value: '4.2%' },
      { label: 'GRAD', value: '10°' },
    ],
    image: '/products/pivo/10/bottle.webp',
    icon: '/products/pivo/10/icon.svg',
    ingredients: '/products/pivo/10/etiq.webp',
  },
]

export const limosDe: Product[] = [
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

export const watersDe: Product[] = [
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

// Product maps by language
export const getProductMap = (lang: Language) => {
  if (lang === 'en') {
    return { pivo: beersEn, limo: limosEn, voda: watersEn }
  }
  if (lang === 'de') {
    return { pivo: beersDe, limo: limosDe, voda: watersDe }
  }
  return { pivo: beersCs, limo: limosCs, voda: watersCs }
}
