import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  productSlug?: string
  className?: string
  shadowClassName?: string
}

export const ProductImage = ({
  src,
  alt,
  productSlug,
  className = 'max-h-[470px] drop-shadow-2xl animate-bottle relative z-10',
  shadowClassName = 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-14 bg-black/60 rounded-full blur-lg animate-bottle-shadow',
}: ProductImageProps) => {
  const prevProductSlugRef = useRef<string | undefined>(productSlug)
  const [isProductChange, setIsProductChange] = useState(false)

  useEffect(() => {
    const wasProductChange = prevProductSlugRef.current !== productSlug
    setIsProductChange(wasProductChange)
    prevProductSlugRef.current = productSlug
  }, [productSlug])

  // Use src as key so image updates on packaging change
  // But animate differently based on whether product changed
  const animationKey = src

  return (
    <div className='relative'>
      <AnimatePresence mode='wait' initial={false}>
        <motion.img
          key={animationKey}
          src={src}
          alt={alt}
          initial={isProductChange ? { opacity: 0, x: 40 } : { opacity: 0.9 }}
          animate={{ opacity: 1, x: 0 }}
          exit={isProductChange ? { opacity: 0, x: -40 } : { opacity: 0 }}
          transition={{
            duration: isProductChange ? 0.5 : 0.15,
            ease: 'easeInOut',
          }}
          className={className}
        />
      </AnimatePresence>
      <div className={shadowClassName} />
    </div>
  )
}
