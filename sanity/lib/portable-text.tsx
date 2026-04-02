import type {
  PortableTextComponents,
  ReactPortableTextList,
  ReactPortableTextListItem
} from '@portabletext/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PortableTextListProps {
  children?: ReactNode
  value: ReactPortableTextList
}

interface PortableTextListItemProps {
  children?: ReactNode
  value: ReactPortableTextListItem
}

interface PortableTextListStyleOptions {
  listClassName?: string
  listItemClassName?: string
}

interface PortableTextSpanLike {
  _key?: string
  _type?: string
  text?: string
}

export interface PortableTextBlockLike {
  _key?: string
  _type?: string
  children?: PortableTextSpanLike[]
}

export function hasPortableTextContent(
  value?: PortableTextBlockLike[]
): boolean {
  if (!value?.length) {
    return false
  }

  return value.some((block) => !isPortableTextBlockEmpty(block))
}

const BULLET_LIST_STYLES = [
  'list-disc',
  'list-[circle]',
  'list-[square]'
] as const
const NUMBER_LIST_STYLES = [
  'list-decimal',
  'list-[lower-alpha]',
  'list-[lower-roman]'
] as const

function getListStyleClass(level: number, styles: readonly string[]): string {
  return styles[Math.min(Math.max(level, 1), styles.length) - 1]
}

function getSharedListClassName(level: number, className?: string): string {
  return cn(
    'space-y-2 list-outside pl-6',
    level > 1 ? 'mt-3 mb-2' : 'my-4',
    className
  )
}

export function createPortableTextListComponents(
  options: PortableTextListStyleOptions = {}
): Pick<PortableTextComponents, 'list' | 'listItem'> {
  return {
    list: {
      bullet: ({ children, value }: PortableTextListProps) => (
        <ul
          className={getSharedListClassName(
            value.level,
            cn(
              getListStyleClass(value.level, BULLET_LIST_STYLES),
              options.listClassName
            )
          )}
        >
          {children}
        </ul>
      ),
      number: ({ children, value }: PortableTextListProps) => (
        <ol
          className={getSharedListClassName(
            value.level,
            cn(
              getListStyleClass(value.level, NUMBER_LIST_STYLES),
              options.listClassName
            )
          )}
        >
          {children}
        </ol>
      )
    },
    listItem: ({ children }: PortableTextListItemProps) => (
      <li
        className={cn(
          'pl-1 marker:text-current [&>ol]:mt-3 [&>ul]:mt-3',
          options.listItemClassName
        )}
      >
        {children}
      </li>
    )
  }
}

export function isPortableTextBlockEmpty(
  value?: PortableTextBlockLike
): boolean {
  if (!value?.children?.length) {
    return true
  }

  return value.children.every(
    (child) => child._type === 'span' && (child.text ?? '').trim().length === 0
  )
}
