import { Products } from '@/components/products'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { beersCs, limosCs, watersCs } from '@/lib/products/data'
import { buildProductSchema, jsonLdToHtml } from '@/lib/seo/schema'
import { toAbsoluteUrl } from '@/lib/seo/site'

export const metadata: Metadata = buildPageMetadata({
  title: 'Naše produkty - Piva, limonády a voda',
  description:
    'Objevte naše řemeslné piva, osvěžující limonády a čistou vodu ze šumavských pramenů. Kvalita a tradice v každém doušku.',
  canonicalPath: '/cs/produkty',
  keywords: [
    'produkty',
    'pivo',
    'limonády',
    'voda',
    'Stadioner',
    'řemeslné pivo',
    'Šumava',
  ],
  twitterCard: 'summary_large_image',
})

export default function ProduktyPage() {
  const products = [...beersCs, ...limosCs, ...watersCs]
  const productSchemas = products.map(product =>
    buildProductSchema({
      name: product.name,
      description: product.description,
      sku: product.slug,
      language: 'cs',
      imageUrl: toAbsoluteUrl(product.image),
      productUrl: product.url,
      availability: 'InStock',
    }),
  )

  return (
    <>
      <main className='bg-brand-action pt-24 md:pt-32 pb-16'>
        <h1 className='sr-only'>Naše produkty Stadioner</h1>
        <Suspense
          fallback={<div className='bg-brand-action py-8'>Loading...</div>}
        >
          <Products hScreen />
        </Suspense>
      </main>
      {productSchemas.map((schema, index) => (
        <script
          key={`${products[index]?.slug ?? index}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={jsonLdToHtml(schema)}
        />
      ))}
    </>
  )
}
