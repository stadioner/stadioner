'use client'

import { Border } from '@/components/border'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Beer,
  ShoppingCart,
  Calendar,
  FileText,
  Globe,
  ArrowRight,
  Milk,
  GlassWater,
} from 'lucide-react'
import Link from 'next/link'

interface LinkItem {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  external?: boolean
  category: 'social' | 'business' | 'products' | 'info' | 'legal'
}

export default function RozcestnikPage() {
  const { language } = useLanguage()

  const links: Record<string, LinkItem[]> = {
    cs: [
      // Sociální sítě
      {
        title: 'Facebook',
        description:
          'Sledujte nás na Facebooku pro nejnovější zprávy a události',
        href: 'https://www.facebook.com/stadioner.cz',
        icon: <Facebook size={24} />,
        external: true,
        category: 'social',
      },
      {
        title: 'Instagram',
        description: 'Prohlédněte si naše fotky a příběhy z pivovaru',
        href: 'https://www.instagram.com/stadioner.cz/',
        icon: <Instagram size={24} />,
        external: true,
        category: 'social',
      },

      // Obchodní informace
      {
        title: 'Kontakt',
        description: 'Kontaktujte nás pro objednávky a dotazy',
        href: '/kontakt',
        icon: <Phone size={24} />,
        category: 'business',
      },
      {
        title: 'E-mail',
        description: 'Napište nám na info@stadioner.cz',
        href: 'mailto:info@stadioner.cz',
        icon: <Mail size={24} />,
        external: true,
        category: 'business',
      },
      {
        title: 'Prodejní místa',
        description: 'Kde najdete naše produkty v Plzeňském kraji',
        href: '/prodejni-mista',
        icon: <MapPin size={24} />,
        category: 'business',
      },
      // Produkty
      {
        title: 'Pivo',
        description: 'Naše nefiltrované ležáky a speciály.',
        href: '/produkty?produkt=profesor-dvanactka&kategorie=pivo',
        icon: <Beer size={24} />,
        category: 'products',
      },
      {
        title: 'Limonády',
        description: 'Osvěžující limonády z pramenité vody.',
        href: '/produkty?produkt=limonada-citron&kategorie=limo',
        icon: <Milk size={24} />,
        category: 'products',
      },
      {
        title: 'Voda',
        description: 'Pramenitá voda sycená i nesycená.',
        href: '/produkty?produkt=pramenita-voda-sycena&kategorie=voda',
        icon: <GlassWater size={24} />,
        category: 'products',
      },
      // Informace
      {
        title: 'Historie',
        description: 'Tradice pivovaru od roku 1736',
        href: '/historie',
        icon: <Calendar size={24} />,
        category: 'info',
      },
      {
        title: 'Blog',
        description: 'Články o pivovaru, receptech a událostech',
        href: '/clanky/cs',
        icon: <FileText size={24} />,
        category: 'info',
      },
      {
        title: 'GDPR',
        description: 'Zásady zpracování osobních údajů',
        href: '/gdpr',
        icon: <Globe size={24} />,
        category: 'info',
      },
    ],
    en: [
      // Social Media
      {
        title: 'Facebook',
        description: 'Follow us on Facebook for the latest news and events',
        href: 'https://www.facebook.com/stadioner.cz',
        icon: <Facebook size={24} />,
        external: true,
        category: 'social',
      },
      {
        title: 'Instagram',
        description: 'Check out our photos and stories from the brewery',
        href: 'https://www.instagram.com/stadioner.cz/',
        icon: <Instagram size={24} />,
        external: true,
        category: 'social',
      },

      // Business Information
      {
        title: 'Contact',
        description: 'Contact us for orders and inquiries',
        href: '/kontakt',
        icon: <Phone size={24} />,
        category: 'business',
      },
      {
        title: 'E-mail',
        description: 'Write to us at info@stadioner.cz',
        href: 'mailto:info@stadioner.cz',
        icon: <Mail size={24} />,
        external: true,
        category: 'business',
      },
      {
        title: 'Sales Points',
        description: 'Where to find our products in the Plzeň Region',
        href: '/prodejni-mista',
        icon: <MapPin size={24} />,
        category: 'business',
      },
      // Products
      {
        title: 'Beers',
        description: 'Our unfiltered lagers and specials.',
        href: '/produkty?produkt=profesor-dvanactka&kategorie=pivo',
        icon: <Beer size={24} />,
        category: 'products',
      },
      {
        title: 'Lemonades',
        description: 'Refreshing lemonades from spring water.',
        href: '/produkty?produkt=limonada-citron&kategorie=limo',
        icon: <Milk size={24} />,
        category: 'products',
      },
      {
        title: 'Water',
        description: 'Spring water, sparkling and still.',
        href: '/produkty?produkt=pramenita-voda-sycena&kategorie=voda',
        icon: <GlassWater size={24} />,
        category: 'products',
      },
      // Information
      {
        title: 'History',
        description: 'Brewery tradition since 1736',
        href: '/historie',
        icon: <Calendar size={24} />,
        category: 'info',
      },
      {
        title: 'Blog',
        description: 'Articles about the brewery, recipes and events',
        href: '/clanky/en',
        icon: <FileText size={24} />,
        category: 'info',
      },
      {
        title: 'GDPR & Privacy',
        description: 'Personal data processing policy',
        href: '/gdpr',
        icon: <Globe size={24} />,
        category: 'info',
      },
    ],
    de: [
      // Soziale Medien
      {
        title: 'Facebook',
        description:
          'Folgen Sie uns auf Facebook für die neuesten Nachrichten und Veranstaltungen',
        href: 'https://www.facebook.com/stadioner.cz',
        icon: <Facebook size={24} />,
        external: true,
        category: 'social',
      },
      {
        title: 'Instagram',
        description:
          'Schauen Sie sich unsere Fotos und Geschichten aus der Brauerei an',
        href: 'https://www.instagram.com/stadioner.cz/',
        icon: <Instagram size={24} />,
        external: true,
        category: 'social',
      },

      // Geschäftsinformationen
      {
        title: 'Kontakt',
        description: 'Kontaktieren Sie uns für Bestellungen und Anfragen',
        href: '/kontakt/de',
        icon: <Phone size={24} />,
        category: 'business',
      },
      {
        title: 'E-Mail',
        description: 'Schreiben Sie uns an info@stadioner.cz',
        href: 'mailto:info@stadioner.cz',
        icon: <Mail size={24} />,
        external: true,
        category: 'business',
      },
      {
        title: 'Verkaufsstellen',
        description: 'Wo Sie unsere Produkte in der Region Pilsen finden',
        href: '/prodejni-mista',
        icon: <MapPin size={24} />,
        category: 'business',
      },
      // Produkte
      {
        title: 'Bier',
        description: 'Unsere ungefilterten Lager und Spezialitäten.',
        href: '/produkty?produkt=profesor-dvanactka&kategorie=pivo',
        icon: <Beer size={24} />,
        category: 'products',
      },
      {
        title: 'Limonaden',
        description: 'Erfrischende Limonaden aus Quellwasser.',
        href: '/produkty?produkt=limonada-citron&kategorie=limo',
        icon: <Milk size={24} />,
        category: 'products',
      },
      {
        title: 'Wasser',
        description: 'Quellwasser, mit und ohne Kohlensäure.',
        href: '/produkty?produkt=pramenita-voda-sycena&kategorie=voda',
        icon: <GlassWater size={24} />,
        category: 'products',
      },
      // Informationen
      {
        title: 'Geschichte',
        description: 'Brauereitradition seit 1736',
        href: '/historie',
        icon: <Calendar size={24} />,
        category: 'info',
      },
      {
        title: 'Blog',
        description: 'Artikel über die Brauerei, Rezepte und Veranstaltungen',
        href: '/clanky',
        icon: <FileText size={24} />,
        category: 'info',
      },
      {
        title: 'GDPR & Datenschutz',
        description: 'Richtlinien zur Verarbeitung personenbezogener Daten',
        href: '/gdpr',
        icon: <Globe size={24} />,
        category: 'info',
      },
    ],
  }

  const currentLinks = links[language] || links.cs

  const getCategoryTitle = (category: string) => {
    const titles = {
      cs: {
        social: 'Sociální sítě',
        business: 'Obchodní informace',
        products: 'Produkty',
        info: 'Informace',
        legal: 'Právní informace',
      },
      en: {
        social: 'Social Media',
        business: 'Business Information',
        products: 'Products',
        info: 'Information',
        legal: 'Legal Information',
      },
      de: {
        social: 'Soziale Medien',
        business: 'Geschäftsinformationen',
        products: 'Produkte',
        info: 'Informationen',
        legal: 'Rechtliche Informationen',
      },
    }
    return (
      titles[language as keyof typeof titles]?.[
        category as keyof typeof titles.cs
      ] || category
    )
  }

  const categories = ['social', 'business', 'products', 'info'] as const

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20 min-h-screen'>
      <Container>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold text-brand-action mb-6'>
            {language === 'cs' && 'Rozcestník'}
            {language === 'en' && 'Directory'}
            {language === 'de' && 'Verzeichnis'}
          </h1>
          <p className='text-lg md:text-xl text-brand-action/80 max-w-2xl mx-auto'>
            {language === 'cs' && 'Všechny důležité odkazy na jednom místě'}
            {language === 'en' && 'All important links in one place'}
            {language === 'de' && 'Alle wichtigen Links an einem Ort'}
          </p>
        </div>

        <div className='space-y-12'>
          {categories.map(category => {
            const categoryLinks = currentLinks.filter(
              link => link.category === category
            )
            if (categoryLinks.length === 0) return null

            return (
              <section key={category} className='space-y-6'>
                <h2 className='text-2xl md:text-3xl font-bold text-brand-action border-b-2 border-brand-action/20 pb-2'>
                  {getCategoryTitle(category)}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr'>
                  {categoryLinks.map((link, index) => (
                    <div key={index} className='h-full min-h-0'>
                      <Border className='h-full'>
                        <div className='p-6 h-full flex flex-col group hover:bg-brand-secondary/20 transition-colors min-h-0'>
                          <div className='flex items-start gap-4 mb-4 flex-1'>
                            <div className='p-2 rounded-lg bg-brand-action text-brand-primary flex-shrink-0'>
                              {link.icon}
                            </div>
                            <div className='flex-1 min-w-0 flex flex-col'>
                              <h3 className='text-lg font-semibold text-brand-action mb-2'>
                                {link.title}
                              </h3>
                              <p className='text-sm text-brand-action/70 leading-relaxed flex-1'>
                                {link.description}
                              </p>
                            </div>
                          </div>

                          <div className='mt-4'>
                            <Button
                              asChild
                              variant='green'
                              className='w-full group-hover:scale-[1.02] transition-transform'
                            >
                              <Link
                                href={link.href}
                                target={link.external ? '_blank' : undefined}
                                rel={
                                  link.external
                                    ? 'noopener noreferrer'
                                    : undefined
                                }
                                className='flex items-center justify-center gap-2'
                              >
                                {language === 'cs' && 'Přejít'}
                                {language === 'en' && 'Go to'}
                                {language === 'de' && 'Gehen zu'}
                                {link.external && <ExternalLink size={16} />}
                                {!link.external && <ArrowRight size={16} />}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Border>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Quick Contact Section */}
        <section className='mt-16 pt-12 border-t border-brand-action/20'>
          <div className='text-center'>
            <h2 className='text-2xl md:text-3xl font-bold text-brand-action mb-4'>
              {language === 'cs' && 'Rychlý kontakt'}
              {language === 'en' && 'Quick Contact'}
              {language === 'de' && 'Schneller Kontakt'}
            </h2>
            <p className='text-brand-action/70 mb-8 max-w-2xl mx-auto'>
              {language === 'cs' &&
                'Potřebujete něco konkrétního? Kontaktujte nás přímo.'}
              {language === 'en' &&
                'Need something specific? Contact us directly.'}
              {language === 'de' &&
                'Brauchen Sie etwas Spezifisches? Kontaktieren Sie uns direkt.'}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button asChild variant='secondary' size='lg'>
                <Link
                  href='mailto:info@stadioner.cz'
                  className='flex items-center gap-2'
                >
                  <Mail size={20} />
                  info@stadioner.cz
                </Link>
              </Button>
              <Button asChild variant='green' size='lg'>
                <Link
                  href='tel:+420601535416'
                  className='flex items-center gap-2'
                >
                  <Phone size={20} />
                  +420 601 535 416
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}
