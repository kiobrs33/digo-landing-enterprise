import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function getStickyOffset() {
  const header = document.querySelector('.site-header')
  const headerHeight = header?.getBoundingClientRect().height ?? 0
  return headerHeight + 16
}

export function useActiveSection(sectionIds: readonly string[], ownPath: string = '/') {
  const { pathname } = useLocation()
  const [activeId, setActiveId] = useState<string | null>(null)
  const isOwnPage = pathname === ownPath

  useEffect(() => {
    if (!isOwnPage) return

    function updateActiveSection() {
      const offset = getStickyOffset()
      let current: string | null = null

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= offset) {
          current = id
        }
      }

      setActiveId(current)
    }

    // Un cálculo por fotograma como máximo, aunque el scroll dispare muchos eventos.
    let frame = 0
    function scheduleUpdate() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [isOwnPage, sectionIds])

  return isOwnPage ? activeId : null
}
