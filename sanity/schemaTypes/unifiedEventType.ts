import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const languageOrder = ['cs', 'en', 'de'] as const

export const unifiedEventType = defineType({
  name: 'unifiedEvent',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'shared', title: 'Shared' },
    { name: 'cs', title: '🇨🇿 Čeština' },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'de', title: '🇩🇪 Deutsch' }
  ],
  fields: [
    defineField({
      name: 'dateTime',
      type: 'datetime',
      title: 'Start Date and Time',
      group: 'shared',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'endDateTime',
      type: 'datetime',
      title: 'End Date and Time',
      group: 'shared'
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      group: 'shared'
    }),
    defineField({
      name: 'isComingSoon',
      type: 'boolean',
      title: 'Coming Soon',
      initialValue: false,
      group: 'shared'
    }),
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
      name: 'title',
      type: 'localizedString',
      title: 'Titles',
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      title: 'Slugs',
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'description',
      type: 'localizedBlockContent',
      title: 'Descriptions',
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'recap',
      type: 'localizedBlockContent',
      title: 'Recaps',
      group: ['cs', 'en', 'de']
    }),
    defineField({
      name: 'rsvpCount',
      type: 'number',
      title: 'RSVP Count',
      description: 'Current count of participants collected from the website.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
      readOnly: true,
      group: 'shared'
    }),
    defineField({
      name: 'rsvpVoterHashes',
      type: 'array',
      title: 'RSVP Voter Hashes',
      of: [{ type: 'string' }],
      initialValue: [],
      readOnly: true,
      hidden: true,
      group: 'shared'
    })
  ],
  preview: {
    select: {
      titleCs: 'title.cs',
      titleEn: 'title.en',
      titleDe: 'title.de',
      dateTime: 'dateTime',
      mainImage: 'mainImage',
      slugCs: 'slug.cs.current',
      slugEn: 'slug.en.current',
      slugDe: 'slug.de.current'
    },
    prepare(selection) {
      const title =
        selection.titleCs ||
        selection.titleEn ||
        selection.titleDe ||
        'Untitled'
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
        subtitle: `${selection.dateTime ? new Date(selection.dateTime).toLocaleDateString() : 'Date not set'}${filledLanguages ? ` • ${filledLanguages}` : ''}`,
        media: selection.mainImage
      }
    }
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'dateTime', direction: 'desc' }]
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: 'dateTime', direction: 'asc' }]
    }
  ]
})
