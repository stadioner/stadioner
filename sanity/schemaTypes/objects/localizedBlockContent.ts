import { defineField, defineType } from 'sanity'

export const localizedBlockContentType = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'cs',
      title: '🇨🇿 Czech',
      type: 'blockContent'
    }),
    defineField({
      name: 'en',
      title: '🇬🇧 English',
      type: 'blockContent'
    }),
    defineField({
      name: 'de',
      title: '🇩🇪 German',
      type: 'blockContent'
    })
  ]
})
