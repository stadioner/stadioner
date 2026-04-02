import { defineField, defineType } from 'sanity'
import { LocalizedSlugInput } from '@/sanity/components/localized-slug-input'

export const localizedSlugType = defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  components: {
    input: LocalizedSlugInput
  },
  fields: [
    defineField({
      name: 'cs',
      title: '🇨🇿 Czech Slug',
      type: 'slug'
    }),
    defineField({
      name: 'en',
      title: '🇬🇧 English Slug',
      type: 'slug'
    }),
    defineField({
      name: 'de',
      title: '🇩🇪 German Slug',
      type: 'slug'
    })
  ]
})
