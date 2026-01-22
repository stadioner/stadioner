'use client'

import L, { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Link from 'next/link'
import { FC, ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-expect-error: Third-party lib has incorrect type definition
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

const createImageIcon = (imageUrl: string) => {
  return L.icon({
    iconUrl: imageUrl,
    iconSize: [32, 32], // Adjust size as needed
    iconAnchor: [16, 32], // Adjust anchor as needed
    popupAnchor: [0, -32],
    className: 'custom-image-icon',
  })
}

const CustomMarker = ({
  position,
  icon,
  zoomLevel = 14,
  popupContent,
  flexible,
}: {
  position: LatLngExpression
  icon: L.Icon<L.IconOptions> | L.DivIcon
  zoomLevel?: number
  popupContent?: ReactNode
  flexible?: boolean
}) => {
  const map = useMap()
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          flexible ? map.setView(position, zoomLevel, { animate: true }) : null
        },
      }}
    >
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  )
}

const Recenter = ({
  center,
  zoom,
}: {
  center: LatLngExpression
  zoom: number
}) => {
  const map = useMap()
  useEffect(() => {
    // Ensures the map view updates when center/zoom props change
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

type ExternalMarker = {
  position: LatLngExpression
  iconUrl: string
  popupContent: ReactNode
}

interface MapProps {
  flexible?: boolean
  center?: LatLngExpression
  zoom?: number
  markers?: ExternalMarker[]
}

export const Map: FC<MapProps> = ({ flexible, center, zoom, markers }) => {
  const resolvedCenter =
    center ??
    (flexible
      ? [49.49119659685226, 13.210585066693985]
      : [49.402084920025644, 13.00085318237539])
  const resolvedZoom = zoom ?? (flexible ? 8 : 9)
  return (
    <MapContainer
      center={resolvedCenter}
      zoom={resolvedZoom}
      scrollWheelZoom={false}
      attributionControl={false}
      className={cn(
        'w-full',
        flexible ? 'h-[300px] md:h-[400px]' : 'h-[400px] md:h-[500px] '
      )}
    >
      <Recenter center={resolvedCenter} zoom={resolvedZoom} />
      {/* https://leaflet-extras.github.io/leaflet-providers/preview/ */}

      {/* minimal */}
      <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />

      {markers && markers.length > 0 ? (
        markers.map((m, idx) => (
          <CustomMarker
            key={idx}
            position={m.position}
            icon={createImageIcon(m.iconUrl)}
            flexible
          />
        ))
      ) : (
        <>
          <CustomMarker
            position={[49.402084920025644, 13.00085318237539]}
            icon={createImageIcon('/map/pivovar.svg')}
            popupContent={
              <>
                <Link
                  href='https://stadioner.cz'
                  target='_blank'
                  className='text-lg font-bold underline'
                >
                  Pivovar Stadioner
                </Link>
                <p>Kout na Šumavě 2, 34502 Kout na Šumavě</p>
              </>
            }
          />
          <CustomMarker
            position={[49.39566567673913, 13.075090710544998]}
            icon={createImageIcon('/map/restaurace.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.kdyne.cz/mesto/katalog-firem-a-sluzeb/ubytovani-a-stravovani/horska-chata-korab-0_118.html'
                  target='_blank'
                  className='text-lg font-bold underline'
                >
                  Horská chata Koráb
                </Link>
                <p>Koráb 466, 345 06 Kdyně</p>
              </>
            }
          />
          <CustomMarker
            position={[49.438417460830074, 12.928174312440982]}
            icon={createImageIcon('/map/limo.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.facebook.com/biodomazlice/?locale=cs_CZ'
                  target='_blank'
                  className='text-lg font-bold underline'
                >
                  Bio Domažlice - zdravá výživa
                </Link>
                <p>Hruškova 87, 344 01 Domažlice 1</p>
              </>
            }
          />
          <CustomMarker
            position={[49.511170647523564, 12.800326393356466]}
            icon={createImageIcon('/map/penzion.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.hubertus.cz/cs/'
                  target='_blank'
                  className='text-lg font-bold'
                >
                  Hotel Hubertus
                </Link>
                <p>Mariánská 91, 345 22 Poběžovice</p>
              </>
            }
          />
          <CustomMarker
            position={[49.505121015227374, 12.993390854842211]}
            icon={createImageIcon('/map/hospoda.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.firmy.cz/detail/13118914-hospudka-v-roklince-blizejov.html'
                  target='_blank'
                  className='text-lg font-bold'
                >
                  Hospůdka V Roklince
                </Link>
                <p>Blížejov 171, 345 45 Blížejov</p>
              </>
            }
          />
         <CustomMarker
            position={[49.389308715547465, 12.913962920541469]}
            icon={createImageIcon('/map/hospoda.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.pelechy.cz/?view=article&id=64:hostinec&catid=42'
                  target='_blank'
                  className='text-lg font-bold'
                >
                 Hostinec Pelechy
                </Link>
                <p>Pelechy 27, 344 01 Pelechy</p>
              </>
            }
          />
          <CustomMarker
            position={[50.084529904568846, 14.450910433845195]}
            icon={createImageIcon('/map/hospoda.svg')}
            popupContent={
              <>
                <Link
                  href='https://www.firmy.cz/detail/12735594-pivni-lokal-ostry-praha-zizkov.html'
                  target='_blank'
                  className='text-lg font-bold'
                >
                 Pivní lokál Ostrý
                </Link>
                <p>Sladkovského náměstí 302/5, 130 00 Praha, Žižkov</p>
              </>
            }
          />
        </>
      )}
    </MapContainer>
  )
}
