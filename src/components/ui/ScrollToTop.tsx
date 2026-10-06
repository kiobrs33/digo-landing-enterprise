import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpIcon } from '@/components/icons/Icons'
import { useFabSurface } from '@/hooks/useFabSurface'

export function ScrollToTopOnNavigate() {
  const location = useLocation()

  // Layout effect: el scroll se reinicia antes del cuadro nuevo de la transición de vista.
  useLayoutEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const scrollToSection = () => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToSection)
      })
      return
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const surface = useFabSurface()

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`floating-fab scroll-top-btn scroll-top-btn--on-${surface}${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <ArrowUpIcon />
    </button>
  )
}
