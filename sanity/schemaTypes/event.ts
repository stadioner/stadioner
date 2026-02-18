import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { languages } from '../lib/languages'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
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
      name: 'translationKey',
      type: 'string',
      title: 'Translation Key',
      description:
        'Shared key across language variants of the same event (used for hreflang).',
      initialValue: () => crypto.randomUUID(),
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
      name: 'dateTime',
      type: 'datetime',
      title: 'Start Date and Time',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      type: 'datetime',
      title: 'End Date and Time',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'isComingSoon',
      type: 'boolean',
      title: 'Coming Soon',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'mainImage',
      dateTime: 'dateTime',
      endDateTime: 'endDateTime',
    },
    prepare(selection) {
      const { title, language, dateTime, endDateTime } = selection
      const lang = languages.find(l => l.id === language)

      const startDate = dateTime ? new Date(dateTime) : null
      const endDate = endDateTime ? new Date(endDateTime) : null

      let dateString = 'Date not set'

      if (startDate) {
        dateString =
          startDate.toLocaleDateString() +
          ' ' +
          startDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        if (endDate) {
          const sameDay = startDate.toDateString() === endDate.toDateString()
          dateString +=
            ' - ' +
            (sameDay ? '' : endDate.toLocaleDateString() + ' ') +
            endDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
        }
      }

      return {
        title,
        subtitle: `${lang ? `${lang.flag} ` : ''} • ${dateString}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'dateTime', direction: 'desc' }],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: 'dateTime', direction: 'asc' }],
    },
  ],
})
