import { lazy, useState } from 'react'
import { ExpandIcon, LocateIcon, MapPinIcon, WhatsAppIcon } from '@/components/icons/Icons'
import type { CoverageFocus } from '@/components/empresas/CorporateCoverageMap'
import { DeferredMap } from '@/components/ui/DeferredMap'
import { corporateCoverageCities } from '@/data/content'
import { useSedeLocate } from '@/hooks/useSedeLocate'
import '@/styles/empresas.css'

const CorporateCoverageMap = lazy(() =>
  import('@/components/empresas/CorporateCoverageMap').then((module) => ({
    default: module.CorporateCoverageMap,
  })),
)

/**
 * Cobertura corporativa: a la izquierda las ciudades (cada una acerca el mapa) y la consulta de
 * factibilidad para una sede concreta; a la derecha el mapa.
 */
export function CorporateCoverageSection() {
  const [focus, setFocus] = useState<CoverageFocus>({ kind: 'all' })
  const [hoverId, setHoverId] = useState<string | null>(null)
  const { answer, locating, locate, whatsappHref } = useSedeLocate((at) => setFocus({ kind: 'point', at }))
  const selectedId = focus.kind === 'city' ? focus.id : null
  const selectedCity = corporateCoverageCities.find((city) => city.id === selectedId)

  return (
    <section id="cobertura-empresas" className="section empresas-coverage-section" aria-labelledby="cobertura-titulo">
      <div className="container">
        <header className="section-header">
          <h2 id="cobertura-titulo" className="section-title">
            Cobertura corporativa
          </h2>
          <p className="section-lead">
            Atendemos enlaces dedicados en las provincias de Arequipa, Mariscal Nieto (Moquegua) e Islay (Mollendo).
            Envíanos la ubicación de tu sede y un ingeniero evalúa la factibilidad.
          </p>
        </header>

        <div className="empresas-coverage-layout">
          <div className="empresas-coverage-panel">
            <h3 className="empresas-coverage-panel-title">Provincias con enlace dedicado</h3>
            <p className="empresas-coverage-hint">
              {corporateCoverageCities.length} provincias del sur. Toca una para acercarte en el mapa.
            </p>

            <ul className="empresas-coverage-cities" aria-label="Provincias con enlace dedicado">
              <li>
                <button
                  type="button"
                  className="empresas-coverage-city"
                  aria-pressed={focus.kind === 'all'}
                  onClick={() => setFocus({ kind: 'all' })}
                >
                  <ExpandIcon />
                  Todas
                </button>
              </li>
              {corporateCoverageCities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    className="empresas-coverage-city"
                    aria-pressed={selectedId === city.id}
                    aria-describedby={selectedId === city.id ? 'empresas-coverage-note' : undefined}
                    onClick={() => setFocus({ kind: 'city', id: city.id })}
                    onMouseEnter={() => setHoverId(city.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onFocus={() => setHoverId(city.id)}
                    onBlur={() => setHoverId(null)}
                  >
                    <span className="empresas-coverage-city-node" aria-hidden="true" />
                    {city.name}
                  </button>
                </li>
              ))}
            </ul>
            {selectedCity && (
              <p id="empresas-coverage-note" className="empresas-coverage-note">
                {selectedCity.detail}
              </p>
            )}

            <div className="empresas-coverage-send">
              <p className="empresas-coverage-send-title">¿Estás en la sede que quieres conectar?</p>
              <button
                type="button"
                className="btn btn-primary empresas-coverage-send-cta"
                onClick={locate}
                disabled={locating}
                aria-busy={locating}
              >
                <LocateIcon />
                {locating ? 'Buscando tu ubicación…' : 'Usar mi ubicación'}
              </button>

              <div aria-live="polite">
                {answer?.source === 'location' ? (
                  <div
                    className={`empresas-coverage-result${answer.province ? ' empresas-coverage-result--in' : ''}`}
                    role="status"
                  >
                    <p>
                      {answer.province ? (
                        <>
                          <strong>Tu sede está en la {answer.province}.</strong> Envíanos la dirección y un
                          ingeniero evalúa la factibilidad.
                        </>
                      ) : (
                        <>
                          <strong>También evaluamos sedes fuera de estas provincias.</strong> Envíanos la
                          dirección y lo revisamos.
                        </>
                      )}
                    </p>
                    {answer.address !== null && (
                      <p className="empresas-coverage-result-place">
                        {answer.address === undefined ? (
                          'Buscando el nombre de tu dirección…'
                        ) : (
                          <>
                            <span>Tu ubicación:</span> {answer.address}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                ) : answer ? (
                  <div className="empresas-coverage-result" role="status">
                    <p>{answer.message}</p>
                  </div>
                ) : null}
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="empresas-coverage-whatsapp"
                aria-label="Enviar la dirección de la sede por WhatsApp"
              >
                <WhatsAppIcon />
                Enviar dirección de la sede
              </a>
            </div>
          </div>

          <div className="empresas-coverage-map-wrap">
            <p className="empresas-coverage-chip" aria-hidden="true">
              <MapPinIcon />
              Cobertura corporativa
            </p>
            <DeferredMap placeholderClassName="empresas-coverage-map">
              <CorporateCoverageMap
                focus={focus}
                activeCityId={hoverId ?? selectedId}
                userPosition={answer?.source === 'location' ? answer.at : null}
                onSelectCity={(id) => setFocus({ kind: 'city', id })}
              />
            </DeferredMap>
          </div>
        </div>
      </div>
    </section>
  )
}
