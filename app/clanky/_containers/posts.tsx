'use client'

import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Post, Category, SupportedLanguage } from '@/types/blog'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface PostsProps {
  posts: Post[]
  categories: Category[]
  language: SupportedLanguage
}

const translations = {
  cs: {
    searchPlaceholder: 'Hledat články...',
    noPostsFound: 'Nebyly nalezeny žádné články.',
    tryAdjusting: 'Zkuste upravit filtrování nebo hledání.',
  },
  en: {
    searchPlaceholder: 'Search articles...',
    noPostsFound: 'No articles found.',
    tryAdjusting: 'Try adjusting filters or search.',
  },
  de: {
    searchPlaceholder: 'Artikel suchen...',
    noPostsFound: 'Keine Artikel gefunden.',
    tryAdjusting: 'Versuchen Sie, Filter oder Suche anzupassen.',
  },
}

export const Posts = ({ posts, categories, language }: PostsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const t = translations[language]

  // Filtrování podle kategorií
  let filteredPosts =
    selectedCategories.length === 0
      ? posts
      : posts.filter(post =>
          post.categories.some(cat => selectedCategories.includes(cat._id))
        )

  // Filtrování podle search baru (title a excerpt)
  if (search.trim() !== '') {
    filteredPosts = filteredPosts.filter(
      post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.excerpt &&
          post.excerpt.toLowerCase().includes(search.toLowerCase()))
    )
  }

  // Přepínání kategorií
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    )
  }

  return (
    <>
      {/* Kategorie filtr */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {categories.length > 0 ? (
          categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => toggleCategory(cat._id)}
              className={`px-4 py-2 border text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  selectedCategories.includes(cat._id)
                    ? 'bg-brand-action text-brand-primary border-brand-action shadow-lg'
                    : 'text-brand-action border-brand-action hover:bg-brand-action/10'
                }`}
              style={cat.color ? { borderColor: cat.color } : {}}
            >
              {cat.title}
            </button>
          ))
        ) : (
          <p className='text-gray-500 text-sm'>
            {language === 'cs'
              ? 'Žádné kategorie nejsou k dispozici'
              : language === 'en'
                ? 'No categories available'
                : 'Keine Kategorien verfügbar'}
          </p>
        )}
      </div>

      <div className='mb-12 relative'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-brand-action pointer-events-none'>
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
          onChange={e => setSearch(e.target.value)}
          className='pl-10 pr-4 py-2 border border-brand-action text-lg placeholder:text-brand-action focus-within:border-brand-action focus-within:outline-brand-action w-full'
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className='py-20'>
          <h3 className='text-center text-brand-action text-5xl font-bold'>
            {t.noPostsFound}
          </h3>
          <p className='text-xl text-center'>{t.tryAdjusting}</p>
        </div>
      ) : (
        <section className='grid md:grid-cols-3 gap-10'>
          {filteredPosts.map((post: Post) => (
            <Link
              href={`/clanky/${language}/${post.slug.current}`}
              key={post._id}
            >
              <Border>
                <div className='aspect-square overflow-hidden relative'>
                  <img
                    src={urlFor(post.mainImage)}
                    alt={post.mainImage.alt || post.title}
                    className='absolute inset-0 object-cover hover:scale-[102%] transition aspect-square overflow-hidden'
                  />

                  <div className='flex gap-2 absolute right-0 top-0 bg-brand-action p-2 text-brand-primary'>
                    <img
                      src={urlFor(post.author.image)}
                      alt={post.author.name}
                      className='rounded-full size-6'
                    />
                    <p>{post.author.name}</p>
                  </div>

                  <div className='absolute left-0 bottom-0 flex flex-col gap-1'>
                    {post.categories.map((category, index) => (
                      <p
                        key={category._id || `category-${index}`}
                        className='text-sm bg-brand-action p-1 text-brand-primary'
                        style={
                          category.color
                            ? { backgroundColor: category.color }
                            : {}
                        }
                      >
                        {category.title}
                      </p>
                    ))}
                  </div>
                </div>
              </Border>
              <h3 className='text-brand-action text-3xl mt-3 font-bold'>
                {post.title}
              </h3>
            </Link>
          ))}
        </section>
      )}
    </>
  )
}
