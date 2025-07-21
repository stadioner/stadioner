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

interface LanguageSelectorProps {
  isTopOfPage: boolean
}

export const LanguageSelector = ({ isTopOfPage }: LanguageSelectorProps) => {
  const { language, imgSrc, setLanguage } = useLanguage(state => state)

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[70px] justify-between border-none bg-transparent text-white hover:bg-zinc-100/10 hover:text-white'
        >
          <Image src={imgSrc(language)} width={30} height={30} alt={language} />
          <ChevronsUpDown
            className={cn(
              'ml-2 h-4 w-4 shrink-0 opacity-50 transition duration-300',
              !isTopOfPage && 'text-brown'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-[1112] w-[100px] bg-zinc-300 p-2'>
        <Command>
          <CommandGroup className='space-y-2 bg-zinc-300'>
            {languages.map(({ src, value }: { src: string; value: string }) => (
              <CommandItem
                key={value}
                onSelect={() => {
                  setLanguage(value)
                  setOpen(false)
                }}
                className='mb-2 cursor-pointer hover:bg-zinc-400/30'
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
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
