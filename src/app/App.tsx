import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/routes'

// Router de datos: habilita `viewTransition` en los enlaces entre vistas.
const router = createBrowserRouter(routes)

export default function App() {
  return <RouterProvider router={router} />
}
