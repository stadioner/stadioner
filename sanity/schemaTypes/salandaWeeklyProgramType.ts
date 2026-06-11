import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const salandaWeeklyProgramType = defineType({
  name: 'salandaWeeklyProgram',
  title: 'Šalanda – program',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'isActive',
      title: 'Aktuální program',
      type: 'boolean',
      description:
        'Zaškrtněte u programu, který se má zobrazovat na webu. V jednu chvíli by měl být aktivní jen jeden program.',
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
              name: 'date',
              title: 'Datum',
              type: 'date',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'time',
              title: 'Čas',
              type: 'string',
              description: 'Např. 18:00 nebo 16:00–20:00',
              validation: (Rule) => Rule.required()
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
              date: 'date',
              time: 'time'
            },
            prepare({ title, date, time }) {
              return {
                title: title ?? 'Bez názvu',
                subtitle: [date, time].filter(Boolean).join(' · ')
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      isActive: 'isActive',
      items: 'programItems'
    },
    prepare({ isActive, items }) {
      const count = items?.length ?? 0
      return {
        title: `Program (${count} ${count === 1 ? 'položka' : count < 5 ? 'položky' : 'položek'})`,
        subtitle: isActive ? 'Aktuální' : undefined
      }
    }
  },
  orderings: [
    {
      title: 'Naposledy upravené',
      name: 'updatedAtDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    }
  ]
})
