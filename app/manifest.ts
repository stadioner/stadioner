import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stadioner - Pivovar Kout na Šumavě',
    short_name: 'Stadioner',
    description:
      'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    start_url: '/cs',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B4513',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  }
}
