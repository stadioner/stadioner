'use client'

import { useMemo } from 'react'
import { useLanguage } from '@/store/use-language'
import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { cn } from '@/lib/utils'
import { categories, uiLabels } from '@/lib/products/constants'

import { useProducts } from '@/hooks/use-products'
import { CategorySelector } from './category-selector'
import { ProductNavigation } from './product-navigation'
import { PackagingSelector } from './packaging-selector'
import { ProductImage } from './product-image'
import { ProductInfo } from './product-info'
import type { PackagingKey, PackagingOption } from '@/types/products'
import { KegNewsDialog } from '@/components/products/keg-news-dialog'

export const Products = ({
  rippedPaper,
  hScreen,
  b2bMode = false,
  b2bNote,
  b2bCtaLabel,
  b2bCtaHref,
}: {
  rippedPaper?: boolean
  hScreen?: boolean
  b2bMode?: boolean
  b2bNote?: string
  b2bCtaLabel?: string
  b2bCtaHref?: string
}) => {
  const { language } = useLanguage()
  const activeLang = language === 'en' || language === 'de' ? language : 'cs'

  const {
    selectedCategory,
    current,
    filteredProducts,
    product,
    productVariantUrls,
    availabilityBySlug,
    selectedPackagingBySlug,
    setSelectedPackagingBySlug,
    handleCategoryChange,
    handlePrev,
    handleNext,
    handleSelect,
  } = useProducts(activeLang)

  const categoriesList = categories[activeLang]
  const labels = uiLabels[activeLang]

  const packagingOptions: PackagingOption[] = useMemo(
    () => {
      if (!product || !productVariantUrls) {
        return []
      }

      const availability = availabilityBySlug[product.slug]

      return (
        [
          {
            key: 'bottle' as PackagingKey,
            label: labels.bottle,
            url: productVariantUrls.bottle,
          },
          {
            key: 'crate' as PackagingKey,
            label: labels.crate,
            url: productVariantUrls.crate,
          },
          {
            key: 'barrel30' as PackagingKey,
            label: labels.barrel30,
            url: productVariantUrls.barrel30,
          },
          {
            key: 'barrel50' as PackagingKey,
            label: labels.barrel50,
            url: productVariantUrls.barrel50,
          },
        ] as const
      ).map(opt => ({
        ...opt,
        available: availability ? availability[opt.key] : opt.key === 'bottle',
      }))
    },
    [product, productVariantUrls, labels, availabilityBySlug],
  )

  if (!product || !productVariantUrls) {
    return null
  }

  const selectedPackaging: PackagingKey =
    selectedPackagingBySlug[product.slug] || 'bottle'

  const displayedImage =
    packagingOptions.find(o => o.key === selectedPackaging)?.url ||
    product.image
  const selectedPackagingLabel =
    packagingOptions.find(o => o.key === selectedPackaging)?.label ||
    labels.packaging

  const buyUrl = product.url

  // Products that are being prepared (not available for purchase)
  const preparingProducts = ['experiment-11']
  const isPreparing =
    preparingProducts.includes(product.slug) ||
    (product.slug === 'pozarnik-10' &&
      (selectedPackaging === 'bottle' || selectedPackaging === 'crate'))

  const handlePackagingChange = (key: PackagingKey) => {
    setSelectedPackagingBySlug(prev => ({
      ...prev,
      [product.slug]: key,
    }))
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
          <CategorySelector
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <ProductNavigation
            products={filteredProducts}
            current={current}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
          />

          <PackagingSelector
            options={packagingOptions}
            selectedPackaging={selectedPackaging}
            selectedPackagingLabel={selectedPackagingLabel}
            onPackagingChange={handlePackagingChange}
          />

          {!b2bMode && <KegNewsDialog />}

          <div className='flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-4 sm:gap-8 items-stretch mt-4 sm:mt-6 md:mt-12'>
            <div className='flex-1 md:hidden flex items-center justify-center relative'>
              <ProductImage
                src={displayedImage}
                alt={product.name}
                productSlug={product.slug}
                className='max-h-[200px] sm:max-h-[300px] drop-shadow-2xl animate-bottle relative z-10'
                shadowClassName='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-8 bg-black/80 rounded-full blur-lg animate-bottle-shadow'
              />
            </div>

            <ProductInfo
              product={product}
              buyUrl={buyUrl}
              isPreparing={isPreparing}
              hideBuyButton={b2bMode}
              noteText={b2bMode ? b2bNote : undefined}
              cta={
                b2bMode && b2bCtaLabel && b2bCtaHref
                  ? {
                      label: b2bCtaLabel,
                      href: b2bCtaHref,
                      external: b2bCtaHref.startsWith('http'),
                    }
                  : undefined
              }
              labels={{
                composition: labels.composition,
                compositionTitle: labels.compositionTitle,
                depositNote: labels.depositNote,
                buy: labels.buy,
                preparing: labels.preparing,
              }}
            />

            <div className='flex-1 hidden md:flex items-center justify-center relative'>
              <ProductImage
                src={displayedImage}
                alt={product.name}
                productSlug={product.slug}
              />
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
