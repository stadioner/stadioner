import { GenerateIcon } from '@sanity/icons'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import { useMemo } from 'react'
import {
  PatchEvent,
  set,
  setIfMissing,
  type ObjectInputProps,
  type SlugValue,
  useFormValue
} from 'sanity'

type SupportedLanguage = 'cs' | 'en' | 'de'

interface LocalizedSlugValue {
  _type?: 'localizedSlug'
  cs?: SlugValue
  en?: SlugValue
  de?: SlugValue
}

interface LocalizedStringValue {
  _type?: 'localizedString'
  cs?: string
  en?: string
  de?: string
}

const languages: Array<{ id: SupportedLanguage; label: string }> = [
  { id: 'cs', label: '🇨🇿 CS' },
  { id: 'en', label: '🇬🇧 EN' },
  { id: 'de', label: '🇩🇪 DE' }
]

const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function LocalizedSlugInput(
  props: ObjectInputProps<LocalizedSlugValue>
) {
  const titles = useFormValue(['title']) as LocalizedStringValue | undefined

  const availableLanguages = useMemo(
    () =>
      languages.map((language) => {
        const localizedTitle = titles?.[language.id]
        const titleValue =
          typeof localizedTitle === 'string' ? localizedTitle : ''

        return {
          ...language,
          title: titleValue,
          canGenerate: titleValue.trim().length > 0
        }
      }),
    [titles]
  )

  const applySlugPatch = (language: SupportedLanguage) => {
    const title = titles?.[language]

    if (typeof title !== 'string' || title.trim().length === 0) {
      return
    }

    const nextSlug = slugify(title)

    if (nextSlug.length === 0) {
      return
    }

    props.onChange(
      PatchEvent.from([
        setIfMissing({ _type: 'localizedSlug' }),
        set({ _type: 'slug', current: nextSlug }, [language])
      ])
    )
  }

  const generateAll = () => {
    const patches = availableLanguages.reduce<Array<ReturnType<typeof set>>>(
      (acc, language) => {
        if (!language.canGenerate) {
          return acc
        }

        const nextSlug = slugify(language.title)

        if (nextSlug.length === 0) {
          return acc
        }

        acc.push(set({ _type: 'slug', current: nextSlug }, [language.id]))
        return acc
      },
      []
    )

    if (patches.length === 0) {
      return
    }

    props.onChange(
      PatchEvent.from([setIfMissing({ _type: 'localizedSlug' }), ...patches])
    )
  }

  return (
    <Stack space={3}>
      <Card
        border
        padding={3}
        radius={2}
        tone='transparent'
      >
        <Stack space={3}>
          <Text size={1}>
            Generate localized slugs from the matching localized titles only
            when you click a button.
          </Text>
          <Flex
            gap={2}
            wrap='wrap'
          >
            {availableLanguages.map((language) => (
              <Button
                fontSize={1}
                icon={GenerateIcon}
                key={language.id}
                mode='ghost'
                onClick={() => applySlugPatch(language.id)}
                text={`Generate ${language.label}`}
                tone='primary'
                disabled={!language.canGenerate}
              />
            ))}
            <Button
              fontSize={1}
              icon={GenerateIcon}
              mode='default'
              onClick={generateAll}
              text='Generate all'
              tone='primary'
              disabled={
                !availableLanguages.some((language) => language.canGenerate)
              }
            />
          </Flex>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
