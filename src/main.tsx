import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/tailwind.css'
import '@/styles/theme.css'
import '@/styles/index.css'
import '@/styles/responsive.css'
import '@/styles/galaxy.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción cada ruta llega pre-renderizada (scripts/prerender.mjs): se hidrata. En
// desarrollo el contenedor llega vacío y se monta desde cero.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
