import { EmpresasPageContent } from '@/components/empresas/EmpresasPageContent'
import { PageShell } from '@/components/layout/PageShell'

export function HomePage() {
  return (
    <PageShell>
      <EmpresasPageContent />
    </PageShell>
  )
}
