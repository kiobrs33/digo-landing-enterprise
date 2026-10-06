import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type FabSurface = 'light' | 'dark'

/** Lee una medida de theme.css (p. ej. `--fab-size: 3rem`) en píxeles; cambia en móvil. */
function readRemVar(styles: CSSStyleDeclaration, name: string, fallbackRem: number) {
  const rem = parseFloat(styles.fontSize) || 16
  const value = parseFloat(styles.getPropertyValue(name))
  return (Number.isNaN(value) ? fallbackRem : value) * rem
}

function getFabProbePoint() {
  const styles = getComputedStyle(document.documentElement)
  const fabSize = readRemVar(styles, '--fab-size', 3.5)
  const fabInset = readRemVar(styles, '--fab-inset', 1.25)
  const fabGap = readRemVar(styles, '--fab-gap', 0.75)

  return {
    x: window.innerWidth - fabInset - fabSize / 2,
    y: window.innerHeight - fabInset - fabSize - fabGap - fabSize / 2,
  }
}

export function getFabSurfaceAtProbe(): FabSurface {
  const { x, y } = getFabProbePoint()
  const themed = document.querySelectorAll<HTMLElement>('[data-fab-surface]')

  for (const element of themed) {
    const rect = element.getBoundingClientRect()
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return element.dataset.fabSurface === 'dark' ? 'dark' : 'light'
    }
  }

  return 'light'
}

export function useFabSurface() {
  const { pathname } = useLocation()
  const [surface, setSurface] = useState<FabSurface>('light')

  useEffect(() => {
    function updateSurface() {
      setSurface(getFabSurfaceAtProbe())
    }

    let frame = 0
    function scheduleUpdate() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateSurface()
      })
    }

    updateSurface()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [pathname])

  return surface
}
