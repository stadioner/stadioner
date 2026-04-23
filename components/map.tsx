'use client'

import L, { LatLngExpression } from 'leaflet'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet'
import Link from 'next/link'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
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
  shadowUrl: markerShadow.src
})

type MarkerVariant = 'default' | 'pickup'

const markerVariantStyles: Record<
  MarkerVariant,
  {
    background: string
    border: string
    foreground: string
  }
> = {
  default: {
    background: 'rgba(238,226,184,0.95)',
    border: '#3b492b',
    foreground: '#3f4d2a'
  },
  pickup: {
    background: 'rgba(198,231,193,0.98)',
    border: '#2e6a4a',
    foreground: '#1f4d35'
  }
}

const createImageIcon = (
  imageUrl: string,
  variant: MarkerVariant = 'default'
) => {
  const styles = markerVariantStyles[variant]

  return L.divIcon({
    html: `<div style="width:40px;height:40px;border-radius:9999px;background:${styles.background};border:2px solid ${styles.border};color:${styles.foreground};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,0.18);"><img src="${imageUrl}" alt="" style="width:30px;height:30px;object-fit:contain;" /></div>`,
    className: 'custom-image-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  })
}

const createClusterIcon = (count: number) => {
  return L.divIcon({
    html: `<div style="width:40px;height:40px;border-radius:9999px;background:rgba(238,226,184,0.95);border:2px solid #3f4d2a;color:#3f4d2a;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;box-shadow:0 6px 18px rgba(0,0,0,0.18);">${count}</div>`,
    className: 'marker-cluster-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  })
}

const MARKER_CLUSTER_DISTANCE = 24

type ResolvedMarker = {
  position: LatLngExpression
  icon: L.Icon<L.IconOptions> | L.DivIcon
  popupContent?: ReactNode
  flexible?: boolean
  zoomLevel?: number
}

const averagePosition = (positions: L.LatLng[]) => {
  const sums = positions.reduce(
    (acc, position) => ({
      lat: acc.lat + position.lat,
      lng: acc.lng + position.lng
    }),
    { lat: 0, lng: 0 }
  )

  return [sums.lat / positions.length, sums.lng / positions.length] as [
    number,
    number
  ]
}

const groupMarkersByDistance = (
  map: L.Map,
  markers: ResolvedMarker[],
  zoom: number
) => {
  const groups: Array<{
    markers: ResolvedMarker[]
    positions: L.LatLng[]
    points: L.Point[]
  }> = []

  for (const marker of markers) {
    const latLng = L.latLng(marker.position)
    const point = map.project(latLng, zoom)
    const group = groups.find((candidate) =>
      candidate.points.some(
        (candidatePoint) =>
          candidatePoint.distanceTo(point) <= MARKER_CLUSTER_DISTANCE
      )
    )

    if (group) {
      group.markers.push(marker)
      group.positions.push(latLng)
      group.points.push(point)
      continue
    }

    groups.push({
      markers: [marker],
      positions: [latLng],
      points: [point]
    })
  }

  return groups.map((group) => {
    if (group.markers.length === 1) {
      return group.markers[0]
    }

    return {
      position: averagePosition(group.positions),
      icon: createClusterIcon(group.markers.length),
      flexible: true,
      zoomLevel: Math.min(zoom + 2, map.getMaxZoom() ?? 18)
    } satisfies ResolvedMarker
  })
}

const CustomMarker = ({
  position,
  icon,
  zoomLevel = 14,
  popupContent,
  flexible
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
          if (flexible) {
            map.setView(position, zoomLevel, { animate: true })
          }
        }
      }}
    >
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  )
}

const Recenter = ({
  center,
  zoom
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
  variant?: MarkerVariant
}

const defaultMarkers: ExternalMarker[] = [
  {
    position: [49.402084920025644, 13.00085318237539],
    iconUrl: '/map/pivovar.svg',
    popupContent: (
      <>
        <Link
          href='https://stadioner.cz'
          target='_blank'
          className='text-lg font-bold underline'
        >
          Pivovar STADIONER
        </Link>
        <p>Kout na Šumavě 2, 34502 Kout na Šumavě</p>
      </>
    )
  },
  {
    position: [49.39566567673913, 13.075090710544998],
    iconUrl: '/map/restaurace.svg',
    popupContent: (
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
    )
  },
  {
    position: [49.438417460830074, 12.928174312440982],
    iconUrl: '/map/limo.svg',
    popupContent: (
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
    )
  },
  {
    position: [49.511170647523564, 12.800326393356466],
    iconUrl: '/map/penzion.svg',
    popupContent: (
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
    )
  },
  {
    position: [49.505121015227374, 12.993390854842211],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
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
    )
  },
  {
    position: [49.389308715547465, 12.913962920541469],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
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
    )
  },
  {
    position: [50.084529904568846, 14.450910433845195],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
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
    )
  },
  {
    position: [50.0933570258205, 14.44776125216898],
    iconUrl: '/map/pivoteka.svg',
    popupContent: (
      <>
        <Link
          href='https://www.sedmstupnu.cz/'
          target='_blank'
          className='text-lg font-bold'
        >
          sedm° | výčep | pivotéka
        </Link>
        <p>Sokolovská 73/63/186 00, 186 00 Karlín</p>
      </>
    )
  },
  {
    position: [49.74832117580861, 13.37899663576035],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
      <>
        <Link
          href='https://kegzistence.cz/'
          target='_blank'
          className='text-lg font-bold'
        >
          KEGzistence
        </Link>
        <p>Rooseveltova 76/4, 301 00 Plzeň 3 - Vnitřní Město</p>
      </>
    )
  },
  {
    position: [49.74567349997154, 13.3744342378202],
    iconUrl: '/map/pivoteka.svg',
    popupContent: (
      <>
        <Link
          href='https://pivstro.cz/'
          target='_blank'
          className='text-lg font-bold'
        >
          Pivstro - Beer Bistro
        </Link>
        <p>Bezručova 185/31, 301 00 Plzeň 3 - Vnitřní Město</p>
      </>
    )
  },
  {
    position: [49.74529980301824, 13.386388149792635],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
      <>
        <Link
          href='https://www.klubmalychpivovaru.cz/'
          target='_blank'
          className='text-lg font-bold'
        >
          Klub malých pivovarů Plzeň
        </Link>
        <p>Nádražní 16, 301 00 Plzeň 3 - Východní Předměstí</p>
      </>
    )
  },
  {
    position: [49.35975333741444, 13.358563380620216],
    iconUrl: '/map/limo.svg',
    variant: 'pickup',
    popupContent: (
      <>
        <Link
          href='https://www.firmy.cz/detail/2110892-potraviny-a-hospoda-u-novaku-mochtin.html'
          target='_blank'
          className='text-lg font-bold'
        >
          Potraviny a hospoda u Nováků
        </Link>
        <p>Mochtín 8, 33901 Mochtín</p>
      </>
    )
  },
  {
    position: [49.44134101291233, 12.927037349677597],
    iconUrl: '/map/hospoda.svg',
    popupContent: (
      <>
        <Link
          href='https://www.facebook.com/profile.php?id=100071641868397'
          target='_blank'
          className='text-lg font-bold'
        >
          Hospoda Kovárna Domažlice
        </Link>
        <p>Komenského 7, 344 01 Domažlice 1-Týnské Předměstí</p>
      </>
    )
  },
  {
    position: [50.102595712567584, 14.396810835306159],
    iconUrl: '/map/limo.svg',
    popupContent: (
      <>
        <Link
          href='https://www.facebook.com/napojebubenec/'
          target='_blank'
          className='text-lg font-bold'
        >
          Nápoje Bubeneč
        </Link>
        <p>Národní obrany 789/49, 160 00 Praha 6</p>
      </>
    )
  },
  {
    position: [50.102595712567584, 14.396810835306159],
    iconUrl: '/map/penzion.svg',
    popupContent: (
      <>
        <Link
          href='https://www.resortceskyles.cz/gastro'
          target='_blank'
          className='text-lg font-bold'
        >
          Resort Český les
        </Link>
        <p>Železná 37, 345 24 Bělá nad Radbuzou</p>
      </>
    )
  }
]

const ClusteredMarkers = ({ markers }: { markers: ResolvedMarker[] }) => {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())

  useMapEvents({
    zoomend: () => setZoom(map.getZoom())
  })

  const groupedMarkers = useMemo(
    () => groupMarkersByDistance(map, markers, zoom),
    [map, markers, zoom]
  )

  return (
    <>
      {groupedMarkers.map((marker, idx) => (
        <CustomMarker
          key={idx}
          position={marker.position}
          icon={marker.icon}
          popupContent={marker.popupContent}
          flexible={marker.flexible}
          zoomLevel={marker.zoomLevel}
        />
      ))}
    </>
  )
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
    (flexible ?
      [49.49119659685226, 13.210585066693985]
    : [49.402084920025644, 13.00085318237539])
  const resolvedZoom = zoom ?? (flexible ? 7 : 8)
  const areMarkersInteractive = Boolean(markers?.length)
  const resolvedMarkers = (markers?.length ? markers : defaultMarkers).map(
    (marker) => ({
      position: marker.position,
      icon: createImageIcon(marker.iconUrl, marker.variant),
      popupContent:
        marker.variant === 'pickup' ?
          <div className='space-y-2'>
            <div className='text-brand-action bg-brand-primary border-brand-action w-min border px-1 text-xs font-medium tracking-tight whitespace-nowrap'>
              Výdejní místo
            </div>
            <div>{marker.popupContent}</div>
          </div>
        : marker.popupContent,
      flexible: areMarkersInteractive
    })
  )

  return (
    <MapContainer
      center={resolvedCenter}
      zoom={resolvedZoom}
      scrollWheelZoom={false}
      attributionControl={false}
      className={cn(
        'w-full',
        flexible ? 'h-[300px] md:h-[400px]' : 'h-[400px] md:h-[500px]'
      )}
    >
      <Recenter
        center={resolvedCenter}
        zoom={resolvedZoom}
      />
      {/* https://leaflet-extras.github.io/leaflet-providers/preview/ */}

      {/* minimal */}
      <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />

      <ClusteredMarkers markers={resolvedMarkers} />
    </MapContainer>
  )
}
