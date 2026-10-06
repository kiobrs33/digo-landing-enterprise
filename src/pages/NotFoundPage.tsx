import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '@/components/icons/Icons'
import { PageIntro } from '@/components/layout/PageIntro'
import { PageShell } from '@/components/layout/PageShell'
import { getWhatsAppHref } from '@/config/site'

/**
 * Cualquier ruta que no existe. En producción Vercel la sirve con estado 404 (o 410 para las
 * URLs heredadas de sitios anteriores del dominio), así Google la descarta.
 */
export function NotFoundPage() {
  return (
    <PageShell>
      <main id="contenido" tabIndex={-1}>
        <PageIntro title="Página no encontrada">
          <p>La página que buscas no existe o ya no está disponible.</p>
        </PageIntro>
        <section className="section not-found-section">
          <div className="container not-found-actions">
            <Link viewTransition to="/" className="btn btn-primary">
              Ir al inicio
            </Link>
            <Link
              viewTransition
              to={{ pathname: '/', hash: '#contacto-empresas' }}
              className="btn btn-secondary"
            >
              Solicitar cotización
            </Link>
            <a
              href={getWhatsAppHref()}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
