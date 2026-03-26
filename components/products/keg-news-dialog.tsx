'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { Border } from '@/components/border'
import { useLanguage } from '@/store/use-language'
import { uiLabels } from '@/lib/products/constants'

export function KegNewsDialog() {
  const { language } = useLanguage()
  const activeLang = language === 'en' || language === 'de' ? language : 'cs'
  const labels = uiLabels[activeLang]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-brand-primary/80 hover:text-brand-primary mx-auto mt-2 flex items-center gap-2 text-xs underline decoration-dotted underline-offset-4 transition-colors sm:text-sm'>
          <Info className='h-3 w-3 sm:h-4 sm:w-4' />
          <span>{labels.kegNewsTrigger}</span>
        </button>
      </DialogTrigger>
      <DialogContent className='text-brand-action-dark overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-md'>
        <Border
          backgroundLight
          className='p-2'
        >
          <div className='bg-brand-primary flex h-full flex-col items-center p-6 text-center sm:p-8'>
            <DialogTitle className='font-mohave text-brand-action-dark mb-6 text-3xl font-bold tracking-wide uppercase'>
              {labels.kegNewsTitle}
            </DialogTitle>

            <div className='font-caladea text-brand-action-dark/90 mb-8 space-y-4 text-lg leading-relaxed'>
              <p className='text-balance'>{labels.kegNewsContent1}</p>
              <p className='font-bold text-balance'>{labels.kegNewsContent2}</p>
            </div>

            <div className='flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
              <Button
                asChild
                className='bg-brand-action text-brand-primary hover:bg-brand-action/90 w-full min-w-[140px] font-bold tracking-wider uppercase sm:w-auto'
              >
                <a
                  href='https://eshop.stadioner.cz/products/stadioner-soudek?variant=52910502084947'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {labels.barrel10}
                </a>
              </Button>
              <Button
                asChild
                className='bg-brand-action text-brand-primary hover:bg-brand-action/90 w-full min-w-[140px] font-bold tracking-wider uppercase sm:w-auto'
              >
                <a
                  href='https://eshop.stadioner.cz/products/stadioner-soudek?variant=52923374764371'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {labels.barrel20}
                </a>
              </Button>
            </div>
          </div>
        </Border>
      </DialogContent>
    </Dialog>
  )
}
