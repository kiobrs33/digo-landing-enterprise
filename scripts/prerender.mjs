// Pre-renderizado de build: escribe un HTML por ruta con su contenido, título, descripción,
// canónica, Open Graph y JSON-LD, más 404.html, robots.txt y sitemap.xml. Así los buscadores y
// las vistas previas (WhatsApp, Facebook) reciben la página completa sin ejecutar JavaScript.
// Corre después de `vite build` (cliente) y `vite build --ssr` (entrada de servidor).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, pageMeta, notFoundMeta, canonicalUrl, structuredData, OG_IMAGE, SITE_URL } =
  await import(path.join(ssrDir, 'entry-server.js'))

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headFor(meta, { indexable }) {
  const url = canonicalUrl(meta.path)
  const tags = [
    indexable ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="es_PE" />',
    '<meta property="og:site_name" content="Digo Telecom" />',
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Logo de Digo Telecom" />',
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
  if (indexable) {
    // `<` escapado: el JSON nunca puede cerrar la etiqueta script.
    const json = JSON.stringify(structuredData(meta)).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

function pageHtml(meta, { indexable, url }) {
  const appHtml = render(url)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace('<!--app-head-->', headFor(meta, { indexable }))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

// Rutas: "/" → dist/index.html; "/cobertura" → dist/cobertura/index.html
for (const meta of pageMeta) {
  const file =
    meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, pageHtml(meta, { indexable: true, url: meta.path }))
}

// Cualquier ruta inexistente (Vercel la sirve con estado 404 o 410).
await writeFile(
  path.join(dist, '404.html'),
  pageHtml(notFoundMeta, { indexable: false, url: '/__pagina-no-encontrada' }),
)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageMeta
  .filter((meta) => meta.indexable)
  .map((meta) => `  <url>\n    <loc>${canonicalUrl(meta.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

await writeFile(
  path.join(dist, 'robots.txt'),
  `# Digo Telecom — ${SITE_URL}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`Pre-renderizadas ${pageMeta.length} rutas + 404.html, sitemap.xml y robots.txt`)
