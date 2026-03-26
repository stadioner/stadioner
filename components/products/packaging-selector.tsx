import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
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
  onPackagingChange
}: PackagingSelectorProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='mt-2 flex justify-center sm:mt-4'>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <button
            className='border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-action inline-flex cursor-pointer items-center gap-2 border px-3 py-1 font-medium transition hover:opacity-90'
            aria-label={selectedPackagingLabel}
          >
            <span>{selectedPackagingLabel}</span>
            <span aria-hidden>▾</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-56 border-zinc-700 bg-zinc-900 p-0'>
          <Command>
            <CommandGroup>
              {options
                .filter((o) => o.available)
                .map((option) => (
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
