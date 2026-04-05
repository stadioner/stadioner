'use client'

import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Post, Category, SupportedLanguage } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface PostsProps {
  posts: Post[]
  categories: Category[]
  language: SupportedLanguage
}

const translations = {
  cs: {
    searchPlaceholder: 'Hledat články...',
    noPostsFound: 'Nebyly nalezeny žádné články.',
    tryAdjusting: 'Zkuste upravit filtrování nebo hledání.'
  },
  en: {
    searchPlaceholder: 'Search articles...',
    noPostsFound: 'No articles found.',
    tryAdjusting: 'Try adjusting filters or search.'
  },
  de: {
    searchPlaceholder: 'Artikel suchen...',
    noPostsFound: 'Keine Artikel gefunden.',
    tryAdjusting: 'Versuchen Sie, Filter oder Suche anzupassen.'
  }
}

export const Posts = ({ posts, categories, language }: PostsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const t = translations[language]

  // Helper function to check if a category has posts
  const getCategoryPostCount = (categoryId: string) => {
    return posts.filter((post) =>
      post.categories.some((cat) => cat._id === categoryId)
    ).length
  }

  // Filtrování podle kategorií
  let filteredPosts =
    selectedCategories.length === 0 ?
      posts
    : posts.filter((post) =>
        post.categories.some((cat) => selectedCategories.includes(cat._id))
      )

  // Filtrování podle search baru (title a excerpt)
  if (search.trim() !== '') {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.excerpt &&
          post.excerpt.toLowerCase().includes(search.toLowerCase()))
    )
  }

  // Přepínání kategorií
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    )
  }

  return (
    <>
      {/* Kategorie filtr */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {categories.length > 0 ?
          categories.map((cat) => {
            const postCount = getCategoryPostCount(cat._id)
            return (
              <button
                key={cat._id}
                onClick={() => toggleCategory(cat._id)}
                className={`flex cursor-pointer items-center gap-2 border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(cat._id) ?
                    'bg-brand-action text-brand-primary border-brand-action shadow-lg'
                  : 'text-brand-action border-brand-action hover:bg-brand-action/10'
                }`}
                title={
                  postCount === 0 ?
                    'No posts in this category'
                  : `${postCount} post${postCount !== 1 ? 's' : ''}`
                }
              >
                <span>{cat.title}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    postCount === 0 ? 'bg-gray-300 text-gray-600'
                    : selectedCategories.includes(cat._id) ?
                      'bg-brand-primary/20 text-brand-primary'
                    : 'bg-brand-action/20 text-brand-action'
                  }`}
                >
                  {postCount}
                </span>
              </button>
            )
          })
        : <p className='text-sm text-gray-500'>
            {language === 'cs' ?
              'Žádné kategorie nejsou k dispozici'
            : language === 'en' ?
              'No categories available'
            : 'Keine Kategorien verfügbar'}
          </p>
        }
      </div>

      <div className='relative mb-12'>
        <span className='text-brand-action pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
          <svg
            width='20'
            height='20'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z'
            />
          </svg>
        </span>
        <input
          type='text'
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border-brand-action placeholder:text-brand-action focus-within:border-brand-action focus-within:outline-brand-action w-full border py-2 pr-4 pl-10 text-lg'
        />
      </div>

      {filteredPosts.length === 0 ?
        <div className='py-20'>
          <h3 className='text-brand-action text-center text-5xl font-bold'>
            {t.noPostsFound}
          </h3>
          <p className='text-center text-xl'>{t.tryAdjusting}</p>
        </div>
      : <section className='grid gap-10 md:grid-cols-3'>
          {filteredPosts.map((post: Post) => (
            <Link
              href={`/clanky/${language}/${post.slug.current}`}
              key={post._id}
            >
              <Border>
                <div className='relative aspect-square overflow-hidden'>
                  <Image
                    src={urlFor(post.mainImage)}
                    alt={post.mainImage.alt || post.title}
                    fill
                    sizes='(min-width: 768px) 33vw, 100vw'
                    className='absolute inset-0 aspect-square overflow-hidden object-cover transition hover:scale-[102%]'
                  />

                  <div className='pointer-events-none absolute top-0 left-0 z-10 flex flex-col gap-1'>
                    {post.categories &&
                      post.categories.length > 0 &&
                      post.categories.map((category, index) => (
                        <p
                          key={category._id || `category-${index}`}
                          className='bg-brand-action text-brand-primary p-1 text-sm'
                        >
                          {category.title}
                        </p>
                      ))}
                  </div>
                </div>
              </Border>
              <h3 className='text-brand-action mt-3 text-3xl font-bold'>
                {post.title}
              </h3>
            </Link>
          ))}
        </section>
      }
    </>
  )
}
