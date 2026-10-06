import type { ReactNode } from 'react'

type PageIntroProps = {
  title: string
  children?: ReactNode
}

/** Encabezado de las vistas aparte de Hogar (cobertura, preguntas, medios de pago, legales). */
export function PageIntro({ title, children }: PageIntroProps) {
  return (
    <header className="page-intro theme-space starfield">
      <div className="container">
        <h1 className="page-intro-title">{title}</h1>
        {children && <div className="page-intro-lead">{children}</div>}
      </div>
    </header>
  )
}
