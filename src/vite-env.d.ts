/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API de digo-landing-backend, p. ej. https://cms-api.digo.net.pe. Vacía en local (proxy de Vite). */
  readonly VITE_API_URL?: string
  /** Sitio de DIGO HOGAR, p. ej. https://www.digo.net.pe */
  readonly VITE_HOGAR_URL?: string
  /** Dirección canónica de este sitio, p. ej. https://digoempresas.pe */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
