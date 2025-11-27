import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Product, PackagingKey, PackagingAvailability, Language } from '@/types/products'
import { getProductMap } from '@/lib/products/data'
import { deriveVariantUrls, checkImageAvailability } from '@/lib/products/utils'

export const useProducts = (activeLang: Language) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('pivo')
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

  const productVariantUrls = useMemo(
    () => product ? deriveVariantUrls(product.image, product.category) : null,
    [product?.image, product?.category]
  )

  useEffect(() => {
    if (!product || !productVariantUrls) return
    
    const slug = product.slug
    if (availabilityBySlug[slug]) return

    const keys: PackagingKey[] = ['bottle', 'crate', 'barrel30', 'barrel50']
    const urls = keys.map(k => productVariantUrls[k])

    Promise.all(urls.map(checkImageAvailability)).then(results => {
      const nextAvailability: PackagingAvailability = {
        bottle: results[0],
        crate: results[1],
        barrel30: results[2],
        barrel50: results[3],
      }
      setAvailabilityBySlug(prev => ({ ...prev, [slug]: nextAvailability }))
      const defaultKey = keys.find(key => nextAvailability[key]) as PackagingKey | undefined
      if (defaultKey) {
        setSelectedPackagingBySlug(prev => ({ ...prev, [slug]: defaultKey }))
      }
    })
  }, [product?.slug, productVariantUrls, availabilityBySlug])

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
    handleSelect,
  }
}

