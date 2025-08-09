import { Border } from './border'

export const MapLegend = () => {
  return (
    <div className='absolute top-5 right-5 z-[1000]'>
      <Border backgroundLight>
        <div className='text-xl p-4'>
          <p className='flex items-center'>
            <img src='/map/pivovar.svg' className='size-10' />
            Pivovar Stadioner
          </p>
          <p className='flex items-center'>
            <img src='/map/pivoteka.svg' className='size-10' />
            Pivnice
          </p>
          <p className='flex items-center'>
            <img src='/map/restaurace.svg' className='size-10' />
            Restaurace
          </p>
        </div>
      </Border>
    </div>
  )
}
