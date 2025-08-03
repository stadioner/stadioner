import { Container } from '@/components/container'
import { ExternalLinkIcon, FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='bg-brand-secondary pt-20 pb-10'>
      <Container>
        <div className='grid grid-cols-3 gap-10'>
          <div className='grid text-xl'>
            <h4 className='text-3xl font-bold'>Odkazy</h4>
            <Link href='/'>Domů</Link>
            <Link href='/produkty'>Produkty</Link>
            <Link href='/prodejni-mista'>Prodejní Místa</Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/historie'>Historie</Link>
            <Link href='/kontakt'>Kontakt</Link>
          </div>
          <div className='flex flex-col justify-self-center text-xl'>
            <h4 className='text-3xl font-bold'>Produkty</h4>
            <Link href='/produkty/?produkt=profesor-dvanactka&kategorie=pivo'>
              Profesor Dvanáctka
            </Link>
            <Link href='/produkty/produkty?produkt=koutska-jedenactka&kategorie=pivo'>
              Koutská Jedenáctka
            </Link>
            <Link href='/produkty/produkty?produkt=limonada-pomeranc&kategorie=limo'>
              Limonáda Pomeranč
            </Link>
            <Link href='/produkty/produkty?produkt=limonada-citron&kategorie=limo'>
              Limonáda Citrón
            </Link>
            <Link href='/produkty/produkty?produkt=colamix&kategorie=limo'>
              Cola Mix
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-sycena&kategorie=voda'>
              Pramenitá Voda (Sycená)
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-nesycena&kategorie=voda'>
              Pramenitá Voda (Nesycená)
            </Link>
          </div>
          <div className='grid justify-between justify-self-end gap-4 text-xl'>
            <div>
              <h4 className='text-3xl font-bold'>Adresa</h4>
              <p>Kout na Šumavě 2</p>
              <p>34502 Kout na Šumavě</p>
              <Link
                href='https://maps.app.goo.gl/XQF36VsckwAMPkmRA'
                target='_blank'
                className='text-zinc-700 inline-flex items-center gap-1 mt-2'
              >
                <ExternalLinkIcon size={15} />
                trasa
              </Link>
            </div>

            <div className='flex gap-4 w-min h-min'>
              <Link href='instagram.com' target='_blank'>
                <InstagramIcon size={25} className='stroke-brand-action' />
              </Link>
              <Link href='facebook.com' target='_blank'>
                <FacebookIcon size={25} className='stroke-brand-action' />
              </Link>
            </div>
          </div>
        </div>

        <p className='pt-14 text-xs text-center'>
          &copy; {new Date().getFullYear()} Stadioner
        </p>
      </Container>
    </footer>
  )
}
