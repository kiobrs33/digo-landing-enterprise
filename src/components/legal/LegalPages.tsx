import { PageIntro } from '@/components/layout/PageIntro'
import { useState } from 'react'
import { officialNumbers, siteConfig } from '@/config/site'
import { osiptelUserNormsUrl, telecomLaws } from '@/data/content'
import { HoneypotField } from '@/components/ui/HoneypotField'
import { emailPattern, phonePattern, postToApi, useApiForm } from '@/hooks/useApiForm'
import '@/styles/legal.css'

const documentRules: Record<string, { pattern: RegExp; message: string }> = {
  DNI: { pattern: /^\d{8}$/, message: 'El DNI tiene 8 dígitos.' },
  CE: { pattern: /^[A-Za-z0-9]{8,12}$/, message: 'El carné de extranjería tiene de 8 a 12 caracteres.' },
  PASAPORTE: { pattern: /^[A-Za-z0-9]{6,12}$/, message: 'El pasaporte tiene de 6 a 12 caracteres.' },
  RUC: { pattern: /^(10|15|17|20)\d{9}$/, message: 'El RUC tiene 11 dígitos y empieza con 10, 15, 17 o 20.' },
}

const minLength = (min: number, message: string) => (value: string) =>
  value.length < min ? message : undefined

type ComplaintReceipt = { code: string; kind: 'RECLAMO' | 'QUEJA'; dueDate: string | null; receiptSent: boolean }

const formatDueDate = (iso: string) =>
  new Intl.DateTimeFormat('es-PE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))

export function ComplaintsBookForm() {
  const [isMinor, setIsMinor] = useState(false)
  const form = useApiForm({
    fields: {
      tipoDocumento: { required: true },
      numeroDocumento: {
        required: true,
        check: (value, values) => {
          const rule = documentRules[values.tipoDocumento]
          return rule && !rule.pattern.test(value) ? rule.message : undefined
        },
      },
      nombres: { required: true, check: minLength(3, 'Escribe tu nombre completo o razón social.') },
      domicilio: { required: true, check: minLength(5, 'Escribe tu dirección completa.') },
      email: { required: true, ...emailPattern },
      telefono: { required: true, ...phonePattern },
      apoderadoNombre: { check: (value, values) => (values.menor === 'on' && !value ? 'Completa este campo.' : undefined) },
      apoderadoDocumento: {
        check: (value, values) =>
          values.menor === 'on' && !/^[A-Za-z0-9]{6,12}$/.test(value) ? 'Escribe el número de documento.' : undefined,
      },
      tipoBien: { required: true },
      monto: {
        pattern: /^\d+([.,]\d{1,2})?$/,
        patternMessage: 'Escribe solo el monto, por ejemplo 59.00.',
      },
      descripcionBien: { required: true, check: minLength(3, 'Indica el servicio o producto, por ejemplo tu plan.') },
      tipoReclamo: { required: true },
      detalle: { required: true, check: minLength(10, 'Cuéntanos qué pasó con un poco más de detalle.') },
      pedido: { required: true, check: minLength(5, 'Indica qué solución esperas.') },
      acepta: { required: true },
    },
    submit: (values) =>
      postToApi<ComplaintReceipt>('/public/complaints', {
        site: 'EMPRESAS',
        kind: values.tipoReclamo,
        documentType: values.tipoDocumento,
        documentNumber: values.numeroDocumento,
        fullName: values.nombres,
        address: values.domicilio,
        email: values.email,
        phone: values.telefono,
        isMinor: values.menor === 'on',
        guardianName: values.menor === 'on' ? values.apoderadoNombre : undefined,
        guardianDocument: values.menor === 'on' ? values.apoderadoDocumento : undefined,
        itemType: values.tipoBien,
        amount: values.monto ? Number(values.monto.replace(',', '.')) : undefined,
        itemDescription: values.descripcionBien,
        detail: values.detalle,
        request: values.pedido,
        acceptsTerms: values.acepta === 'on',
        website: values.website,
      }),
  })
  const { handleSubmit, fieldProps, fieldError, serverNotice, submitting, result, statusRef } = form

  if (result) {
    const { data, values } = result
    const kind = data.kind === 'QUEJA' ? 'queja' : 'reclamo'
    return (
      <div ref={statusRef} className="legal-form float-card form-result" role="status" tabIndex={-1}>
        <p className="form-result-title">Registramos tu {kind}</p>
        <p>Número de hoja de reclamación:</p>
        <p className="form-result-code">{data.code}</p>
        <p>
          {data.receiptSent
            ? `Te enviamos la constancia a ${values.email}. Guárdala: el número identifica tu caso.`
            : `Guarda este número: identifica tu caso. Si no te llega la constancia a ${values.email}, escríbenos y te la reenviamos.`}
        </p>
        {data.dueDate && (
          <p>
            Te responderemos a ese correo a más tardar el <strong>{formatDueDate(data.dueDate)}</strong> (15
            días hábiles).
          </p>
        )}
        <div className="form-result-actions">
          <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
            Imprimir o guardar en PDF
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setIsMinor(false)
              form.reset()
            }}
          >
            Registrar otra hoja
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="legal-form float-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {serverNotice(
        <>
          Si no puedes registrarlo aquí, comunícate al{' '}
          {officialNumbers().map((number, index) => (
            <span key={number.id}>
              {index > 0 && ' o al '}
              <a href={number.tel}>{number.display}</a>
            </span>
          ))}{' '}
          o escribe a{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </>,
      )}

      <p className="form-hint">Los campos marcados como opcionales pueden quedar vacíos; el resto es obligatorio.</p>

      <fieldset>
        <legend>1. Datos del consumidor</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select id="tipoDocumento" defaultValue="" {...fieldProps('tipoDocumento')}>
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="DNI">DNI</option>
              <option value="CE">Carné de extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="RUC">RUC</option>
            </select>
            {fieldError('tipoDocumento')}
          </div>
          <div className="form-field">
            <label htmlFor="numeroDocumento">Número de documento</label>
            <input id="numeroDocumento" inputMode="text" maxLength={12} autoComplete="off" placeholder="Ej.: 45678912" {...fieldProps('numeroDocumento')} />
            {fieldError('numeroDocumento')}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="nombres">Nombres y apellidos / Razón social</label>
          <input id="nombres" autoComplete="name" maxLength={160} placeholder="Ej.: Agroexport Sur S.A.C." {...fieldProps('nombres')} />
          {fieldError('nombres')}
        </div>

        <div className="form-field">
          <label htmlFor="domicilio">Domicilio</label>
          <input id="domicilio" autoComplete="street-address" maxLength={250} placeholder="Calle, número, urbanización y distrito" {...fieldProps('domicilio')} />
          {fieldError('domicilio')}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" autoComplete="email" placeholder="nombre@correo.com" {...fieldProps('email')} />
            {fieldError('email')}
          </div>
          <div className="form-field">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="Ej.: 987 654 321" {...fieldProps('telefono')} />
            {fieldError('telefono')}
          </div>
        </div>

        <label className="form-check">
          <input
            type="checkbox"
            name="menor"
            checked={isMinor}
            onChange={(event) => setIsMinor(event.target.checked)}
          />
          <span>Soy menor de edad (registra el reclamo tu padre, madre o apoderado)</span>
        </label>

        {isMinor && (
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="apoderadoNombre">Nombre del padre, madre o apoderado</label>
              <input id="apoderadoNombre" maxLength={160} placeholder="Nombre y apellidos" {...fieldProps('apoderadoNombre')} />
              {fieldError('apoderadoNombre')}
            </div>
            <div className="form-field">
              <label htmlFor="apoderadoDocumento">Documento del apoderado</label>
              <input id="apoderadoDocumento" maxLength={12} placeholder="DNI o carné de extranjería" {...fieldProps('apoderadoDocumento')} />
              {fieldError('apoderadoDocumento')}
            </div>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend>2. Bien contratado</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="tipoBien">Tipo</label>
            <select id="tipoBien" defaultValue="SERVICIO" {...fieldProps('tipoBien')}>
              <option value="SERVICIO">Servicio</option>
              <option value="PRODUCTO">Producto</option>
            </select>
            {fieldError('tipoBien')}
          </div>
          <div className="form-field">
            <label htmlFor="monto">Monto reclamado en S/ (opcional)</label>
            <input id="monto" inputMode="decimal" placeholder="Ej.: 69.00" maxLength={10} {...fieldProps('monto')} />
            {fieldError('monto')}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="descripcionBien">Descripción</label>
          <input
            id="descripcionBien"
            placeholder="Ej.: enlace dedicado 300 Mbps"
            maxLength={300}
            {...fieldProps('descripcionBien')}
          />
          {fieldError('descripcionBien')}
        </div>
      </fieldset>

      <fieldset>
        <legend>3. Detalle del reclamo o queja</legend>
        <div className="form-field">
          <label htmlFor="tipoReclamo">Tipo</label>
          <select id="tipoReclamo" defaultValue="" {...fieldProps('tipoReclamo')}>
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="RECLAMO">Reclamo: no estoy conforme con el servicio o producto</option>
            <option value="QUEJA">Queja: no estoy conforme con la atención recibida</option>
          </select>
          {fieldError('tipoReclamo')}
        </div>

        <div className="form-field">
          <label htmlFor="detalle">Detalle</label>
          <textarea
            id="detalle"
            rows={5}
            maxLength={3000}
            placeholder="Ej.: El enlace dedicado de nuestra sede estuvo caído el 3 de octubre de 9:00 a 14:00."
            {...fieldProps('detalle')}
          />
          {fieldError('detalle')}
        </div>

        <div className="form-field">
          <label htmlFor="pedido">Pedido del consumidor</label>
          <textarea
            id="pedido"
            rows={3}
            maxLength={2000}
            placeholder="Ej.: Revisión técnica y descuento por las horas sin servicio."
            {...fieldProps('pedido')}
          />
          {fieldError('pedido')}
        </div>
      </fieldset>

      <div className="form-field">
        <label className="form-check">
          <input type="checkbox" {...fieldProps('acepta')} />
          <span>
            Declaro que los datos son verdaderos y acepto que {siteConfig.brand.name} los use para atender esta
            hoja de reclamación (Ley N° 29733).
          </span>
        </label>
        {fieldError('acepta')}
      </div>

      <HoneypotField />

      <p className="legal-form-note">
        Al enviar, recibirás la constancia en tu correo. {siteConfig.brand.legalName} (RUC {siteConfig.brand.ruc})
        responderá en un plazo máximo de 15 días hábiles. Formular un reclamo no impide acudir a otras vías
        de solución ni es requisito para presentar una denuncia ante el INDECOPI.
      </p>

      <button type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting}>
        {submitting ? 'Registrando…' : 'Registrar hoja de reclamación'}
      </button>
    </form>
  )
}

function LegalFramework() {
  return (
    <aside className="legal-aside" aria-labelledby="marco-legal-title">
      <h2 id="marco-legal-title">Tus derechos y plazos</h2>

      <div className="legal-deadlines">
        <p>
          <strong>Reclamos sobre el servicio de internet</strong> (calidad, cortes, facturación,
          instalación): se atienden según el reglamento de OSIPTEL, en 3, 15 o 20 días hábiles
          según el tema. Si no estás conforme, puedes apelar ante el TRASU.
        </p>
        <p>
          <strong>Otros reclamos y quejas</strong>: te respondemos en un máximo de 15 días
          hábiles.
        </p>
      </div>

      <h3>Normas aplicables</h3>
      <ul className="legal-laws">
        {telecomLaws.map((law) => (
          <li key={law.id}>
            <a href={law.href} target="_blank" rel="noopener noreferrer">
              <span className="legal-law-number">{law.number}</span>
              <span className="legal-law-name">{law.name}</span>
            </a>
            <p>{law.summary}</p>
          </li>
        ))}
      </ul>

      <p className="legal-aside-more">
        Consulta todas las normas para usuarios en el{' '}
        <a href={osiptelUserNormsUrl} target="_blank" rel="noopener noreferrer">
          portal de OSIPTEL
        </a>
        .
      </p>
    </aside>
  )
}

export function ComplaintsBookPageContent() {
  return (
    <main id="contenido" tabIndex={-1}>
      <PageIntro title="Libro de reclamaciones">
        <p>
          Conforme al Código de Protección y Defensa del Consumidor, {siteConfig.brand.name} pone a
          tu disposición este libro virtual para registrar reclamos y quejas.
        </p>
      </PageIntro>

      <div className="container legal-layout">
        <ComplaintsBookForm />
        <LegalFramework />
      </div>
    </main>
  )
}
