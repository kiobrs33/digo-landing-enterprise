/**
 * Contenido administrable desde el panel (digo-landing-backend). `site-content.json` lo escribe
 * `scripts/fetch-content.mjs` antes de cada build; aquí se tipa y se adapta a las formas que usan
 * los componentes. Para cambiar planes, carrusel, redes, fotos o datos de contacto: panel →
 * Contenido → Publicar.
 */
import snapshot from './site-content.json'

export type CmsImage = { url: string; width: number; height: number; alt: string }

export type CmsCompany = {
  name: string
  shortName: string
  tagline: string
  legalName: string
  ruc: string
  address: string
  email: string
  phone: string
  phoneDisplay: string
  mobile: string | null
  mobileDisplay: string | null
  whatsapp: string
  whatsappDisplay: string
  advisorName: string | null
  website: string
  logo: CmsImage | null
}

export type CmsPlan = {
  id: string
  name: string
  downloadMbps: number
  uploadMbps: number
  price: number
  promoPrice: number | null
  promoMonths: number | null
  badge: string | null
  tvPackage: string | null
  features: string[]
  highlighted: boolean
}

export type CmsSlide = {
  id: string
  title: string
  subtitle: string | null
  image: CmsImage
  ctaKind: 'WHATSAPP' | 'LINK' | 'NONE'
  ctaLabel: string | null
  ctaValue: string | null
  startsAt: string | null
  endsAt: string | null
}

export type CmsSocialNetwork = 'FACEBOOK' | 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE' | 'LINKEDIN' | 'X' | 'OTRA'

export type CmsSocialLink = {
  id: string
  network: CmsSocialNetwork
  label: string
  url: string
  icon: CmsImage | null
}

export type CmsAboutPhoto = {
  id: string
  category: 'EQUIPO' | 'PROYECTOS' | 'OFICINAS' | 'ACTIVIDADES'
  caption: string | null
  image: CmsImage
}

export type SiteContent = {
  site: 'EMPRESAS'
  company: CmsCompany
  plans: CmsPlan[]
  carousel: CmsSlide[]
  social: CmsSocialLink[]
  aboutPhotos: CmsAboutPhoto[]
}

export const siteContent = snapshot as SiteContent

/**
 * URL de una imagen a un ancho dado. Las de Cloudinary se piden ya redimensionadas y en el mejor
 * formato para el navegador (WebP/AVIF); las del modo local de desarrollo se usan tal cual.
 */
export function imageUrl(url: string, width?: number): string {
  const marker = '/image/upload/'
  if (!url.includes('res.cloudinary.com') || !url.includes(marker)) return url
  const transform = ['f_auto', 'q_auto', width ? `w_${width}` : null].filter(Boolean).join(',')
  return url.replace(marker, `${marker}${transform}/`)
}

/** `srcset` con anchos fijos (solo Cloudinary; en local devuelve undefined). */
export function imageSrcSet(url: string, widths: number[]): string | undefined {
  if (!url.includes('res.cloudinary.com')) return undefined
  return widths.map((width) => `${imageUrl(url, width)} ${width}w`).join(', ')
}

/** Una pieza programada se muestra solo dentro de sus fechas. */
export function isSlideLive(slide: Pick<CmsSlide, 'startsAt' | 'endsAt'>, now = Date.now()): boolean {
  if (slide.startsAt && new Date(slide.startsAt).getTime() > now) return false
  if (slide.endsAt && new Date(slide.endsAt).getTime() <= now) return false
  return true
}
