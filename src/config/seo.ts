import { siteConfig } from '@/config/site'
import { corporateCoverageCities } from '@/data/content'

/** Dirección canónica del sitio de DIGO EMPRESAS. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://digoempresas.pe').replace(/\/$/, '')

/** Imagen para vistas previas al compartir (WhatsApp, Facebook, LinkedIn): 1200×630. */
export const OG_IMAGE = `${SITE_URL}/brand/og-digo.jpg`

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Incluir en sitemap.xml. */
  indexable: boolean
}

const cityNames = corporateCoverageCities.map((city) => city.name)
const citiesText = `${cityNames.slice(0, -1).join(', ')} y ${cityNames[cityNames.length - 1]}`

/** Una entrada por ruta: única fuente de títulos, descripciones y del sitemap. */
export const pageMeta: PageMeta[] = [
  {
    path: '/',
    title: 'Internet dedicado para empresas en Arequipa — Digo Empresas',
    description: `Enlaces dedicados simétricos con IP fija, SLA por contrato y soporte 24/7 para empresas e instituciones en ${citiesText}. Cotización formal con RUC.`,
    indexable: true,
  },
  {
    path: '/libro-de-reclamaciones',
    title: 'Libro de reclamaciones — Digo Empresas',
    description:
      'Registra un reclamo o una queja en el Libro de Reclamaciones virtual de Digo Telecom, conforme a la normativa de INDECOPI y OSIPTEL.',
    indexable: true,
  },
  {
    path: '/terminos-y-condiciones',
    title: 'Términos y condiciones — Digo Empresas',
    description: 'Términos y condiciones del servicio de internet dedicado de Digo Telecom para empresas.',
    indexable: true,
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Página no encontrada — Digo Empresas',
  description: 'La página que buscas no existe o ya no está disponible.',
  indexable: false,
}

export function getPageMeta(pathname: string): PageMeta {
  return pageMeta.find((page) => page.path === pathname) ?? notFoundMeta
}

export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

/** El negocio, con los datos de contacto que se editan en el panel. */
function businessSchema() {
  const { contact, brand } = siteConfig
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#negocio`,
    name: brand.name,
    legalName: brand.legalName,
    taxID: brand.ruc,
    slogan: brand.tagline,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/digo-logo-256.png`,
    image: OG_IMAGE,
    sameAs: siteConfig.social.map((social) => social.href),
    telephone: contact.phone,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        contactType: 'sales',
        areaServed: 'PE',
        availableLanguage: 'es',
      },
    ],
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressRegion: 'Arequipa',
      addressCountry: 'PE',
    },
    areaServed: cityNames.map((name) => ({ '@type': 'Place', name })),
  }
}

function breadcrumbSchema(page: PageMeta) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title.split(' — ')[0],
        item: canonicalUrl(page.path),
      },
    ],
  }
}

/** JSON-LD de la ruta: el negocio en la portada; migas en las demás. */
export function structuredData(page: PageMeta) {
  const graph: object[] = [businessSchema()]
  if (page.path !== '/') graph.push(breadcrumbSchema(page))
  return { '@context': 'https://schema.org', '@graph': graph }
}
