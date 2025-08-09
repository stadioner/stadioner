'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/store/use-language'
import { Border } from './border'

const languages = [
  {
    value: 'cs',
    src: '/flags/cs.webp',
  },
  {
    value: 'en',
    src: '/flags/en.webp',
  },
  {
    value: 'de',
    src: '/flags/de.webp',
  },
]

export const LanguageSelector = () => {
  const { language, imgSrc, setLanguage } = useLanguage(state => state)

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between border-none !bg-transparent hover:bg-transparent cursor-pointer p-0 shadow-none'
        >
          <Image src={imgSrc(language)} width={30} height={30} alt={language} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-[1112] w-[100px] bg-brand-secondary p-1 rounded-none border-brand-action'>
        <Command>
          <CommandGroup className='space-y-2 bg-brand-secondary'>
            {languages.map(({ src, value }: { src: string; value: string }) => (
              <CommandItem
                key={value}
                onSelect={() => {
                  setLanguage(value)
                  setOpen(false)
                }}
                className='mb-2 cursor-pointer'
              >
                <Check
                  className={cn(
                    'mr-1 h-4 w-4',
                    language === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <Image src={src} width={30} height={30} alt={value} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
