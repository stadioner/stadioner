'use client'

import L, { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Link from 'next/link'
import { ReactNode } from 'react'

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

const ZoomableMarker = ({
  position,
  icon,
  zoomLevel = 16,
  popupContent,
}: {
  position: LatLngExpression
  icon: L.Icon<L.IconOptions> | L.DivIcon
  zoomLevel?: number
  popupContent: ReactNode
}) => {
  const map = useMap()

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        dblclick: () => map.setView(position, zoomLevel, { animate: true }),
        click: () =>
          map.setView([49.9171208544799, 14.67178354882282], 7, {
            animate: true,
          }),
      }}
    >
      <Popup>{popupContent}</Popup>
    </Marker>
  )
}

export const Map = () => {
  return (
    <MapContainer
      center={[49.9171208544799, 14.67178354882282]}
      zoom={7}
      scrollWheelZoom={false}
      attributionControl={false}
      className='h-[400px] md:h-[500px] w-full'
    >
      {/* https://leaflet-extras.github.io/leaflet-providers/preview/ */}

      {/* minimal */}
      <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />

      <ZoomableMarker
        position={[49.402084920025644, 13.00085318237539]}
        icon={createImageIcon('/map/pivovar.svg')}
        popupContent={
          <>
            <h3 className='text-lg font-bold'>Pivovar Stadioner</h3>
            <p>Kout na Šumavě 2, 34502 Kout na Šumavě</p>
          </>
        }
      />
      <ZoomableMarker
        position={[50.08705930316747, 14.421203738317592]}
        icon={createImageIcon('/map/hospoda.svg')}
        popupContent={
          <>
            <Link href='' className='text-lg font-bold underline'>
              Název
            </Link>
            <p>Praha</p>
          </>
        }
      />
    </MapContainer>
  )
}
