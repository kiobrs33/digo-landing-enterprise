# digo-landing-enterprise

Landing de **DIGO EMPRESAS** (internet dedicado para empresas). React 19 · Vite · pre-renderizado
estático para SEO. Comparte la estética de DIGO HOGAR, pero es un proyecto independiente.

## Desarrollo local

```bash
# 1. Levanta digo-landing-backend en http://localhost:4110
npm install
npm run dev        # descarga el contenido del sitio EMPRESAS y abre http://localhost:4112
```

## Contenido

- **Desde el panel** (sitio EMPRESAS): datos de la empresa, logo y redes sociales. Antes de cada
  build, `scripts/fetch-content.mjs` descarga `GET /api/public/sites/empresas` en
  `src/data/cms/site-content.json`. En Vercel, si la API no responde, el build falla y queda
  publicada la versión anterior.
- **En el código** (`src/data/content.ts`): beneficios, servicios, proceso y ciudades de cobertura.
- **Formularios**: la cotización (razón social + RUC) y el Libro de Reclamaciones se registran en
  la plataforma (`POST /api/public/contact` y `/api/public/complaints`, sitio `EMPRESAS`).

## Cambiar la identidad visual

Colores, tipografía y superficies están en `src/styles/theme.css` (tokens). Cambiarlos aquí no
afecta a DIGO HOGAR.

## Producción (Vercel)

Variables (ver `.env.example`): `CONTENT_API_URL`, `VITE_API_URL`, `VITE_SITE_URL`, `VITE_HOGAR_URL`.
En el backend, agrega el dominio de este sitio a `CORS_ORIGINS`.
