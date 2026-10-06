import { useState } from 'react'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { coverageCityAt } from '@/data/content'
import { reverseGeocode } from '@/lib/reverseGeocode'

/**
 * Resultado de "Usar mi ubicación" para la sede. `address` es la dirección aproximada (undefined
 * mientras se busca, null si no se encontró).
 */
export type SedeAnswer =
  | { source: 'location'; at: [number, number]; city?: string; province?: string; address?: string | null }
  | { source: 'location-error'; message: string }

/**
 * "Usar mi ubicación" contra las provincias con enlace dedicado: muestra la sede en el mapa sin
 * salir de la página. El enlace de WhatsApp lleva la ubicación cuando ya se tiene.
 */
export function useSedeLocate(onLocated?: (at: [number, number]) => void) {
  const [answer, setAnswer] = useState<SedeAnswer | null>(null)
  const [locating, setLocating] = useState(false)

  function locate() {
    if (!('geolocation' in navigator)) {
      setAnswer({
        source: 'location-error',
        message: 'Tu navegador no permite compartir la ubicación. Envíanos la dirección de tu sede por WhatsApp.',
      })
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        const at: [number, number] = [coords.latitude, coords.longitude]
        const city = coverageCityAt(...at)
        setAnswer({ source: 'location', at, city: city?.name, province: city?.detail })
        onLocated?.(at)
        // La dirección llega después: el resultado ya se muestra con la provincia.
        void reverseGeocode(...at).then((address) =>
          setAnswer((current) =>
            current?.source === 'location' && current.at === at ? { ...current, address } : current,
          ),
        )
      },
      (error) => {
        setLocating(false)
        setAnswer({
          source: 'location-error',
          message:
            error.code === error.PERMISSION_DENIED
              ? 'No diste permiso para usar tu ubicación. Actívalo en tu navegador o envíanos la dirección de tu sede.'
              : 'No pudimos obtener tu ubicación. Intenta de nuevo o envíanos la dirección de tu sede.',
        })
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 0 },
    )
  }

  // Con ubicación, el mensaje lleva dirección aproximada, latitud, longitud y provincia.
  const whatsappHref = getWhatsAppHref(
    siteConfig.whatsappMessages.sede(
      answer?.source === 'location'
        ? { address: answer.address ?? null, lat: answer.at[0], lng: answer.at[1], province: answer.province }
        : undefined,
    ),
  )

  return { answer, locating, locate, whatsappHref }
}
