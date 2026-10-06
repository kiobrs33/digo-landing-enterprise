import {
  BoltIcon,
  CheckCircleIcon,
  ChevronIcon,
  ClockIcon,
  LandmarkIcon,
  MapPinIcon,
  ShieldIcon,
  SymmetricIcon,
  WhatsAppIcon,
  WifiIcon,
} from '@/components/icons/Icons'
import { GalaxyScene } from '@/components/landing/GalaxyScene'
import { corporateCoverageCities } from '@/data/content'
import { getWhatsAppHref } from '@/config/site'
import { useOnScreen } from '@/hooks/useOnScreen'
import '@/styles/empresas.css'

/** Mejor disponibilidad ofrecida por contrato (enlace dedicado de 1 Gbps). */
const BEST_SLA = '99.9'
/** Mayor velocidad de enlace dedicado (los enlaces van de 100 Mbps a 1 Gbps). */
const TOP_SPEED = { value: '1', unit: 'Gbps' }

const cityNames = corporateCoverageCities.map((city) => city.name)
const coverageCitiesText = `${cityNames.slice(0, -1).join(', ')} y ${cityNames[cityNames.length - 1]}`

const serviceFacts = [
  { icon: ShieldIcon, title: `SLA hasta ${BEST_SLA}%`, detail: 'por contrato' },
  { icon: WifiIcon, title: 'IP fija incluida', detail: 'en todos los enlaces' },
  { icon: ClockIcon, title: 'Soporte 24/7', detail: 'línea prioritaria' },
  { icon: BoltIcon, title: 'Ancho de banda garantizado', detail: 'sin compartición' },
]

/**
 * Diagrama del enlace dedicado: tu sede y la red Digo unidas por una fibra propia. Los pulsos
 * viajan en los dos sentidos a la vez (simétrico) y las garantías del servicio se leen sobre la
 * fibra. Los pulsos se detienen fuera de pantalla y con movimiento reducido.
 */
function DedicatedLinkDiagram() {
  const [ref, live] = useOnScreen<HTMLElement>()

  return (
    <aside
      ref={ref}
      className="empresas-link"
      aria-label="Tu enlace dedicado Digo"
      data-live={live}
    >
      <div className="fiber-endpoint">
        <span className="fiber-node" aria-hidden="true" />
        <p>
          <strong>Tu empresa</strong>
          <span>Tu sede, con IP pública fija</span>
        </p>
      </div>

      <ul className="empresas-link-fiber fiber-track" aria-label="Nivel de servicio">
        <li className="empresas-link-speed">
          <SymmetricIcon />
          <span>
            <span className="empresas-link-speed-value">
              {TOP_SPEED.value}
              <span>{TOP_SPEED.unit}</span>
            </span>
            <span className="empresas-link-speed-note">
              Enlaces de 100 Mbps a 1 Gbps, igual de subida que de bajada
            </span>
          </span>
        </li>
        {serviceFacts.map(({ icon: Icon, title, detail }) => (
          <li key={title}>
            <Icon />
            <span>
              <strong>{title}</strong> {detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="fiber-endpoint">
        <span className="fiber-node fiber-node--sink" aria-hidden="true" />
        <p>
          <strong>Red Digo</strong>
          <span>Enlace simétrico de uso exclusivo</span>
        </p>
      </div>
    </aside>
  )
}

export function EmpresasHeroSection() {
  return (
    <section
      id="empresas-inicio"
      className="hero-galaxy empresas-hero theme-space"
      data-fab-surface="dark"
      aria-labelledby="empresas-hero-title"
    >
      {/* La misma galaxia de Hogar, a la velocidad de un enlace dedicado de 1 Gbps. */}
      <GalaxyScene speed={1} />

      <div className="container hero-galaxy-inner">
        <div className="hero-galaxy-copy">
          <h1 id="empresas-hero-title" className="hero-galaxy-title empresas-hero-title">
            Internet dedicado para tu empresa
          </h1>
          <p className="hero-galaxy-lead">
            Enlaces simétricos de uso exclusivo, con IP fija y SLA por escrito. Un ingeniero evalúa tu
            sede antes de cotizar.
          </p>

          <div className="hero-galaxy-actions">
            <a href="#contacto-empresas" className="btn btn-primary btn-lg">
              Solicitar cotización
              <ChevronIcon direction="right" />
            </a>
            <a
              href={getWhatsAppHref()}
              className="btn btn-secondary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Cotizar por WhatsApp
            </a>
          </div>

          <ul className="hero-chips" aria-label="Para quién es el servicio">
            <li>
              <LandmarkIcon />
              Empresas e instituciones del Estado
            </li>
            <li>
              <MapPinIcon />
              {coverageCitiesText}
            </li>
            <li>
              <CheckCircleIcon />
              Cotización formal con RUC
            </li>
          </ul>
        </div>

        <DedicatedLinkDiagram />
      </div>
    </section>
  )
}
