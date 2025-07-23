import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { Map } from '@/components/map'

export const Places = () => {
  return (
    <section className='bg-brand-secondary'>
      <Container>
        <Border>
          <Map />
        </Border>
      </Container>
    </section>
  )
}
