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
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      description: 'Hex color code for the category',
      validation: Rule =>
        Rule.regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      color: 'color',
    },
    prepare(selection) {
      const { title, language, color } = selection
      const lang = languages.find(l => l.id === language)
      return {
        title,
        subtitle: lang
          ? `${lang.flag} ${lang.title}${color ? ` • ${color}` : ''}`
          : language,
      }
    },
  },
})
