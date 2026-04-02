import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const languageOrder = ['cs', 'en', 'de'] as const

const hasLocalizedValue = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const localizedValue = value as { cs?: unknown; en?: unknown; de?: unknown }
  return Boolean(localizedValue.cs || localizedValue.en || localizedValue.de)
}

export const unifiedCategoryType = defineType({
  name: 'unifiedCategory',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'cs', title: '🇨🇿 Čeština' },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'de', title: '🇩🇪 Deutsch' }
  ],
  fields: [
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
    })
  ],
  preview: {
    select: {
      titleCs: 'title.cs',
      titleEn: 'title.en',
      titleDe: 'title.de',
      slugCs: 'slug.cs.current',
      slugEn: 'slug.en.current',
      slugDe: 'slug.de.current'
    },
    prepare(selection) {
      const title =
        selection.titleCs ||
        selection.titleEn ||
        selection.titleDe ||
        'Untitled category'
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

      return {
        title,
        subtitle: filledLanguages || 'No localized slugs yet'
      }
    }
  }
})
