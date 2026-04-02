import { defineField, defineType } from 'sanity'

export const localizedStringType = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'cs',
      title: '🇨🇿 Czech',
      type: 'string'
    }),
    defineField({
      name: 'en',
      title: '🇬🇧 English',
      type: 'string'
    }),
    defineField({
      name: 'de',
      title: '🇩🇪 German',
      type: 'string'
    })
  ]
})
