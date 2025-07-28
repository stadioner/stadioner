'use client'

import { FC, useRef } from 'react'
import { useScroll, motion } from 'framer-motion'

interface TimelineItemProps {
  year: string
  label: string
  body: string
  src: string
}

export const TimelineItem: FC<TimelineItemProps> = ({
  year,
  label,
  body,
  src,
}) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const { scrollYProgress: scrollYImageProgress } = useScroll({
    target: imageRef,
    offset: ['0 1', '1 1'],
  })

  const dotRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress: scrollYColorProgress } = useScroll({
    target: dotRef,
    offset: ['start center', 'end center'],
  })

  return (
    <li>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='flex-start flex items-center pt-3'
      >
        <div className='-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-zinc-400 dark:bg-zinc-600' />
        <motion.div
          ref={dotRef}
          style={{ opacity: scrollYColorProgress }}
          className='absolute -ml-[5px] mr-3 h-[9px] w-[9px] rounded-full z-10 bg-brand-action'
        />
        <p className='absolute ml-4 text-sm text-zinc-600 dark:text-zinc-400'>
          {year}
        </p>
        <motion.p
          ref={yearRef}
          style={{ opacity: scrollYColorProgress }}
          className='absolute ml-4 text-sm text-brand-action'
        >
          {year}
        </motion.p>
      </motion.div>
      <div className='mb-6 ml-4 mt-2'>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mb-3 font-semibold text-xl'
        >
          {label}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {body}
        </motion.p>
        <motion.img
          ref={imageRef}
          src={src}
          style={{ scale: scrollYImageProgress, opacity: scrollYImageProgress }}
          className='w-[50%] pt-6'
        />
      </div>
    </li>
  )
}
