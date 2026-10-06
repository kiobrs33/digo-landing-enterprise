import { CorporateBenefitsSection } from '@/components/empresas/CorporateBenefitsSection'
import { CorporateCoverageSection } from '@/components/empresas/CorporateCoverageSection'
import { CorporateProcessSection } from '@/components/empresas/CorporateProcessSection'
import { CorporateServicesSection } from '@/components/empresas/CorporateServicesSection'
import { EmpresasHeroSection } from '@/components/empresas/EmpresasHeroSection'
import { Link } from 'react-router-dom'
import { CheckCircleIcon, ClockIcon, HeadsetIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons/Icons'
import { HoneypotField } from '@/components/ui/HoneypotField'
import { getWhatsAppHref, officialNumbers, siteConfig } from '@/config/site'
import { emailPattern, phonePattern, postToApi, useApiForm } from '@/hooks/useApiForm'
import '@/styles/empresas.css'

export function EmpresasPageContent() {
  const form = useApiForm({
    fields: {
      empresa: {
        required: true,
        check: (value) => (value.length < 2 ? 'Escribe la razón social completa.' : undefined),
      },
      ruc: {
        required: true,
        pattern: /^(10|15|17|20)\d{9}$/,
        patternMessage: 'El RUC tiene 11 dígitos y empieza con 10, 15, 17 o 20.',
      },
      contacto: { required: true },
      telefono: { required: true, ...phonePattern },
      email: emailPattern,
      requerimientos: {
        required: true,
        check: (value) =>
          value.length < 5 ? 'Cuéntanos qué necesitas: velocidad, sedes, IPs fijas…' : undefined,
      },
      privacidad: { required: true },
    },
    submit: (values) =>
      postToApi<{ id: string }>('/public/contact', {
        site: 'EMPRESAS',
        company: values.empresa,
        ruc: values.ruc,
        name: values.contacto,
        phone: values.telefono,
        email: values.email || undefined,
        message: values.requerimientos,
        acceptsPrivacy: values.privacidad === 'on',
        website: values.website,
      }),
  })
  const { handleSubmit, fieldProps, fieldError, serverNotice, submitting, result, statusRef } = form
  const numbers = officialNumbers()

  return (
    <main id="contenido" tabIndex={-1}>
      <EmpresasHeroSection />

      <CorporateBenefitsSection />

      <CorporateServicesSection />

      <CorporateProcessSection />

      <CorporateCoverageSection />

      <section id="contacto-empresas" className="section empresas-form-section">
        <div className="container empresas-form-grid">
          <div className="empresas-form-copy">
            <header className="section-header">
              <h2 className="section-title">Cotiza tu enlace dedicado</h2>
              <p className="section-lead">
                Completa los datos de tu empresa. Un asesor B2B te contactará con una propuesta
                formal.
              </p>
            </header>

            <ul className="empresas-form-assurance">
              <li>
                <CheckCircleIcon />
                <span>Respuesta de un asesor corporativo en menos de 24 horas hábiles</span>
              </li>
              <li>
                <HeadsetIcon />
                <span>
                  ¿Prefieres hablar directo? Escríbenos por WhatsApp al{' '}
                  {numbers.map((number, index) => (
                    <span key={number.id}>
                      {index > 0 && ' o al '}
                      <a href={number.whatsapp} target="_blank" rel="noopener noreferrer">
                        {number.display}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <ClockIcon />
                <span>Evaluación técnica en sitio antes de emitir la propuesta final</span>
              </li>
            </ul>

            {/* Canales directos: para quien prefiere hablar antes de llenar un formulario. */}
            <div className="empresas-direct">
              <p className="empresas-direct-title">Contacto directo</p>
              <ul>
                {/* Los dos números oficiales: cada uno sirve para llamar y para WhatsApp. */}
                {numbers.map((number) => (
                  <li key={number.id}>
                    <span className="empresas-direct-number">
                      <span>{number.label}</span>
                      <strong>{number.display}</strong>
                    </span>
                    <span className="empresas-direct-actions">
                      <a href={number.tel} aria-label={`Llamar al ${number.display}`}>
                        <PhoneIcon />
                        Llamar
                      </a>
                      <a
                        href={number.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp al ${number.display}`}
                      >
                        <WhatsAppIcon />
                        WhatsApp
                      </a>
                    </span>
                  </li>
                ))}
                <li>
                  <span className="empresas-direct-number">
                    <span>Correo</span>
                    <strong>{siteConfig.contact.email}</strong>
                  </span>
                  <span className="empresas-direct-actions">
                    <a href={`mailto:${siteConfig.contact.email}`} aria-label={`Escribir a ${siteConfig.contact.email}`}>
                      <MailIcon />
                      Escribir
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {result ? (
            <div ref={statusRef} className="empresas-form form-result" role="status" tabIndex={-1}>
              <p className="form-result-title">Recibimos tu solicitud</p>
              <p>
                Un asesor corporativo revisará los requerimientos de {result.values.empresa} y te
                contactará al {result.values.telefono} con una propuesta formal.
              </p>
              <p>¿Quieres adelantar la conversación? Escríbenos por WhatsApp.</p>
              <div className="form-result-actions">
                <a
                  href={getWhatsAppHref(siteConfig.whatsappMessages.seguimiento(result.values.empresa))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <WhatsAppIcon />
                  Conversar por WhatsApp
                </a>
                <button type="button" className="btn btn-secondary" onClick={form.reset}>
                  Enviar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form className="empresas-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
              {serverNotice()}

              <p className="form-hint">El correo es opcional; el resto de campos es obligatorio.</p>

              <div className="form-field">
                <label htmlFor="empresa">Razón social</label>
                <input id="empresa" type="text" autoComplete="organization" maxLength={160} {...fieldProps('empresa')} />
                {fieldError('empresa')}
              </div>

              <div className="form-field">
                <label htmlFor="ruc">RUC</label>
                <input
                  id="ruc"
                  type="text"
                  inputMode="numeric"
                  placeholder="11 dígitos"
                  maxLength={11}
                  {...fieldProps('ruc')}
                />
                {fieldError('ruc')}
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contacto">Persona de contacto</label>
                  <input id="contacto" type="text" autoComplete="name" maxLength={120} {...fieldProps('contacto')} />
                  {fieldError('contacto')}
                </div>

                <div className="form-field">
                  <label htmlFor="telefono">Teléfono</label>
                  <input id="telefono" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} {...fieldProps('telefono')} />
                  {fieldError('telefono')}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Correo corporativo (opcional)</label>
                <input id="email" type="email" autoComplete="email" {...fieldProps('email')} />
                {fieldError('email')}
              </div>

              <div className="form-field">
                <label htmlFor="requerimientos">Requerimientos técnicos</label>
                <textarea
                  id="requerimientos"
                  rows={4}
                  maxLength={2000}
                  placeholder="Ej: 500 Mbps dedicado, 2 IPs fijas, SLA 99.7%, sede en Arequipa"
                  {...fieldProps('requerimientos')}
                />
                {fieldError('requerimientos')}
              </div>

              <div className="form-field">
                <label className="form-check">
                  <input type="checkbox" {...fieldProps('privacidad')} />
                  <span>
                    Acepto que Digo Telecom use estos datos para preparar la cotización (Ley N° 29733).{' '}
                    <Link to="/terminos-y-condiciones">Ver términos</Link>
                  </span>
                </label>
                {fieldError('privacidad')}
              </div>

              <HoneypotField />

              <button type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Enviando…' : 'Solicitar cotización'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
