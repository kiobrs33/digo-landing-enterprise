import type { ReactNode } from 'react'
import { showPlaceholders } from '@/config/site'

/** Aviso visible solo en desarrollo para marcar datos pendientes de confirmar. */
export function PendingNote({ children }: { children: ReactNode }) {
  if (!showPlaceholders) return null
  return <span className="placeholder-badge">{children}</span>
}
