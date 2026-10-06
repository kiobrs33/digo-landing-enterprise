/* eslint-disable react-refresh/only-export-components -- entrada de build (Node), sin recarga en caliente */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/routes'

export {
  canonicalUrl,
  notFoundMeta,
  OG_IMAGE,
  pageMeta,
  SITE_URL,
  structuredData,
} from '@/config/seo'

/** HTML de una ruta, para el pre-renderizado de build. */
export function render(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
