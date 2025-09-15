'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/container'
import { Posts } from '../../_containers/posts'
import { BlogLoadingSpinner } from '@/components/blog-loading-spinner'
import { Post, Category, SupportedLanguage } from '@/types/blog'

interface BlogPageProps {
  posts: Post[]
  categories: Category[]
  language: SupportedLanguage
}

export const BlogPage = ({ posts, categories, language }: BlogPageProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(language)

  useEffect(() => {
    if (language !== currentLanguage) {
      setIsLoading(true)
      setCurrentLanguage(language)
      
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [language, currentLanguage])

  if (isLoading) {
    return <BlogLoadingSpinner />
  }

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-28'>
      <Container>
        <Posts posts={posts} categories={categories} language={language} />
      </Container>
    </main>
  )
}
