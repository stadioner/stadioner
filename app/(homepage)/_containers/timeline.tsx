'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { useRef } from 'react'
import { useScroll, motion } from 'framer-motion'
import { TimelineItem } from '@/components/timeline-item'

export const Timeline = () => {
  const { language } = useLanguage()

  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  return (
    <Container className='pb-40 lg:pb-60 xl:pb-80'>
      <h3 className='text-4xl font-caladea mb-2 text-brand-action'>
        Vývoj pivovaru
      </h3>
      <ol
        ref={ref}
        className='relative border-l-2 border-zinc-400 dark:border-zinc-600 space-y-20 lg:space-y-32 max-w-[80ch] mx-auto'
      >
        <motion.div
          className='absolute -left-[3px] z-10 w-[4px] h-full bg-brand-action origin-top'
          style={{ scaleY: scrollYProgress }}
        />
        <TimelineItem
          year='1748'
          label={
            language === 'en'
              ? 'Embarking on Visual Foundations'
              : 'Začínáme s vizuálním základem'
          }
          body={
            language === 'en'
              ? "In the first step, we'll focus on creating the fundamental structure and design of the website. Creativity meets functionality as we craft a visual identity that captivates and engages visitors."
              : 'V prvním kroku se společně zaměříme na vytvoření základní struktury a designu webu. Kreativita se setká s funkcionalitou, abychom vytvořili vizuální podobu, která bude zaujímat a lákat návštěvníky.'
          }
          src='/products/citron.webp'
        />
        <TimelineItem
          year='1784'
          label={
            language === 'en'
              ? 'Content Shapes Form and Purpose'
              : 'Obsah plní formu a smysl'
          }
          body={
            language === 'en'
              ? "The second step is dedicated to populating the website with content that is not only visually appealing but also conveys crucial information. Together, we'll work on texts, images, and other elements to give the content meaning and value."
              : 'Druhý krok bude věnován naplnění obsahu, který bude nejen esteticky působivý, ale bude také sdělovat důležité informace. Společně pracujeme na textech, obrázcích a dalších prvcích, které dodají obsahu webu jeho význam a hodnotu.'
          }
          src='/products/citron.webp'
        />
        <TimelineItem
          year='1843'
          label={
            language === 'en'
              ? 'Finetuning for a Flawless Impression'
              : 'Ladění pro dokonalý dojem'
          }
          body={
            language === 'en'
              ? "The third step focuses on refining details and making subtle adjustments. We'll pay attention to every minor tweak to ensure the website exudes professionalism and aligns precisely with your vision."
              : 'Ve Třetí kroku se zaměříme na detaily a jemné úpravy. Věnujeme se všem drobným úpravám, které zajistí, že web bude působit profesionálně a přesně podle vašich představ.'
          }
          src='/products/citron.webp'
        />
        <TimelineItem
          year='1894'
          label={
            language === 'en'
              ? 'When Vision Becomes Reality'
              : 'Když se vize stane skutečností'
          }
          body={
            language === 'en'
              ? "The final step is dedicated to final preparations for launching the website. We'll review all elements to ensure your website is ready for deployment and poised to welcome your visitors."
              : 'Poslední krok je věnován finálním přípravám ke spuštění webu. Zkontrolujeme všechny prvky, abychom zajistili, že váš web je připraven k uvedení do provozu a k přivítání vašich návštěvníků.'
          }
          src='/products/citron.webp'
        />
      </ol>
    </Container>
  )
}
