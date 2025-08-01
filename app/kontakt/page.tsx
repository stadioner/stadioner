import { Border } from '@/components/border'
import { Container } from '@/components/container'

export default function KontaktPage() {
  return (
    <main className='bg-brand-primary pt-32 pb-20'>
      <Container>
        <Border>
          <iframe
            src='https://www.google.com/maps/embed/v1/place?q=pivovar+kout+na+sumave&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
            className='w-full h-[500px]'
          />
        </Border>
      </Container>
    </main>
  )
}
