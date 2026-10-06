---
name: Digo Telecom
description: Galaxia de fibra, versión día. Contenido sobre superficies claras; el espacio profundo enmarca header, heros, intros, cabeceras de plan y footer.
colors:
  bg: "#ffffff"
  surface: "#f3f5fc"
  surface-alt: "#e9eefb"
  panel: "#ffffff"
  brand-navy: "#041c7b"
  text: "#1a1f3d"
  text-muted: "#4f5780"
  pulse-magenta: "#de087e"
  pulse-magenta-deep: "#c0066e"
  star: "#3552c4"
  line: "rgba(4, 28, 123, 0.12)"
  line-strong: "rgba(4, 28, 123, 0.22)"
  tint: "rgba(4, 28, 123, 0.05)"
  tint-strong: "rgba(4, 28, 123, 0.09)"
  space-bg: "#030b33"
  space-surface: "#061345"
  space-panel: "#0b1d63"
  space-heading: "#ffffff"
  space-text: "#eef2ff"
  space-text-muted: "#b4c0e8"
  space-accent-text: "#ff5cb4"
  space-star: "#8fb4ff"
  space-line: "rgba(143, 180, 255, 0.18)"
  space-line-strong: "rgba(143, 180, 255, 0.34)"
  space-tint: "rgba(143, 180, 255, 0.08)"
  space-tint-strong: "rgba(143, 180, 255, 0.14)"
  space-text-soft: "rgba(255, 255, 255, 0.88)"
  space-text-faint: "rgba(255, 255, 255, 0.75)"
  starfield-white: "rgba(255, 255, 255, 0.75)"
  starfield-blue: "rgba(143, 180, 255, 0.8)"
  hero-core: "rgba(4, 28, 123, 0.9)"
  void-veil: "rgba(3, 11, 51, 0.7)"
  void-backdrop: "rgba(1, 4, 20, 0.6)"
  pulse-tail: "rgba(255, 190, 225, 0.9)"
  pulse-glow: "rgba(222, 8, 126, 0.16)"
  pulse-ring: "rgba(222, 8, 126, 0.3)"
  pulse-halo: "rgba(222, 8, 126, 0.45)"
  whatsapp-green: "#25d366"
typography:
  display:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  display-mobile:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 11vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  page-intro:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  speed-numeral:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  price:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.1
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    lineHeight: 1.12
    fontVariation: "'wdth' 125"
  title-sm:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 750
    lineHeight: 1.15
    fontVariation: "'wdth' 125"
  wordmark:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  body-lead:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Archivo Variable', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  nav: "6px"
  field: "8px"
  md: "12px"
  lg: "16px"
  board: "20px"
  pill: "999px"
spacing:
  gutter: "1rem"
  gap-sm: "0.75rem"
  gap-md: "1.5rem"
  panel: "2rem"
  section: "clamp(3.5rem, 8vw, 5.5rem)"
  container-max: "72rem"
  header-height: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.pulse-magenta}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.pulse-magenta-deep}"
    textColor: "{colors.space-heading}"
  button-primary-lg:
    backgroundColor: "{colors.pulse-magenta}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  button-header:
    backgroundColor: "{colors.pulse-magenta}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1rem"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.brand-navy}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  button-secondary-space:
    backgroundColor: "{colors.space-panel}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
  logo-mark:
    backgroundColor: "{colors.brand-navy}"
    rounded: "10px"
    size: "2.5rem"
  nav-link:
    textColor: "{colors.space-text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.nav}"
    padding: "0.4rem 0.7rem"
  nav-link-active:
    textColor: "{colors.space-heading}"
  hero-showcase-board:
    backgroundColor: "{colors.space-bg}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.board}"
    padding: "0.6rem"
  plan-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  plan-card-head:
    backgroundColor: "{colors.space-bg}"
    textColor: "{colors.space-heading}"
    padding: "1.75rem 1.5rem 1.5rem"
  plan-card-body:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.brand-navy}"
    padding: "1.5rem"
  plan-badge:
    backgroundColor: "{colors.pulse-magenta}"
    textColor: "{colors.space-heading}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.85rem"
  panel-slab:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "2rem"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    padding: "0.75rem 0.85rem"
---

# Design System: Digo Telecom

## Overview

**Creative North Star: "Galaxia de fibra, versión día"**

La red de Digo sigue dibujándose como una galaxia: fibras por donde viajan los datos como pulsos de luz magenta. Pero el mundo ya no es todo noche. El contenido (planes, beneficios, servicios, proceso, contacto, cobertura, FAQ, pagos, reclamaciones y todo Empresas) vive de día, sobre blanco y dos azules lavados muy tenues, con titulares en navy de marca. El espacio profundo se reserva para los marcos: el header, los heros de Hogar y Empresas, las introducciones de las vistas aparte, la cabecera de cada tarjeta de plan y el footer. Entrar en esas zonas es entrar en la galaxia; el resto de la página es la conversación a la luz del día.

La mecánica es un solo juego de tokens con dos modos. `:root` define la versión clara; la clase `.theme-space` redefine los mismos nombres (`--color-bg`, `--color-heading`, `--color-line`, `--color-star`…) con los valores de espacio profundo. Los componentes solo leen tokens, así que un botón secundario, un filete o un enlace se adaptan solos a la zona donde caen. El magenta es el único color que no cambia de papel en ninguno de los dos modos: pulso de datos y acción.

La densidad es media y la lectura calmada: secciones amplias, una sola familia (Archivo Variable) con titulares expandidos al 125 %, y una galaxia WebGL girando detrás de ambos heros. Lo local de Arequipa vive en el texto y el mapa, no en la imagen. Se rechazan el hero de operador con gradiente y tres tarjetas iguales, y el fondo cálido del mundo anterior "Sillar Arequipeño".

**Key Characteristics:**
- Dos modos de un mismo sistema: claro por defecto, `.theme-space` para los marcos (header, heros, intros, cabecera de plan, footer).
- Una sola familia, Archivo Variable: expandida 125 % para titulares y cifras, normal para lectura.
- Magenta = pulso y acción en ambos modos; azul estelar = estructura (fibras, nodos, foco).
- Filetes de navy translúcido de día y de azul estelar translúcido de noche; nunca grises.
- Movimiento como tráfico de datos (galaxia, costuras, pulso del footer), siempre desactivado con `prefers-reduced-motion`.

## Colors

Paleta restringida con dos modos: de día, blanco y lavados de navy con texto navy; de noche, tres escalones de navy profundo con texto de luz estelar. El magenta de marca es el único acento en los dos.

### Primary
- **Magenta Pulso** (pulse-magenta): botón primario, botón del header, subrayado del enlace activo, pulso de progreso del cartel del hero, insignia "Más popular", borde de 2 px del plan destacado, primer nodo de cada secuencia, pulso de las costuras y del footer, marcadores de ciudad en el mapa Empresas, polígono de Socabaya y selección de texto. Siempre como relleno con texto blanco encima.
- **Magenta Pulso Hondo** (pulse-magenta-deep): hover del botón primario y, de día, la variante de texto del magenta (`--color-accent-text`, 6:1 sobre blanco): línea promocional del plan, viñetas de beneficios, enlaces en párrafos, números de ley, iconos de contacto, enlace de regreso.
- **Magenta Legible Nocturno** (space-accent-text): la misma función de texto dentro de `.theme-space` (iconos de la fila de datos del hero Empresas, enlaces de las intros).

### Secondary
- **Azul Estelar Día** (star): estructura en modo claro. Borde de nodos y números de paso, fibra de beneficios y proceso, iconos de servicios Empresas, hover de botón secundario y de copiado, polígono de Centro en el mapa de cobertura.
- **Azul Estelar Noche** (space-star): el mismo papel dentro de `.theme-space`; también anillo de foco de navegación y de los controles del cartel del hero, e inicio del degradado de los carriles de fibra.

### Neutral: modo día (por defecto)
- **Blanco** (bg): fondo del `body`, planes, beneficios, proceso, cobertura, campos de formulario.
- **Lavado Orbital** (surface): bandas alternas (servicios, contacto, cobertura Empresas), formulario Empresas, hover de botón secundario.
- **Lavado Profundo** (surface-alt): fondo de reserva del mapa mientras carga.
- **Panel** (panel): tarjetas, paneles, cuerpo de plan, FAQ, secciones de proceso y formulario Empresas. Es blanco: el panel se separa del lavado por filete, no por tono.
- **Navy de Marca** (brand-navy): titulares (`--color-heading`), precio de plan, valores de pago, enlace de salto, números de paso Empresas (`--color-primary`). Es el navy oficial de PRODUCT.md.
- **Tinta** (text): texto corrido.
- **Tinta Tenue** (text-muted): leads, descripciones, leyendas, unidades.
- **Filete** (line) y **Filete Fuerte** (line-strong): toda línea de día; divisores de fila con el primero, bordes de tarjeta, panel, campo y botón secundario con el segundo.
- **Tinte** (tint) y **Tinte Fuerte** (tint-strong): hover de navegación y FAQ abierta; puntos de carrusel inactivos, fibra de proceso.

### Neutral: modo espacio (`.theme-space`)
- **Espacio Profundo** (space-bg): fondo del header y su cajón, heros, intros, cabecera de plan y footer. También `theme-color`.
- **Superficie Orbital** (space-surface) y **Panel Nebular** (space-panel): cajón móvil y botón secundario sobre el hero.
- **Blanco Estelar** (space-heading), **Luz Estelar** (space-text), **Nebulosa Tenue** (space-text-muted): titular, texto y texto secundario/navegación en reposo.
- **Filete Estelar** (space-line / space-line-strong) y **Tinte Estelar** (space-tint / space-tint-strong): los mismos papeles que de día, en azul estelar translúcido.
- **Blanco suave / Blanco tenue** (space-text-soft / space-text-faint): enlaces y aviso legal del footer.

### Luz, velos y señales
- **Campo estelar** (starfield-white / starfield-blue): puntos de la textura `.starfield` (teselas de 220, 340 y 400 px) en intros, cabeceras de plan y footer.
- **Núcleo del hero** (hero-core): radial de navy detrás de la galaxia en ambos heros.
- **Velo del vacío** (void-veil): velo de reserva sobre la galaxia. **Telón** (void-backdrop): velo detrás del cajón móvil abierto.
- **Cola del pulso** (pulse-tail): extremo rosado del degradado de las costuras y del pulso del footer.
- **Resplandor** (pulse-glow): núcleo de luz detrás de la diapositiva del plan destacado. **Halo** (pulse-halo): radial magenta en la esquina de su cabecera. **Anillo** (pulse-ring): halo de foco de los campos.
- **whatsapp-green**: solo el FAB de WhatsApp; es color de un tercero, no del sistema.

### Named Rules
**The Two Modes Rule.** Un componente nunca escribe un color literal de fondo, texto o línea: lee el token. El modo lo decide el contenedor con `.theme-space`. Si una pieza necesita verse "de noche", se envuelve en `.theme-space`; no se crean variantes oscuras sueltas.

**The Frame Rule.** El espacio profundo es marco, no contenido. Solo lo llevan header, heros, intros de vista aparte, cabecera de plan y footer. Las secciones de contenido son claras.

**The Pulse Rule.** El magenta solo aparece donde hay dato en movimiento o una acción posible. Una superficie, un titular o una decoración estática nunca es magenta.

**The Legible Magenta Rule.** El texto magenta usa siempre `--color-accent-text` (Magenta Pulso Hondo de día, Magenta Legible Nocturno en espacio). El `#de087e` base solo rellena botones, puntos y nodos con texto blanco encima, o colorea iconos.

**The Tinted Line Rule.** Toda línea es el navy de marca translúcido de día o el azul estelar translúcido de noche, a las opacidades de los tokens. Nada de grises ni negros.

## Typography

**Display Font:** Archivo Variable, eje de ancho a 125 % (con system-ui, sans-serif)
**Body Font:** Archivo Variable, ancho normal (con system-ui, sans-serif)

**Character:** Una sola familia con dos anchos. La expandida da titulares anchos y técnicos, como rótulos de instrumentación; la normal mantiene la lectura cómoda. Se carga con `@fontsource-variable/archivo/wdth.css` y se aplica con `font-stretch: var(--display-stretch)` en todo `h1` y `h2` de `.page`.

### Hierarchy
- **Display** (800, 0,98, −0,03em, máx. 12ch; Empresas 14ch): titular de ambos heros. En ≤ 900 px pasa a **display-mobile**.
- **Page intro** (800, 1,02, −0,03em): titular de las vistas aparte (cobertura, pagos, FAQ, reclamaciones), sobre banda de espacio.
- **Headline** (750, 1,08, −0,02em, `text-wrap: balance`): título de sección, en navy de día.
- **Speed numeral** (800, 3,5rem): la cifra de Mbps en la cabecera del plan; el dato protagonista.
- **Price** (800, 2rem, expandida): el precio del plan; el "al mes" vuelve a ancho normal, 0,875rem 500. Los medios de pago usan el mismo escalón para su título.
- **Title** (750, 1,5rem, expandida): paneles de servicios y aside legal.
- **Title small** (750, 1,25rem, expandida): títulos de beneficios. Los títulos de fila (proceso, servicios y beneficios Empresas) usan 1,05–1,125rem a 700 en ancho normal.
- **Wordmark** (800, 1,25rem, expandida): "Digo" junto a la marca "D".
- **Body lead** (400, 1,125rem, 1,6, máx. 40–60ch): lead de heros e intros; 1rem en ≤ 900 px. El lead de sección usa 1,05rem, máx. 58ch.
- **Body** (400, 1rem, 1,6): texto corrido; en páginas legales máx. 68ch.
- **Label** (600, 0,875rem): etiquetas de formulario, leyenda del selector, nombre de plan, etiqueta de plan, enlaces de navegación (a 500), línea promocional.

### Named Rules
**The Two Widths Rule.** Titulares, cifras de velocidad, precios, números de paso y la marca en ancho 125 %; todo lo que se lee de corrido en ancho normal. No se introduce una segunda familia.

**The No Eyebrow Rule.** Los rótulos van en caja normal y sin tracking extra; no hay antetítulos ni píldoras sobre los titulares, tampoco en Empresas.

## Layout

Contenedor centrado `min(100% − 2rem, 72rem)`: canal lateral de 16 px en móvil. Header fijo compacto de 4rem (3,75rem en ≤ 768 px), en rejilla de tres columnas (marca, navegación centrada, CTA); los anclajes compensan con `scroll-margin-top`. Las secciones respiran con el paso `section`, y los encabezados limitan a 42rem con 2–3rem de separación al contenido.

En Hogar la página alterna bandas Blanco y Lavado Orbital; cada unión lleva una costura de fibra. Las composiciones son asimétricas cuando hay dos piezas (reclamaciones 7fr/4fr, formulario Empresas 0,85fr/1,15fr) y en fila cuando es una secuencia (beneficios en 5 columnas y proceso en 4, unidos por una fibra). Los servicios Empresas son una lista de filas a dos columnas con 3rem de separación; los beneficios Empresas, tres columnas con filete superior. Huecos: 0,75rem (acciones), 1,5rem (rejillas), `clamp(2rem, 5vw, 4rem)` (columnas).

Los dos heros comparten estructura: altura `min(52rem, 100svh − header)`, galaxia desplazada a la derecha (`inset: 0 -12% 0 30%`) y texto a la izquierda. Empresas añade una fila de datos (SLA, IP fija, soporte) bajo un filete, separados por filetes verticales. En ≤ 900 px la galaxia pasa a una banda de 17rem arriba del titular, con un velo degradado hacia el fondo que protege la lectura.

Puntos de quiebre observados: 1240 px (enlaces de navegación compactos), 1024 px (menú en cajón), 1000 px (proceso Empresas a 2), 900 px (rejillas a una columna, beneficios y proceso a 2, galaxia en banda), 768 px (header compacto, servicios Empresas a 1), 560 px (acciones a ancho completo, secuencias y datos del hero en columna), 480 px (FAB a 3rem).

## Elevation & Depth

La profundidad es híbrida y depende del modo. De día, las tarjetas y paneles son blancos sobre blanco o sobre lavado, separados por filete y por una sombra navy muy difusa; la luz viene de arriba y es tenue. De noche, la profundidad es luminosa: radial de navy detrás del hero, campo estelar de tres capas, halo magenta en la cabecera destacada. Las sombras del modo espacio son negras y más largas, pero siguen siendo solo caída difusa.

### Shadow Vocabulary
- **card-rest** (`box-shadow: 0 16px 36px -22px rgba(4, 28, 123, 0.35)`): `--shadow-card` de día. Tarjetas de plan, FAQ, panel de cobertura Empresas, flechas de carrusel.
- **card-hover** (`box-shadow: 0 22px 44px -22px rgba(4, 28, 123, 0.45)`): hover de tarjetas; la de plan además sube 3 px.
- **space-card-rest / space-card-hover** (`0 18px 40px -24px rgba(0,0,0,0.7)` / `0 24px 48px -24px rgba(0,0,0,0.8)`): las mismas dentro de `.theme-space`.
- **pulse-focus** (`box-shadow: 0 0 0 3px rgba(222, 8, 126, 0.3)`): foco de campos.
- **drawer-drop** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.36)`): cajón móvil.

### Named Rules
**The Soft Navy Shadow Rule.** De día, la sombra es navy de marca translúcido, nunca negro ni gris. Un solo nivel en reposo, uno en hover; no se apilan.

**The Light Is Elevation Rule.** En espacio, para acercar algo se aclara su navy, se refuerza su filete a azul estelar o se le pone luz detrás.

## Shapes

Formas suaves y técnicas. Radios: 6 px para enlaces de navegación; 8 px para campos, fieldsets, avisos y la marca "D"; 12 px (`--radius-md`) para FAQ, panel y mapa de cobertura Empresas y enlaces del cajón; 16 px (`--radius-lg`) para tarjetas de plan, paneles, formulario Empresas y aside legal. Todo lo accionable y pequeño es píldora: botones, carriles de progreso del cartel, insignia, botón de copiado. Los nodos son círculos: números de paso (3,5rem en Hogar, 2,25rem en Empresas), nodos de beneficios (1rem), iconos de servicio Empresas (2,75rem) y FAB. Bordes de 1 px (2 px en nodos, botones y plan destacado); las fibras son líneas de 2 px (carriles de 4 px) con degradado que se desvanece.

## Components

### Buttons
Píldoras firmes; el magenta llama, el secundario acompaña.
- **Shape:** píldora, borde de 2 px, 600, 0,95rem; grande 1rem; en el header 0,875rem compacto.
- **Primary:** Magenta Pulso con texto blanco. Es "Consultar cobertura", "Lo quiero", "Para Empresas / Hogar", "Solicitar cotización" y todos los envíos de formulario.
- **Hover / Focus / Active:** hover a Magenta Pulso Hondo; foco `outline: 2px` magenta con 2 px de separación; al presionar baja 1 px.
- **Secondary:** fondo `--color-panel`, texto `--color-heading`, borde `--color-line-strong`; hover a `--color-surface` con borde azul estelar. Lee tokens: blanco con texto navy de día, Panel Nebular con texto blanco sobre el hero.

### Header (Navegación)
Banda de espacio compacta de 4rem, sólida, con filete estelar y sin sombra ni desenfoque. Marca: isotipo oficial de Digo (play blanco y magenta sobre navy, `public/brand/digo-logo-128.png`, 2,5rem, radio 10 px, filete estelar de 1 px) y la palabra "Digo" en wordmark; el mismo isotipo va en el footer (3rem) y como favicon (`digo-logo-64.png`, `apple-touch-icon` de 180 px); sin eslogan ni insignia de segmento. Enlaces 0,875rem 500 en Nebulosa Tenue, sin cápsula ni pista; hover a blanco sobre tinte estelar; activo en blanco 600 con un subrayado magenta de 2 px bajo el texto. CTA pequeño magenta a la derecha. En ≤ 1024 px, botón de menú de 2,5rem (abierto: relleno blanco, icono navy) y cajón en Superficie Orbital con telón `void-backdrop`; activo con barra interior magenta de 3 px. Foco en azul estelar.

### Hero Ad Board (cartel publicitario del hero Hogar)
El hero de Hogar es compacto: titular, una línea de bajada y dos acciones a la izquierda; a la derecha, en el núcleo de la galaxia, un cartel publicitario que la nave orbita. Marco de espacio (radio 20 px, filete fuerte, caída navy larga más una caída magenta desplazada) girado 2° que se endereza al pasar el mouse o enfocar. Pantalla cuadrada (radio 12 px): cada pieza se muestra entera (`contain`) sobre una copia desenfocada de sí misma, así caben piezas 1:1 y 4:5. Debajo, la oferta en HTML (título 1,125rem expandido 750 y detalle 0,875rem) y un botón primario (WhatsApp con el plan o enlace). Controles: flechas anterior/siguiente sobre los costados de la pantalla (2,5rem, velo navy, magenta al pasar el mouse; siempre visibles, también en táctil), un carril de fibra por pieza que el pulso magenta llena durante 6,5 s, y botón de pausa. También se cambia con swipe y con las flechas del teclado. La rotación se detiene al pasar el mouse, con foco, fuera de pantalla y con movimiento reducido. Cambio de pieza: fundido con desenfoque y escala que se asienta. Contenido en `heroAds` (`content.ts`); solo piezas comerciales. Es el único lugar de promociones de Hogar (la sección "Promociones del mes" se retiró el 2026-09-28). En ≤ 900 px el cartel va debajo de las acciones, recto.

### Fiber Galaxy y nave en órbita (hero WebGL)
Canvas WebGL2 con brazos espirales de fibras azul estelar y pulsos magenta con estela; giro lento. Corre a velocidad 1 fija en ambos heros. `GalaxyScene` suma una **órbita** punteada con la inclinación del disco y una **nave** (fuselaje blanco, cabina navy, franja y estela magenta) que la recorre con `offset-path` medido en alto de escena (`cqh`). El mismo bucle de la galaxia mueve la nave (unos 14 s por vuelta) y se pausa fuera de pantalla. Con `prefers-reduced-motion` todo queda en un cuadro quieto; sin WebGL la galaxia cae a una espiral cónica CSS.

### Fiber Diagram (sistema de tarjetas)
Lenguaje común de las tarjetas del sitio, nacido del hero Empresas y elegido por el cliente: dos extremos (`.fiber-endpoint` con `.fiber-node`: origen magenta relleno con halo, destino azul estelar hueco) unidos por una fibra vertical de 2 px (`.fiber-track`) de la que cuelgan los elementos con nodos de 0,5rem. Dos pulsos la recorren a la vez en sentidos opuestos (simétrico); duración en `--fiber-duration`. Solo corren con `data-live="true"` en un ancestro (`useOnScreen`: en pantalla) y nunca con movimiento reducido. Úsalo donde el contenido es un recorrido o una conexión; no lo fuerces sobre contenido que tiene su propia convención de tarjeta (testimonios, FAQ, formularios).
- **Hero Empresas:** Tu empresa → garantías → Red Digo (2,4 s).
- **Tarjeta de plan (cuerpo):** precio (origen) → lo que trae el plan → "Tu hogar · Conectado en 24 horas" (destino, alineado entre planes al fondo). El pulso va a la velocidad del plan: 2,4 s × 1000 / Mbps (4,8 s a 500, 2,4 s a 1000).
- **Medio de pago:** BCP / Yape (origen, título h2) → datos con botón Copiar (copia sin espacios ni guiones) → "Envía tu comprobante" por WhatsApp (destino).
- **Yape Servicios (recomendado):** tarjeta compacta a todo el ancho, primero, con marco magenta e insignia "Recomendado". Izquierda: título, descripción y nota "¡Listo!" (se registra solo, sin comprobante) sobre tinte. Derecha: 4 pasos en fila unidos por una fibra horizontal, el número es el nodo (el primero magenta). ≤ 1024 px: una columna; ≤ 720 px: pasos en vertical con la fibra a la izquierda. Pasos en `yapeServicesPayment` (`content.ts`).

### Testimonial Card
Tarjeta de testimonio convencional, con la misma caja que las tarjetas de plan (panel blanco, filete fuerte, radio 16 px, `card-rest`, padding 1.75rem). Arriba, cinco estrellas magenta a la izquierda y las comillas (icono SVG magenta sobre un círculo `tint` de 2,75rem) a la derecha; al centro la cita en 1.0625rem; al pie, tras un filete, avatar circular navy de 2,75rem con las iniciales en blanco (800, ancho expandido), nombre en 700 y distrito en tinta tenue. Todas las tarjetas del carrusel miden lo mismo.

### About Page (Nosotros, `/nosotros`)
Intro de espacio; "Así trabajamos" en dos columnas (texto + lista de valores con icono magenta y filetes); "Nuestro día a día": galería en mosaico de columnas (3 → 1) con tarjetas como las de plan (panel, filete fuerte, radio 16 px, sombra), foto sin recorte y pie de foto; filtros por categoría (píldoras, activa en magenta) que solo aparecen si hay más de una categoría con contenido; visor en `<dialog>` nativo sobre velo de espacio (flechas, teclado, Escape). Los videos muestran su portada con un botón de play. Contenido en `aboutMedia` (`content.ts`), archivos en `public/nosotros/` o Cloudinary (permitido en la CSP).

### Dedicated Link Diagram (hero Empresas)
Desde el 2026-10-06 el hero Empresas sigue al de Hogar: titular "Internet dedicado para tu empresa" (máx. 11ch, `clamp(2.75rem, 5vw, 4.25rem)`), bajada corta, dos acciones y chips de datos (público, provincias, cotización con RUC). En el diagrama, la primera fila de la fibra es la cifra del enlace ("1 Gbps" expandida 800 sobre tinte, con icono simétrico y la nota "Enlaces de 100 Mbps a 1 Gbps…"). La galaxia y la nave usan la escala grande de Hogar en escritorio.

La versión B2B del cartel de Hogar: sin publicidad, con las garantías del servicio. Titular, bajada y dos acciones a la izquierda; a la derecha, en el núcleo de la galaxia, un panel de espacio (radio 20 px, filete fuerte, caída navy, recto) con el diagrama de un enlace dedicado: nodo "Tu empresa" (círculo magenta con halo) arriba, nodo "Red Digo" (círculo azul estelar hueco) abajo, unidos por una fibra vertical de 2 px. Dos pulsos la recorren a la vez en sentidos opuestos (magenta baja, azul estelar sube: simétrico), 2,4 s por vuelta, detenidos fuera de pantalla y con movimiento reducido. De la fibra cuelgan, con nodos de 0,5rem, las garantías: SLA hasta 99,9 %, IP fija, soporte 24/7 y ancho de banda garantizado. En ≤ 900 px el diagrama va debajo de las acciones.

### Plans Board (tablero de planes)
Los planes son **tarjetas separadas** (panel, filete fuerte, radio 16 px, `card-rest`, 1,5rem entre ellas) dentro de una rejilla común: cada tarjeta usa `subgrid`, así las filas se alinean entre planes: cabecera, precio, rasgos y acción.
- **Cabecera (espacio):** `.theme-space` con campo estelar; "Fibra Digo" en label, cifra de velocidad y una **etiqueta de lo que incluye** (píldora de 0,875rem): "Solo internet" con icono wifi en filete estelar, o "+ TV Digital Full / Premium" con icono TV sobre tinte magenta. Sin carriles de Bajada/Subida (retirados a pedido del cliente el 2026-09-28).
- **Cuerpo (día):** precio grande en navy, línea promocional magenta opcional, todos los rasgos del plan con viñeta de nodo de fibra (círculo magenta de 2 px) y filete entre filas.
- **Acción:** botón secundario a ancho completo; el plan destacado usa el primario.
- **Destacado:** contorno magenta de 2 px, sombra magenta desplazada, insignia "Más popular" montada en el borde superior y halo magenta en la cabecera.
- **Cantidad de planes libre:** el tablero lee `homePlans`. Hasta 4 planes caben en el ancho; desde 5, cada columna mide 17rem y el tablero se desliza dentro de un riel con snap, bordes que se desvanecen donde quedan planes, flechas y el estado "Planes 1–4 de 5" (`aria-live`).
- **Al pasar por un plan** (o enfocar algo dentro): la tarjeta sube 4 px con sombra más larga, una fibra magenta de 3 px se enciende en su borde superior (entre las dos curvas; el destacado no la lleva porque su marco ya es magenta) y la cabecera recibe un halo magenta. La flecha de "Lo quiero" avanza 0,2rem. Con movimiento reducido, sin desplazamiento.
- **≤ 900 px:** tarjetas sueltas (radio 16 px, `min(82vw, 21rem)`) que se deslizan de lado con la siguiente asomando; flechas y estado a la izquierda, lejos de los botones flotantes.

### Fiber Seams
Entre secciones de Hogar, una costura de 2 px en filete fuerte que se desvanece en los extremos, y encima un pulso magenta del 18 % del ancho que la recorre (7 s; 9 s en sentido inverso en uniones alternas). El footer lleva el mismo pulso sobre su borde superior (8 s). Se eliminan con movimiento reducido.

### Fiber Sequences
Beneficios y proceso de Hogar se dibujan como nodos unidos por una fibra (magenta → azul estelar); nodos con borde azul estelar sobre el fondo; el primero va relleno de magenta. En móvil la fibra se retira. El proceso Empresas es la versión sobria: números en círculos navy de 2,25rem unidos por una línea de 1 px en tinte fuerte. Con soporte de `animation-timeline: view()`, la fibra se dibuja con el scroll (de `cover 10%` a `cover 50%` en beneficios; un tramo tras otro en proceso) y cada nodo se enciende al pasar la luz; sin soporte o con movimiento reducido quedan fijas.

### Motion
Toda la animación es tráfico de datos por fibra, en CSS nativo (sin librería).
- **Tarjetas de plan:** al pasar el mouse suben 4 px con sombra más larga (0,3 s), se enciende la fibra magenta del borde superior y la cabecera recibe el halo; sin desplazamiento con movimiento reducido.
- **Resultado de cobertura:** cada consulta vuelve a montar el aviso, que entra como transmisión (`clip-path` de izquierda a derecha, 0,55 s) y luego su texto.
- **FAQ:** altura animada con `grid-template-rows` 0fr → 1fr (0,3 s); cerrada queda `inert`; la flecha gira 90°.
- **Cajón móvil:** baja 0,5rem en 0,35 s y sale en 0,15 s (`@starting-style` + `display` discreto); el telón entra en fundido.
- **Cambio de vista:** View Transitions del router (`viewTransition` en los enlaces); el header tiene nombre propio y no se mueve; la vista sale en 0,16 s y entra en 0,32 s subiendo 0,75rem.
- **Curva:** `cubic-bezier(0.16, 1, 0.3, 1)` para llegadas; salidas más cortas con `ease-in`.
- **Yape Servicios:** al cargar (o al volver a entrar en pantalla) la fibra de los pasos se dibuja en 1,1 s y cada número se enciende cuando la luz lo alcanza (0,2 / 0,5 / 0,8 / 1,05 s); en móvil la fibra baja en vertical.
- **Galería Nosotros:** cada foto se descubre de arriba hacia abajo mientras entra en pantalla (`clip-path` con `animation-timeline: view()` en el botón; la tarjeta usa `overflow: clip`, no `hidden`, para no volverse contenedor de scroll). Al cambiar de filtro, las tarjetas entran con un fundido escalonado (máx. 0,15 s). En el visor, cada foto entra con fundido y escala 0,97 → 1.
- **Copiar (medios de pago):** al copiar, el botón pasa a magenta mientras dice "Copiado".
- **Movimiento reducido:** no hay regla global que anule todo; cada pieza quita el desplazamiento y conserva fundidos y cambios de color.

### Cards / Containers
- **Panel slab** (servicios, pagos, aside legal): panel blanco, radio 16 px, filete fuerte, padding 2rem (1,5rem en ≤ 560 px), sin sombra. Dentro, listas de definición con divisores.
- **Filas Empresas:** servicios en lista de dos columnas (icono circular con filete e icono azul estelar, título 700, divisor inferior); beneficios en tres columnas con filete superior e icono magenta. Filas, no tarjetas.
- **FAQ:** lista unida en panel blanco, radio 12 px, `card-rest`; hover a lavado, abierta en tinte.

### Inputs / Fields
- **Style:** fondo `--color-bg`, borde 1 px filete fuerte, radio 8 px, padding `0.75rem 0.85rem`, cursor magenta legible; placeholder en tinta tenue al 75 %. Etiqueta 0,875rem 600 en navy.
- **Focus:** borde magenta y halo `pulse-ring`; sin outline nativo.
- **Contenedor:** el formulario Empresas va en Lavado Orbital con filete y radio 16 px, sobre sección blanca.

### Coverage Maps
Teselas OSM normales, sin filtro. Polígonos de distrito con contorno blanco de 3 px y relleno al 35 %: Centro en azul estelar día, Socabaya en magenta. En Empresas, marcadores circulares de ciudad magenta al 75 % con contorno blanco de 3 px y rótulo fijo en navy 700. Las provincias del panel son chips (Todas + una por provincia, con el nodo magenta del mapa), como las zonas de Hogar; la nota de la provincia elegida va debajo.

### Contacto directo (Empresas)
Una fila por canal con filete: etiqueta en tinta tenue y dato en navy 700 con cifras tabulares a la izquierda; a la derecha, píldoras secundarias de acción (Llamar, WhatsApp, Escribir) con icono azul estelar.

### Page Intro y Footer
La intro de cada vista aparte es una banda `.theme-space` con campo estelar, titular page-intro y lead. El footer es plano, `.theme-space` con campo estelar, filete superior fuerte y el pulso de fibra; tres columnas (marca 2fr, enlaces, redes) que pasan a una en ≤ 1024 px.

## Do's and Don'ts

### Do:
- **Do** leer siempre tokens y poner `.theme-space` en el contenedor cuando una pieza deba vivir en el espacio profundo.
- **Do** reservar el espacio profundo para los marcos: header, heros, intros de vista aparte, cabecera de plan y footer; el contenido va claro.
- **Do** usar Magenta Pulso solo para la acción principal, el estado activo y el pulso de datos; el texto magenta siempre con `--color-accent-text`.
- **Do** dibujar líneas y tintes solo con `line`, `line-strong`, `tint`, `tint-strong` (o sus pares `space-*`).
- **Do** titular con Archivo expandida (`font-stretch: 125%`, 750–800, tracking −0,02 a −0,03em) y leer con Archivo normal a 1rem / 1,6.
- **Do** expresar secuencias (pasos, beneficios) como nodos unidos por una fibra, con el primer nodo en magenta.
- **Do** detener todo pulso, costura y giro con `prefers-reduced-motion`, dejando un cuadro quieto legible.

### Don't:
- **Don't** pintar secciones de contenido completas en espacio profundo; la regla "todo oscuro" del mundo anterior ya no rige.
- **Don't** usar el fondo cálido del mundo "Sillar Arequipeño" ni iconografía de Arequipa (sillar, Misti, catedral).
- **Don't** construir el hero de operador con gradiente y tres tarjetas iguales.
- **Don't** escribir texto pequeño en `#de087e`, ni sobre blanco ni sobre navy.
- **Don't** usar bordes grises ni sombras negras en modo día; la sombra de día es navy translúcido.
- **Don't** poner cápsulas, pistas ni fondos invertidos a la navegación; el activo es texto blanco y subrayado magenta.
- **Don't** introducir una segunda familia tipográfica, antetítulos ni rótulos en mayúsculas con tracking.
- **Don't** oscurecer las teselas del mapa con filtros; el mapa se lee de día.
