import { latLngBounds } from 'leaflet'
import { useEffect } from 'react'
import { CircleMarker, MapContainer, Polygon, TileLayer, Tooltip, useMap, ZoomControl } from 'react-leaflet'
import { corporateCoverageCities } from '@/data/content'
import 'leaflet/dist/leaflet.css'
import '@/styles/empresas.css'

/** Qué encuadra el mapa: las tres provincias, una provincia o la ubicación enviada. */
export type CoverageFocus = { kind: 'all' } | { kind: 'city'; id: string } | { kind: 'point'; at: [number, number] }

const ACCENT = '#de087e'
const allBounds = latLngBounds(corporateCoverageCities.flatMap((city) => city.area))
const cityBounds = Object.fromEntries(corporateCoverageCities.map((city) => [city.id, latLngBounds(city.area)]))
const PADDING: [number, number] = [36, 36]

/** Mueve la cámara cuando cambia el foco; sin animación si se pidió movimiento reducido. */
function FocusController({ focus }: { focus: CoverageFocus }) {
  const map = useMap()
  useEffect(() => {
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const options = { padding: PADDING, animate, duration: 0.8 }
    if (focus.kind === 'all') map.flyToBounds(allBounds, options)
    else if (focus.kind === 'city') map.flyToBounds(cityBounds[focus.id], options)
    else map.flyTo(focus.at, 13, { animate, duration: 0.8 })
  }, [map, focus])
  return null
}

type Props = {
  focus: CoverageFocus
  activeCityId: string | null
  userPosition: [number, number] | null
  onSelectCity: (id: string) => void
}

/** Cada provincia atendida es un área magenta; la ciudad capital, un punto con su nombre. */
export function CorporateCoverageMap({ focus, activeCityId, userPosition, onSelectCity }: Props) {
  return (
    <MapContainer
      bounds={allBounds}
      boundsOptions={{ padding: PADDING }}
      scrollWheelZoom={false}
      zoomControl={false}
      className="empresas-coverage-map"
      ref={(map) => {
        map
          ?.getContainer()
          .setAttribute(
            'aria-label',
            `Mapa de cobertura corporativa: ${corporateCoverageCities.map((city) => city.detail).join(', ')}`,
          )
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" zoomInTitle="Acercar" zoomOutTitle="Alejar" />
      <FocusController focus={focus} />

      {corporateCoverageCities.map((city) => {
        const active = activeCityId === city.id
        return (
          <Polygon
            key={`${city.id}-area`}
            positions={city.area}
            eventHandlers={{ click: () => onSelectCity(city.id) }}
            pathOptions={{
              color: ACCENT,
              weight: active ? 3 : 2,
              opacity: 1,
              fillColor: ACCENT,
              fillOpacity: active ? 0.26 : 0.14,
            }}
          />
        )
      })}

      {corporateCoverageCities.map((city) => (
        <CircleMarker
          key={city.id}
          center={city.coordinates}
          radius={6}
          eventHandlers={{ click: () => onSelectCity(city.id) }}
          pathOptions={{ color: '#ffffff', weight: 2.5, opacity: 1, fillColor: ACCENT, fillOpacity: 1 }}
        >
          <Tooltip permanent direction="top" offset={[0, -8]} className="empresas-map-label" opacity={1}>
            {city.name}
          </Tooltip>
        </CircleMarker>
      ))}

      {userPosition && (
        <CircleMarker
          center={userPosition}
          radius={9}
          pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#041c7b', fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -10]} className="empresas-map-label">
            Tu sede
          </Tooltip>
        </CircleMarker>
      )}
    </MapContainer>
  )
}
