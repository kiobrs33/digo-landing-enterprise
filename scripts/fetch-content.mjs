// Descarga el contenido del sitio (empresa, planes, carrusel, redes y fotos) desde la API de
// digo-landing-backend y lo guarda en src/data/cms/site-content.json. Corre antes de cada build:
// la landing se genera con ese archivo, así el HTML pre-renderizado y el navegador coinciden.
//
// - En Vercel (o con CONTENT_REQUIRED=1), si la API no responde el build falla: Vercel mantiene
//   publicada la versión anterior en vez de publicar una landing sin datos.
// - En local, si la API no responde se usa el último archivo guardado y se avisa.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'src/data/cms/site-content.json')
// En Vercel, sin CONTENT_API_URL, se usa la API de producción.
const defaultApi = process.env.VERCEL ? 'https://cms-api.digo.net.pe' : 'http://localhost:4110'
const apiUrl = (process.env.CONTENT_API_URL || defaultApi).replace(/\/$/, '')
const url = `${apiUrl}/api/public/sites/empresas`
const required = Boolean(process.env.VERCEL || process.env.CONTENT_REQUIRED)

try {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const content = await response.json()
  if (!content?.company || !Array.isArray(content.plans)) throw new Error('respuesta sin el formato esperado')

  // Sin `generatedAt`: así el archivo solo cambia cuando cambia el contenido.
  delete content.generatedAt
  const next = `${JSON.stringify(content, null, 2)}\n`
  const previous = await readFile(output, 'utf8').catch(() => '')
  if (next !== previous) await writeFile(output, next)
  console.log(`Contenido de EMPRESAS ${next === previous ? 'sin cambios' : 'actualizado'} (${url})`)
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error)
  if (required) {
    console.error(`No se pudo obtener el contenido desde ${url}: ${reason}`)
    process.exit(1)
  }
  console.warn(`Aviso: no se pudo obtener el contenido desde ${url} (${reason}). Se usa el último guardado.`)
}
