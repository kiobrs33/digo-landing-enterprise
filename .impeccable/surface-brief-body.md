# Surface brief — Digo Telecom (multi-route)

**Visitor mode:** Persuade  
**Scope:** Full production web — `/`, `/empresas`, `/libro-de-reclamaciones`, `/terminos-y-condiciones`  
**Related targets:** `/empresas`, `/libro-de-reclamaciones`, `/terminos-y-condiciones`

## Job and audience

- **Hogar (`/`):** Familias arequipeñas evaluando fibra simétrica local; llegan con duda de cobertura y comparación de planes por velocidad.
- **Empresas (`/empresas`):** Negocios que necesitan conexión dedicada, IP fija, SLA y cotización formal con RUC.
- **Legal (`/libro-de-reclamaciones`, `/terminos-y-condiciones`):** Visitantes cumpliendo o consultando obligaciones normativas peruanas.

## Outcome and proof

| Ruta | Acción primaria | Prueba que gana confianza |
|---|---|---|
| `/` | Consultar cobertura → WhatsApp plan | Mapa con polígonos Socabaya/Centro + campo dirección; testimonios locales; video YouTube; planes con Mbps |
| `/empresas` | Solicitar cotización corporativa | Planes B2B, SLAs, IPs fijas, formulario RUC |
| `/libro-de-reclamaciones` | Registrar reclamo INDECOPI | Formulario normativo completo (placeholder submit) |
| `/terminos-y-condiciones` | Leer políticas | Texto legal legible, enlazado desde footer |

CTAs persistentes: banner teléfono flotante + WhatsApp FAB contextual (hogar vs. empresas).

## Selected direction — Sillar Arequipeño

**Thesis:** El ISP local se siente edificado en piedra blanca arequipeña — permanente y de barrio, no landing genérica de telecom nacional.

**Own-world:** Fondo blanco mate `#fff` con textura sillar sutil; marcos y header en navy `#041c7b` (geometría colonial/friso); acento magenta `#de087e` en CTAs, badges activos e íconos. Tipografía: serif condensada en display (permanencia arquitectónica) + sans geométrica/humanista para planes, forms y UI. Plan cards como placas/losas con borde navy; mapa sobre losa blanca; `/empresas` mantiene paleta pero sub-mundo más documento técnico (menos ornamental).

**First viewport (`/`):** Header navy fijo; hero split — izquierda titular serif grande + CTAs magenta (Consultar Cobertura, WhatsApp); derecha carrusel promocional en marco de ventana colonial; banner teléfono discreto arriba.

**Memorable moment:** Mapa de cobertura con polígonos de distrito sobre losa blanca + consulta de dirección encima — prueba geográfica honesta, no claim genérico.

**Seed key:** dc8b02c2 · **Form:** Sillar Arequipeño (candidate 5, direction roll)

## Scope and boundaries

**In scope (build 1):**
- 4 rutas completas, header/footer global, floating phone + WhatsApp
- Todas las secciones hogar: hero+carrusel, planes, video, mapa+consulta dirección, testimonios, FAQ, contacto
- Vista empresas completa con cotización RUC
- Formularios legales y contacto con envío simulado (placeholder, sin backend)
- react-leaflet para polígonos Socabaya y Centro

**Out of scope / anti-goals:**
- Inventar teléfonos, precios, testimonios reales, URL YouTube, dirección fiscal
- Backend real, validación RUC SUNAT, geocoding preciso de direcciones
- Template ISP genérico (hero centrado + 3 cards flotantes sin identidad local)
- Diluir `/empresas` con planes hogar

## States and ranges

- **Planes hogar:** 3–4 tarjetas típicas (Mbps + precio placeholder marcado)
- **Planes empresas:** 2–3 tiers (dedicado, IP fija, SLA)
- **Carrusel:** 3–5 slides promocionales (synthetic, marcados)
- **Testimonios:** 3–6 reseñas arequipeñas (synthetic hasta reemplazo)
- **FAQ:** 6–10 preguntas acordeón
- **Mapa:** 2 polígonos activos; resto del mapa visible sin implicar cobertura
- **Forms:** empty → validation error → success toast (simulado)

## Interaction and layout

**Global chrome:** Nav anchors en hogar; en empresas/legales nav simplificado. `[ Para Empresas ]` destacado en header (estilo diferenciado navy outline o invert). Footer: contacto, redes, OSIPTEL notice, links legales.

**Hogar sequence:** Hero → Planes → Video → Cobertura (campo dirección + mapa) → Testimonios → FAQ → Contacto.

**Cobertura flow:** "Consultar Cobertura" scroll a `#cobertura`; campo dirección/zona arriba del mapa; feedback placeholder (en zona / consultar WhatsApp).

**Responsive:** Mobile — stack hero, carrusel full-width, plan cards scroll horizontal o stack, mapa full-bleed, FAB WhatsApp no obstruye CTAs.

**Empresas:** Hero B2B navy-dominante; planes corporativos; form cotización (empresa, RUC, contacto, requerimientos).

**Legales:** Layout Read dentro del shell — tipografía legible, form INDECOPI estructurado, sin ornamentación excesiva.

## Constraints and open decisions

- Paleta obligatoria: `#de087e`, `#041c7b`, `#fff`
- Stack: React + TS + Vite + react-router + react-leaflet
- Español primero; copy synthetic claramente marcado donde aplique
- A11y: contraste magenta/navy, focus visible, reduced-motion en carrusel/mapa
- **Open:** datos reales de contacto, planes, video URL, testimonios, coordenadas exactas polígonos, destino final formularios
