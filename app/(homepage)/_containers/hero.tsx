export const Hero = () => {
  return (
    <section className='relative h-[63vh] w-full'>
      {/* <video
        autoPlay
        muted
        loop
        className='absolute -top-42 left-0 overflow-hidden w-full'
      >
        <source src='https://cdn.coverr.co/videos/coverr-pouring-beer-in-slow-motion-1435/720p.mp4' />
      </video> */}
      <img
        src='/hero/main.webp'
        alt='hero'
        className='absolute bottom-0 left-0 z-10 w-full'
      />
      <div className='bg-brand-primary absolute left-0 bottom-0 w-full h-full' />
    </section>
  )
}
