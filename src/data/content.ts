import { provinceBoundaries } from '@/data/provinceBoundaries'

/**
 * Contenido fijo de DIGO EMPRESAS (servicios, proceso, cobertura, marco legal). Lo administrable
 * (empresa, redes, planes) viene del panel: ver `src/data/cms`.
 */

export type Benefit = {
  id: string
  title: string
  description: string
}

/** Beneficios de Hogar: todos salen de afirmaciones ya presentes en planes, FAQ y OSIPTEL. */

/** Beneficios corporativos, tomados de los antiguos planes dedicados y del proceso B2B. */
export const businessBenefits: Benefit[] = [
  {
    id: 'ancho-banda',
    title: 'Ancho de banda garantizado',
    description: 'Enlaces dedicados de uso exclusivo, sin compartición, de 100 Mbps a 1 Gbps.',
  },
  {
    id: 'ip',
    title: 'IP pública fija',
    description: 'Desde una IP fija hasta bloques de IP dedicados para tus servidores.',
  },
  {
    id: 'sla',
    title: 'SLA por contrato',
    description: 'Disponibilidad de 99.5% a 99.9% por escrito, con penalidades en 1 Gbps.',
  },
  {
    id: 'soporte',
    title: 'Soporte prioritario 24/7',
    description: 'Línea directa para incidencias corporativas, a cualquier hora.',
  },
  {
    id: 'monitoreo',
    title: 'Monitoreo del enlace',
    description: 'Seguimiento activo de tu conexión desde el primer día.',
  },
  {
    id: 'evaluacion',
    title: 'Evaluación técnica en sitio',
    description: 'Un ingeniero valida la factibilidad antes de emitir la propuesta con RUC.',
  },
]

export type ProcessStep = {
  id: string
  step: string
  title: string
  description: string
}

export const corporateProcessSteps: ProcessStep[] = [
  {
    id: 'requerimiento',
    step: '01',
    title: 'Cuéntanos tu requerimiento',
    description:
      'Completa el formulario o escríbenos por WhatsApp con el ancho de banda, sedes y nivel de SLA que necesitas.',
  },
  {
    id: 'evaluacion',
    step: '02',
    title: 'Evaluación técnica en sitio',
    description:
      'Un ingeniero valida factibilidad de enlace dedicado en tu dirección y define la mejor arquitectura de red.',
  },
  {
    id: 'propuesta',
    step: '03',
    title: 'Propuesta formal con SLA',
    description:
      'Recibes una cotización con RUC, ancho de banda garantizado, IPs fijas y condiciones de disponibilidad por escrito.',
  },
  {
    id: 'activacion',
    step: '04',
    title: 'Instalación y activación',
    description:
      'Coordinamos la instalación del enlace y activamos monitoreo y soporte prioritario desde el día uno.',
  },
]

export type CorporateServiceIcon = 'wifi' | 'router' | 'shield' | 'phone' | 'server' | 'mappin'

export type CorporateService = {
  id: string
  title: string
  description: string
  icon: CorporateServiceIcon
}

export const corporateServices: CorporateService[] = [
  {
    id: 'ip-transito',
    title: 'IP Tránsito para ISP',
    description: 'Salida a internet mayorista para proveedores locales, con capacidad escalable.',
    icon: 'wifi',
  },
  {
    id: 'dedicado',
    title: 'Servicios dedicados para empresas',
    description:
      'Enlaces simétricos de uso exclusivo, sin compartición, con ancho de banda garantizado.',
    icon: 'router',
  },
  {
    id: 'seguridad-gestionada',
    title: 'Seguridad gestionada',
    description:
      'Protección y monitoreo de tu red corporativa, administrados por nuestro equipo técnico.',
    icon: 'shield',
  },
  {
    id: 'central-telefonica',
    title: 'Central telefónica',
    description: 'Telefonía IP corporativa integrada a tu enlace dedicado.',
    icon: 'phone',
  },
  {
    id: 'interconexion',
    title: 'Interconexión de servidores',
    description: 'Enlaces punto a punto entre sedes o centros de datos para tu infraestructura.',
    icon: 'server',
  },
  {
    id: 'colocacion',
    title: 'Colocación de equipos',
    description:
      'Alojamiento de tus equipos por ubicación, con condiciones adecuadas para su operación.',
    icon: 'mappin',
  },
]

/** Ciudades del sur del Perú con cobertura corporativa (coordenadas de centro de ciudad) */

/** Ciudades del sur del Perú con cobertura corporativa (coordenadas de centro de ciudad) */
export type CorporateCoverageCity = {
  id: string
  name: string
  /** Texto corto bajo el nombre en el panel de cobertura. */
  detail: string
  /** Punto de la ciudad (etiqueta en el mapa). */
  coordinates: [number, number]
  /** Área atendida: límite de la provincia. */
  area: [number, number][]
}

export const corporateCoverageCities: CorporateCoverageCity[] = [
  {
    id: 'arequipa',
    name: 'Arequipa',
    detail: 'Provincia de Arequipa',
    coordinates: [-16.409, -71.5375],
    area: provinceBoundaries.arequipa,
  },
  {
    id: 'moquegua',
    name: 'Moquegua',
    detail: 'Provincia de Mariscal Nieto',
    coordinates: [-17.1938, -70.9347],
    area: provinceBoundaries.mariscalNieto,
  },
  {
    id: 'mollendo',
    name: 'Mollendo',
    detail: 'Provincia de Islay',
    coordinates: [-17.0206, -72.0151],
    area: provinceBoundaries.islay,
  },
]

/** Ciudad cuya provincia contiene el punto (algoritmo de rayo sobre el límite provincial). */
export function coverageCityAt(lat: number, lng: number): CorporateCoverageCity | undefined {
  return corporateCoverageCities.find((city) => {
    let inside = false
    const points = city.area
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [latI, lngI] = points[i]
      const [latJ, lngJ] = points[j]
      if (lngI > lng !== lngJ > lng && lat < ((latJ - latI) * (lng - lngI)) / (lngJ - lngI) + latI) {
        inside = !inside
      }
    }
    return inside
  })
}

export type LegalReference = {
  id: string
  name: string
  number: string
  summary: string
  href: string
}

/**
 * Normas aplicables a reclamos de usuarios de internet en Perú, verificadas en fuentes
 * oficiales en septiembre de 2026. Revisar antes de cada lanzamiento: OSIPTEL las actualiza.
 */

/**
 * Normas aplicables a reclamos de usuarios de internet en Perú, verificadas en fuentes
 * oficiales en septiembre de 2026. Revisar antes de cada lanzamiento: OSIPTEL las actualiza.
 */
export const telecomLaws: LegalReference[] = [
  {
    id: 'ley-29571',
    name: 'Código de Protección y Defensa del Consumidor',
    number: 'Ley N° 29571',
    summary: 'Reconoce tus derechos como consumidor, incluido el Libro de Reclamaciones.',
    href: 'https://www.gob.pe/institucion/indecopi/normas-legales/1244218-29571',
  },
  {
    id: 'ley-31435',
    name: 'Plazo de atención de reclamos',
    number: 'Ley N° 31435',
    summary: 'El proveedor debe responder tu reclamo en máximo 15 días hábiles.',
    href: 'https://busquedas.elperuano.pe/dispositivo/NL/2050405-1',
  },
  {
    id: 'ds-011-2011',
    name: 'Reglamento del Libro de Reclamaciones',
    number: 'D.S. N° 011-2011-PCM y modificatorias',
    summary: 'Regula cómo registrar tu reclamo o queja y cómo debe responderte el proveedor.',
    href: 'https://busquedas.elperuano.pe/dispositivo/NL/2095978-1',
  },
  {
    id: 'res-099-2022',
    name: 'Reglamento de Gestiones y Reclamos de Usuarios de Telecomunicaciones',
    number: 'Res. N° 099-2022-CD/OSIPTEL',
    summary: 'Procedimiento para reclamos por calidad, cortes, facturación o instalación.',
    href: 'https://www.osiptel.gob.pe/media/t2adonsc/resol99-2022-cd-tuo-reglamento-reclamos.pdf',
  },
  {
    id: 'res-132-2025',
    name: 'Condiciones de Uso de los Servicios Públicos de Telecomunicaciones',
    number: 'Res. N° 132-2025-CD/OSIPTEL',
    summary: 'Tus derechos como abonado: contrato, baja, suspensión y devoluciones.',
    href: 'https://www.osiptel.gob.pe/media/wsgnkgqe/resol132-2025-cd.pdf',
  },
  {
    id: 'ley-31207',
    name: 'Velocidad mínima garantizada de internet',
    number: 'Ley N° 31207',
    summary: 'Tu operador debe garantizarte al menos el 70% de la velocidad contratada.',
    href: 'https://www.leyes.congreso.gob.pe/Documentos/2016_2021/ADLP/Normas_Legales/31207-LEY.pdf',
  },
  {
    id: 'res-214-2024',
    name: 'Reglamento General de Calidad de los Servicios de Telecomunicaciones',
    number: 'Res. N° 214-2024-CD/OSIPTEL',
    summary: 'Cómo se mide y exige la calidad y la velocidad mínima del servicio.',
    href: 'https://www.osiptel.gob.pe/media/mbsnzoiu/resol214-2024-cd.pdf',
  },
  {
    id: 'ds-013-93',
    name: 'Texto Único Ordenado de la Ley de Telecomunicaciones',
    number: 'D.S. N° 013-93-TCC',
    summary: 'Marco legal general de los servicios de telecomunicaciones en el Perú.',
    href: 'https://www.gob.pe/institucion/mtc/normas-legales/10028-013-1993-tcc',
  },
]

export const osiptelUserNormsUrl =
  'https://www.osiptel.gob.pe/portal-del-usuario/lo-que-debes-saber/normativas-de-usuarios/'
