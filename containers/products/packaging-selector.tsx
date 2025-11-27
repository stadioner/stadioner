import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import type { PackagingOption, PackagingKey } from '@/types/products'

interface PackagingSelectorProps {
  options: PackagingOption[]
  selectedPackaging: PackagingKey
  selectedPackagingLabel: string
  onPackagingChange: (key: PackagingKey) => void
}

export const PackagingSelector = ({
  options,
  selectedPackagingLabel,
  onPackagingChange,
}: PackagingSelectorProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-center mt-2 sm:mt-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className='border border-brand-primary text-brand-primary font-medium py-1 px-3 cursor-pointer hover:opacity-90 transition hover:bg-brand-primary hover:text-brand-action inline-flex items-center gap-2'
            aria-label={selectedPackagingLabel}
          >
            <span>{selectedPackagingLabel}</span>
            <span aria-hidden>▾</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-56 bg-zinc-900 border-zinc-700'>
          <Command>
            <CommandGroup>
              {options
                .filter(o => o.available)
                .map(option => (
                  <CommandItem
                    key={option.key}
                    value={option.key}
                    onSelect={() => {
                      onPackagingChange(option.key)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
