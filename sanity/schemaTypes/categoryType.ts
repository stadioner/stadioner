import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { languages } from '../lib/languages'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: languages.map(lang => ({ title: lang.title, value: lang.id })),
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      description: 'Hex color code for category styling (e.g., #FF5733)',
      validation: Rule =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: true,
        }).error('Please enter a valid hex color code (e.g., #FF5733)'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      color: 'color',
    },
    prepare(selection) {
      const { title, language } = selection
      const lang = languages.find(l => l.id === language)
      return {
        title,
        subtitle: lang ? `${lang.flag} ${lang.title}` : language,
      }
    },
  },
})
