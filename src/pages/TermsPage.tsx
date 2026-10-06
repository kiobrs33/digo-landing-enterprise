import { Link } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { PendingNote } from '@/components/ui/PendingNote'
import { siteConfig } from '@/config/site'

export function TermsPage() {
  return (
    <PageShell>
      <main id="contenido" tabIndex={-1} className="page-legal">
        <div className="container">
          <Link viewTransition to="/" className="back-link">
            ← Volver al inicio
          </Link>
          <h1>Términos y condiciones del servicio</h1>
          <p>
            Este documento establece las condiciones generales bajo las cuales{' '}
            {siteConfig.brand.name} presta servicios de acceso a internet por fibra óptica en
            Arequipa, Perú.{' '}
            <PendingNote>
              Texto referencial: reemplazar por la versión revisada legalmente
            </PendingNote>
          </p>

          <h2>1. Objeto del contrato</h2>
          <p>
            El proveedor se obliga a suministrar el servicio de acceso a internet contratado con las
            características técnicas del plan elegido, incluyendo la velocidad simétrica indicada y
            el mínimo garantizado conforme a normativa OSIPTEL.
          </p>

          <h2>2. Cobertura y instalación</h2>
          <p>
            La prestación del servicio está sujeta a disponibilidad técnica en la dirección indicada
            por el abonado. Los plazos de instalación se comunican al confirmar la viabilidad.
          </p>

          <h2>3. Velocidad y calidad</h2>
          <p>{siteConfig.osiptelNotice}</p>

          <h2>4. Facturación y pagos</h2>
          <p>
            El abonado se obliga a pagar la tarifa correspondiente al plan contratado en los plazos
            establecidos. La mora puede generar suspensión del servicio según el contrato
            individual.
          </p>

          <h2>5. Reclamos</h2>
          <p>
            Para reclamos y quejas, utilice nuestro{' '}
            <Link viewTransition to="/libro-de-reclamaciones">
              Libro de reclamaciones
            </Link>{' '}
            virtual conforme a INDECOPI.
          </p>

          <h2>6. Modificaciones</h2>
          <p>
            {siteConfig.brand.name} podrá actualizar estos términos notificando al abonado por los
            canales habilitados. La continuidad del servicio implica aceptación de las
            modificaciones comunicadas.
          </p>
        </div>
      </main>
    </PageShell>
  )
}
