/**
 * Dirección aproximada de unas coordenadas, con Nominatim (OpenStreetMap). Solo se llama cuando
 * el visitante pulsa "Usar mi ubicación", así se respeta el límite de uso del servicio
 * (1 consulta por segundo). Si falla, devuelve null: la consulta sigue con las coordenadas.
 */
type NominatimAddress = Partial<
  Record<
    | 'road'
    | 'pedestrian'
    | 'house_number'
    | 'neighbourhood'
    | 'suburb'
    | 'quarter'
    | 'city_district'
    | 'town'
    | 'city'
    | 'county',
    string
  >
>

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lng),
    zoom: '18',
    addressdetails: '1',
    'accept-language': 'es',
  })
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) return null
    const data = (await response.json()) as { address?: NominatimAddress; display_name?: string }
    const a = data.address
    if (!a) return data.display_name ?? null

    // "Av. Salaverry 120, Alto Socabaya, Socabaya": calle y número, barrio y distrito.
    const street = [a.road ?? a.pedestrian, a.house_number].filter(Boolean).join(' ')
    const area = a.neighbourhood ?? a.suburb ?? a.quarter
    const district = a.city_district ?? a.town ?? a.city ?? a.county
    const parts = [street, area, district].filter((part, index, all) => part && all.indexOf(part) === index)
    return parts.length ? parts.join(', ') : (data.display_name ?? null)
  } catch {
    return null
  }
}
