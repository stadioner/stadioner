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
      <h2 className='text-6xl mb-6 text-brand-action font-bold'>
        Vývoj pivovaru
      </h2>
      <ol
        ref={ref}
        className='relative border-l-2 border-zinc-400 dark:border-zinc-600 space-y-20 lg:space-y-32 mx-auto'
      >
        <motion.div
          className='absolute -left-[3px] z-10 w-[4px] h-full bg-brand-action origin-top'
          style={{ scaleY: scrollYProgress }}
        />
        <TimelineItem
          year='1748'
          label='Nullam sapien sem'
          body='Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Integer imperdiet lectus quis justo. Nulla pulvinar eleifend sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin in tellus sit amet nibh dignissim sagittis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam ante. Etiam egestas wisi a erat. Duis risus. Aenean vel massa quis mauris vehicula lacinia.'
          src='/history/1.webp'
        />
        <TimelineItem
          year='1784'
          label='Pellentesque ipsum'
          body='Pellentesque ipsum. Nulla est. Donec quis nibh at felis congue commodo. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Integer in sapien. Curabitur bibendum justo non orci. Phasellus et lorem id felis nonummy placerat. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Integer malesuada. Donec iaculis gravida nulla. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Nulla est. Mauris elementum mauris vitae tortor. Vestibulum fermentum tortor id mi. Cras pede libero, dapibus nec, pretium sit amet, tempor quis.'
          src='/history/1.webp'
        />
        <TimelineItem
          year='1843'
          label='Ut enim ad minim veniam'
          body='Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam posuere lacus quis dolor. Etiam egestas wisi a erat. Proin mattis lacinia justo. Etiam dictum tincidunt diam. Duis condimentum augue id magna semper rutrum. Etiam posuere lacus quis dolor. Duis condimentum augue id magna semper rutrum. Nullam dapibus fermentum ipsum. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Fusce tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.'
          src='/history/1.webp'
        />
        <TimelineItem
          year='1894'
          label='Sed ut perspiciatis unde'
          body='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Suspendisse nisl. Etiam dictum tincidunt diam. Cras elementum. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Aliquam erat volutpat. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
          src='/history/1.webp'
        />
      </ol>
    </Container>
  )
}
