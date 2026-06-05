import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const dayOptions = [
  { title: 'Pondělí', value: 'mon' },
  { title: 'Úterý', value: 'tue' },
  { title: 'Středa', value: 'wed' },
  { title: 'Čtvrtek', value: 'thu' },
  { title: 'Pátek', value: 'fri' },
  { title: 'Sobota', value: 'sat' },
  { title: 'Neděle', value: 'sun' }
] as const

export const salandaWeeklyProgramType = defineType({
  name: 'salandaWeeklyProgram',
  title: 'Šalanda – program týdne',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Název týdne',
      type: 'localizedString',
      description: 'Např. „Program týdne 2.–8. června“',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'weekStart',
      title: 'Začátek týdne',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'weekEnd',
      title: 'Konec týdne',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Aktuální týden',
      type: 'boolean',
      description:
        'Zaškrtněte u programu, který se má zobrazovat na webu. V jednu chvíli by měl být aktivní jen jeden týden.',
      initialValue: false
    }),
    defineField({
      name: 'programItems',
      title: 'Položky programu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programItem',
          fields: [
            defineField({
              name: 'day',
              title: 'Den',
              type: 'string',
              options: {
                list: [...dayOptions],
                layout: 'radio'
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'time',
              title: 'Čas',
              type: 'string',
              description: 'Např. 18:00 nebo 16:00–20:00'
            }),
            defineField({
              name: 'title',
              title: 'Název',
              type: 'localizedString',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Popis',
              type: 'localizedString'
            })
          ],
          preview: {
            select: {
              title: 'title.cs',
              day: 'day',
              time: 'time'
            },
            prepare({ title, day, time }) {
              const dayLabel =
                dayOptions.find((option) => option.value === day)?.title ?? day
              return {
                title: title ?? 'Bez názvu',
                subtitle: [dayLabel, time].filter(Boolean).join(' · ')
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title.cs',
      weekStart: 'weekStart',
      isActive: 'isActive'
    },
    prepare({ title, weekStart, isActive }) {
      return {
        title: title ?? 'Program týdne',
        subtitle: [weekStart, isActive ? 'Aktuální' : null]
          .filter(Boolean)
          .join(' · ')
      }
    }
  },
  orderings: [
    {
      title: 'Začátek týdne (nejnovější)',
      name: 'weekStartDesc',
      by: [{ field: 'weekStart', direction: 'desc' }]
    }
  ]
})
