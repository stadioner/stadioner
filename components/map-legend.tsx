import { Border } from './border'

export const MapLegend = () => {
  return (
    <div className='absolute top-5 right-5 z-[1000]'>
      <Border backgroundLight>
        <div className=' px-2 py-1'>
          <p className='flex items-center'>
            <img src='/map/pivovar.svg' className='size-8' />
            Pivovar Stadioner
          </p>
          <p className='flex items-center'>
            <img src='/map/pivoteka.svg' className='size-8' />
            Pivnice
          </p>
          <p className='flex items-center'>
            <img src='/map/restaurace.svg' className='size-8' />
            Restaurace
          </p>
        </div>
      </Border>
    </div>
  )
}
