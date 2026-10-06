import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '@/components/icons/Icons'
import { hogarUrl, siteConfig } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import '@/styles/layout.css'

const navLinks = siteConfig.nav
const ownPath = '/'
const sectionIds = navLinks.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1))

type NavLinkItemProps = {
  isOwnPage: boolean
  ownPath: string
  isActive: boolean
  href: string
  label: string
  onNavigate: () => void
}

function NavLinkItem({ isOwnPage, ownPath, isActive, href, label, onNavigate }: NavLinkItemProps) {
  // Vista aparte: enlace de ruta, activo cuando coincide la URL.
  if (href.startsWith('/')) {
    return (
      <NavLink
        viewTransition
        to={href}
        className={({ isActive: isRoute }) => (isRoute ? 'is-active' : undefined)}
        onClick={onNavigate}
      >
        {label}
      </NavLink>
    )
  }

  if (isOwnPage) {
    return (
      <a
        href={href}
        className={isActive ? 'is-active' : undefined}
        aria-current={isActive ? 'location' : undefined}
        onClick={onNavigate}
      >
        {label}
      </a>
    )
  }

  return (
    <Link to={{ pathname: ownPath, hash: href }} onClick={onNavigate}>
      {label}
    </Link>
  )
}

/** DIGO HOGAR vive en su propio dominio. */
function HogarButton({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <a href={hogarUrl} className={className} onClick={onNavigate}>
      Para tu hogar
    </a>
  )
}

export function SiteHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isOwnPage = location.pathname === ownPath
  const activeSectionId = useActiveSection(sectionIds, ownPath)

  // Cerrar el menú al navegar (ajuste durante el render, sin efecto extra).
  const locationKey = `${location.pathname}${location.hash}`
  const [menuLocation, setMenuLocation] = useState(locationKey)
  if (menuLocation !== locationKey) {
    setMenuLocation(locationKey)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Menú móvil: el foco entra al panel, queda atrapado entre el botón y los enlaces,
  // y Escape lo cierra devolviendo el foco al botón.
  useEffect(() => {
    if (!menuOpen) return
    const toggle = toggleRef.current
    const drawer = drawerRef.current
    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
    ]
    focusables()[1]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggle?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function dismissMenu() {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  function renderNavLinks(variant: 'desktop' | 'mobile') {
    return navLinks.map((link) => {
      const sectionId = link.href.replace('#', '')
      const isActive = isOwnPage && activeSectionId === sectionId

      return (
        <li key={`${variant}-${link.href}`}>
          <NavLinkItem
            isOwnPage={isOwnPage}
            ownPath={ownPath}
            isActive={isActive}
            href={link.href}
            label={link.label}
            onNavigate={closeMenu}
          />
        </li>
      )
    })
  }

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header
        className={`site-header theme-space site-header--empresas${menuOpen ? ' site-header--menu-open' : ''}`}
      >
        <div className="container site-header-inner">
          <Link
            viewTransition
            to="/"
            className="site-logo"
            aria-label={`${siteConfig.brand.name} — inicio`}
          >
            <img
              className="site-logo-mark"
              src={siteConfig.brand.logoUrl}
              alt=""
              width={40}
              height={40}
              decoding="async"
            />
            <span className="site-logo-word">{siteConfig.brand.shortName}</span>
          </Link>

          <nav className="site-nav site-nav--desktop" aria-label="Secciones principales">
            <ul>{renderNavLinks('desktop')}</ul>
          </nav>

          <div className="site-header-actions site-header-actions--desktop">
            <HogarButton className="btn btn-sm btn-nav-empresas" />
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="site-nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          ref={drawerRef}
          id="mobile-nav"
          className={`site-mobile-drawer${menuOpen ? ' is-open' : ''}`}
          inert={!menuOpen}
        >
          <div className="container site-mobile-drawer-inner">
            <nav aria-label="Menú móvil">
              <ul className="site-mobile-nav-list">
                {renderNavLinks('mobile')}
                <li className="site-mobile-nav-cta">
                  <HogarButton onNavigate={closeMenu} className="btn btn-sm btn-nav-empresas" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="site-mobile-backdrop"
          aria-label="Cerrar menú"
          tabIndex={-1}
          onClick={dismissMenu}
        />
      )}
    </>
  )
}
