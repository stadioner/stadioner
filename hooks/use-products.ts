import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  PACKAGING_KEYS,
  type Product,
  type PackagingKey,
  type PackagingAvailability,
  type Language
} from '@/types/products'
import { getProductMap } from '@/lib/products/data'
import { deriveVariantUrls, checkImageAvailability } from '@/lib/products/utils'

type CategoryKey = 'pivo' | 'limo' | 'voda'

const availabilityFromPackaging = (
  packaging: PackagingKey[]
): PackagingAvailability => ({
  bottle: packaging.includes('bottle'),
  crate: packaging.includes('crate'),
  barrel20: packaging.includes('barrel20'),
  barrel30: packaging.includes('barrel30'),
  barrel50: packaging.includes('barrel50')
})

export const useProducts = (activeLang: Language) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearchParams = searchParams ?? new URLSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('pivo')
  const [current, setCurrent] = useState(0)
  const [availabilityBySlug, setAvailabilityBySlug] = useState<
    Record<string, PackagingAvailability>
  >({})
  const [selectedPackagingBySlug, setSelectedPackagingBySlug] = useState<
    Record<string, PackagingKey>
  >({})

  const productMap = useMemo(() => getProductMap(activeLang), [activeLang])
  const filteredProducts = productMap[selectedCategory] || []

  useEffect(() => {
    const productSlug = currentSearchParams.get('produkt')
    const categoryParam = currentSearchParams.get(
      'kategorie'
    ) as CategoryKey | null

    if (categoryParam && categoryParam in productMap) {
      setSelectedCategory(categoryParam)
    }

    let idx = 0
    if (productSlug) {
      const targetCategory = (categoryParam || selectedCategory) as CategoryKey
      const foundIdx = (productMap[targetCategory] || []).findIndex(
        (p: Product) => p.slug === productSlug
      )
      if (foundIdx !== -1) {
        idx = foundIdx
      }
    }
    setCurrent(idx)
  }, [currentSearchParams, productMap, selectedCategory])

  const updateURL = (productIndex: number, category?: CategoryKey) => {
    const targetCategory = (category || selectedCategory) as CategoryKey
    const targetFilteredProducts = productMap[targetCategory] || []
    const safeIndex = Math.max(
      0,
      Math.min(productIndex, targetFilteredProducts.length - 1)
    )
    const product = targetFilteredProducts[safeIndex]
    if (!product) return
    const params = new URLSearchParams(currentSearchParams.toString())
    params.set('produkt', product.slug)
    params.set('kategorie', targetCategory)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCategoryChange = (category: CategoryKey) => {
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

  const productVariantUrls = useMemo(() => {
    if (!product) return null
    const sharedKegImages =
      product.packaging?.some((key) => key.startsWith('barrel')) ?? false
    return deriveVariantUrls(product.image, product.category, sharedKegImages)
  }, [product])

  useEffect(() => {
    if (!product || !productVariantUrls) return

    const slug = product.slug
    if (availabilityBySlug[slug]) return

    if (product.packaging) {
      const nextAvailability = availabilityFromPackaging(product.packaging)
      setAvailabilityBySlug((prev) => ({ ...prev, [slug]: nextAvailability }))
      const defaultKey = product.packaging[0]
      if (defaultKey) {
        setSelectedPackagingBySlug((prev) => ({ ...prev, [slug]: defaultKey }))
      }
      return
    }

    const urls = PACKAGING_KEYS.map((k) => productVariantUrls[k])

    Promise.all(urls.map(checkImageAvailability)).then((results) => {
      const nextAvailability: PackagingAvailability = {
        bottle: results[0],
        crate: results[1],
        barrel20: results[2],
        barrel30: results[3],
        barrel50: results[4]
      }
      setAvailabilityBySlug((prev) => ({ ...prev, [slug]: nextAvailability }))
      const defaultKey = PACKAGING_KEYS.find((key) => nextAvailability[key])
      if (defaultKey) {
        setSelectedPackagingBySlug((prev) => ({ ...prev, [slug]: defaultKey }))
      }
    })
  }, [product, productVariantUrls, availabilityBySlug])

  return {
    productMap,
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
    handleSelect
  }
}
