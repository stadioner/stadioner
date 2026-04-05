import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const languageOrder = ['cs', 'en', 'de'] as const

const hasLocalizedValue = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const localizedValue = value as { cs?: unknown; en?: unknown; de?: unknown }
  return Boolean(localizedValue.cs || localizedValue.en || localizedValue.de)
}

export const unifiedPostType = defineType({
  name: 'unifiedPost',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'shared', title: 'Shared' },
    { name: 'cs', title: '🇨🇿 Čeština' },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'de', title: '🇩🇪 Deutsch' }
  ],
  fields: [
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      group: 'shared',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      group: 'shared',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'unifiedCategory' }, { type: 'category' }]
        })
      ]
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      group: 'shared'
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
      group: 'shared'
    }),
    defineField({
      name: 'title',
      type: 'localizedString',
      title: 'Titles',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (hasLocalizedValue(value)) {
            return true
          }

          return 'At least one localized title is required.'
        }),
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      title: 'Slugs',
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'body',
      type: 'localizedBlockContent',
      title: 'Content',
      group: ['cs', 'en', 'de']
    })
  ],
  preview: {
    select: {
      titleCs: 'title.cs',
      titleEn: 'title.en',
      titleDe: 'title.de',
      slugCs: 'slug.cs.current',
      slugEn: 'slug.en.current',
      slugDe: 'slug.de.current',
      publishedAt: 'publishedAt',
      media: 'mainImage'
    },
    prepare(selection) {
      const title =
        selection.titleCs ||
        selection.titleEn ||
        selection.titleDe ||
        'Untitled post'
      const filledLanguages = languageOrder
        .filter((lang) => {
          const slug =
            lang === 'cs' ? selection.slugCs
            : lang === 'en' ? selection.slugEn
            : selection.slugDe

          return typeof slug === 'string' && slug.length > 0
        })
        .map((lang) => lang.toUpperCase())
        .join(', ')
      const date =
        selection.publishedAt ?
          new Date(selection.publishedAt).toLocaleDateString()
        : 'Draft'

      return {
        title,
        subtitle: `${date}${filledLanguages ? ` • ${filledLanguages}` : ''}`,
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    }
  ]
})
