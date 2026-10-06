import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

type DeferredMapProps = {
  /** Clase del contenedor del mapa: el marcador de posición reserva su mismo tamaño. */
  placeholderClassName: string
  children: ReactNode
}

/**
 * Monta el mapa (Leaflet y sus teselas) solo cuando la sección se acerca a la pantalla,
 * para sacarlo de la carga inicial. Debe envolver un componente cargado con `lazy()`.
 */
export function DeferredMap({ placeholderClassName, children }: DeferredMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || near) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true)
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [near])

  const placeholder = <div className={`${placeholderClassName} map-placeholder`} />

  return (
    <div ref={ref}>
      {near ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  )
}
