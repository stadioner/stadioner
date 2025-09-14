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
      : [49.9171208544799, 14.67178354882282])
  const resolvedZoom = zoom ?? (flexible ? 8 : 7)
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
                <h3 className='text-lg font-bold'>Pivovar Stadioner</h3>
                <p>Kout na Šumavě 2, 34502 Kout na Šumavě</p>
              </>
            }
          />
        </>
      )}
    </MapContainer>
  )
}
