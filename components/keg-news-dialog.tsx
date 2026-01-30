'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { Border } from './border'
import { useLanguage } from '@/store/use-language'
import { uiLabels } from '@/lib/products/constants'

export function KegNewsDialog() {
  const { language } = useLanguage()
  const activeLang = language === 'en' || language === 'de' ? language : 'cs'
  const labels = uiLabels[activeLang]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='flex items-center gap-2 text-xs sm:text-sm text-brand-primary/80 hover:text-brand-primary transition-colors mt-2 mx-auto decoration-dotted underline underline-offset-4'>
          <Info className='w-3 h-3 sm:w-4 sm:h-4' />
          <span>{labels.kegNewsTrigger}</span>
        </button>
      </DialogTrigger>
      <DialogContent className='bg-transparent border-none shadow-none text-brand-action-dark sm:max-w-md p-0 overflow-hidden'>
        <Border backgroundLight className='p-2'>
          <div className='flex flex-col items-center text-center p-6 sm:p-8 bg-brand-primary h-full'>
            <DialogTitle className='font-mohave text-3xl font-bold uppercase mb-6 tracking-wide text-brand-action-dark'>
              {labels.kegNewsTitle}
            </DialogTitle>

            <div className='font-caladea text-lg leading-relaxed text-brand-action-dark/90 space-y-4 mb-8'>
              <p className='text-balance'>{labels.kegNewsContent1}</p>
              <p className='font-bold text-balance'>{labels.kegNewsContent2}</p>
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full'>
              <Button
                asChild
                className='w-full sm:w-auto min-w-[140px] bg-brand-action text-brand-primary hover:bg-brand-action/90 uppercase font-bold tracking-wider'
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
                className='w-full sm:w-auto min-w-[140px] bg-brand-action text-brand-primary hover:bg-brand-action/90 uppercase font-bold tracking-wider'
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
