import { Outlet } from 'react-router-dom'
import { ScrollToTopOnNavigate } from '@/components/ui/ScrollToTop'

export function RootLayout() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Outlet />
    </>
  )
}
