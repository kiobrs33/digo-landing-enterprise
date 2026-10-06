import { corporateProcessSteps } from '@/data/content'
import '@/styles/empresas.css'

export function CorporateProcessSection() {
  return (
    <section
      id="proceso-empresas"
      className="section empresas-process-section theme-space starfield"
      data-fab-surface="dark"
    >
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Cómo contratamos tu enlace dedicado</h2>
          <p className="section-lead">
            Un proceso formal, de la primera consulta a la activación del servicio.
          </p>
        </header>

        <ol className="empresas-process-list">
          {corporateProcessSteps.map((item) => (
            <li key={item.id} className="empresas-process-step">
              <span className="empresas-process-step-number" aria-hidden="true">
                {item.step}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
