import { businessBenefits } from '@/data/content'
import '@/styles/empresas.css'

/**
 * Beneficios como ficha técnica del enlace: lo que una empresa revisa (y firma) antes de
 * contratar, en filas de garantía y condición. Las tres primeras son las garantías por contrato.
 */
export function CorporateBenefitsSection() {
  const groups = [
    { title: 'Garantías por contrato', items: businessBenefits.slice(0, 3), core: true },
    { title: 'Incluido en el servicio', items: businessBenefits.slice(3), core: false },
  ]
  return (
    <section id="beneficios-empresas" className="section empresas-benefits-section" aria-labelledby="beneficios-titulo">
      <div className="container empresas-spec-layout">
        <header className="section-header empresas-spec-header">
          <h2 id="beneficios-titulo" className="section-title">
            Lo que firmas con un enlace dedicado
          </h2>
          <p className="section-lead">
            Conectividad pensada para operar sin interrupciones, con las condiciones por escrito.
          </p>
        </header>

        <div className="empresas-spec">
          {groups.map((group) => (
            <div key={group.title} className="empresas-spec-block">
              <p className="empresas-spec-group">{group.title}</p>
              <dl className={`empresas-spec-list${group.core ? ' empresas-spec-list--core' : ''}`}>
                {group.items.map((benefit) => (
                  <div key={benefit.id} className="empresas-spec-row">
                    <dt>{benefit.title}</dt>
                    <dd>{benefit.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
