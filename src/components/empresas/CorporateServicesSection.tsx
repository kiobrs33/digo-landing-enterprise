import {
  ChevronIcon,
  MapPinIcon,
  PhoneIcon,
  RouterIcon,
  ServerIcon,
  ShieldIcon,
  WifiIcon,
} from '@/components/icons/Icons'
import { corporateServices, type CorporateServiceIcon } from '@/data/content'
import '@/styles/empresas.css'

function ServiceIcon({ icon }: { icon: CorporateServiceIcon }) {
  switch (icon) {
    case 'wifi':
      return <WifiIcon />
    case 'router':
      return <RouterIcon />
    case 'shield':
      return <ShieldIcon />
    case 'phone':
      return <PhoneIcon />
    case 'server':
      return <ServerIcon />
    case 'mappin':
      return <MapPinIcon />
  }
}

export function CorporateServicesSection() {
  return (
    <section id="servicios-empresas" className="section empresas-services-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Servicios para empresas e instituciones</h2>
          <p className="section-lead">
            Infraestructura de conectividad a medida, más allá del internet dedicado.
          </p>
        </header>

        <div className="empresas-services-grid">
          {corporateServices.map((service) => (
            <article key={service.id} className="empresas-service-card">
              <span className="empresas-service-icon">
                <ServiceIcon icon={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <div className="empresas-services-cta">
          <p>
            <strong>¿Tu proyecto necesita otra cosa?</strong> Cuéntanos qué quieres conectar y lo
            evaluamos contigo.
          </p>
          <a href="#contacto-empresas" className="btn btn-secondary">
            Contar mi proyecto
            <ChevronIcon direction="right" />
          </a>
        </div>
      </div>
    </section>
  )
}
