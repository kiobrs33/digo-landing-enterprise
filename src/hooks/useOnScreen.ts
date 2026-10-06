import { useEffect, useRef, useState } from 'react'

/**
 * `true` mientras el elemento está en pantalla. Sirve para detener animaciones en bucle (los
 * pulsos de fibra) cuando nadie las ve.
 */
export function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null)
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry?.isIntersecting ?? true),
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, onScreen] as const
}
