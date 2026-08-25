import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/produkty',
        destination: '/cs/produkty',
        permanent: true
      },
      {
        source: '/kontakt',
        destination: '/cs/kontakt',
        permanent: true
      },
      {
        source: '/historie',
        destination: '/cs/historie',
        permanent: true
      },
      {
        source: '/prodejni-mista',
        destination: '/cs/prodejni-mista/sit-partneru',
        permanent: true
      },
      {
        source: '/prodejni-mista/sit-partneru',
        destination: '/cs/prodejni-mista/sit-partneru',
        permanent: true
      },
      {
        source: '/prodejni-mista/podnikova-prodejna',
        destination: '/cs/prodejni-mista/podnikova-prodejna',
        permanent: true
      },
      {
        source: '/prodejni-mista/vycep-na-salade',
        destination: '/cs/prodejni-mista/vycep-na-salade',
        permanent: true
      },
      {
        source: '/prodejni-mista/vydejni-misto',
        destination: '/cs/prodejni-mista/podnikova-prodejna',
        permanent: true
      },
      {
        source: '/:locale(cs|en|de)/prodejni-mista/vydejni-misto',
        destination: '/:locale/prodejni-mista/podnikova-prodejna',
        permanent: true
      },
      {
        source: '/pro-firmy',
        destination: '/cs/pro-firmy',
        permanent: true
      },
      {
        source: '/newsletter',
        destination: '/cs/newsletter',
        permanent: true
      },
      {
        source: '/rozcestnik',
        destination: '/cs/rozcestnik',
        permanent: true
      },
      {
        source: '/gdpr',
        destination: '/cs/gdpr',
        permanent: true
      },
      {
        source: '/cookies',
        destination: '/cs/cookies',
        permanent: true
      },
      {
        source: '/obchodni-podminky',
        destination: '/cs/obchodni-podminky',
        permanent: true
      },
      {
        source: '/clanky',
        destination: '/cs/clanky',
        permanent: true
      },
      {
        source: '/clanky/:lang(cs|en|de)',
        destination: '/:lang/clanky',
        permanent: true
      },
      {
        source: '/clanky/:lang(cs|en|de)/:slug*',
        destination: '/:lang/clanky/:slug*',
        permanent: true
      },
      {
        source: '/udalosti',
        destination: '/cs/udalosti',
        permanent: true
      },
      {
        source: '/udalosti/:lang(cs|en|de)',
        destination: '/:lang/udalosti',
        permanent: true
      },
      {
        source: '/udalosti/:lang(cs|en|de)/:slug*',
        destination: '/:lang/udalosti/:slug*',
        permanent: true
      }
    ]
  }
}

export default withNextIntl(nextConfig)
