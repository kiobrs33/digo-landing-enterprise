import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getWhatsAppHref, siteConfig } from '@/config/site'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFab } from '@/components/ui/FloatingActions'
import { canonicalUrl, getPageMeta } from '@/config/seo'
import { ScrollToTopButton } from '@/components/ui/ScrollToTop'

type PageShellProps = {
  children: ReactNode
}

function setMeta(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value)
}

/**
 * Título, descripción y canónica de la ruta salen de `src/config/seo.ts`. El HTML de build ya
 * los trae; esto los mantiene al navegar dentro del sitio sin recargar.
 */
export function PageShell({ children }: PageShellProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getPageMeta(pathname)
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl(meta.path))
    setMeta('link[rel="canonical"]', 'href', canonicalUrl(meta.path))
  }, [pathname])

  const whatsappLabel = `Solicitar cotización por WhatsApp a ${siteConfig.brand.name}`

  return (
    <div className="page page-bg page--empresas">
      <SiteHeader />
      {children}
      <SiteFooter />
      <ScrollToTopButton />
      <WhatsAppFab href={getWhatsAppHref()} label={whatsappLabel} />
    </div>
  )
}
