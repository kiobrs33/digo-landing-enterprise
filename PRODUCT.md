# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite. Multi-page routing for `/`, `/empresas`, `/libro-de-reclamaciones`, and `/terminos-y-condiciones`. Map coverage via react-leaflet. Deploy target: standard static/modern web hosting.

## Users

**Primary (Hogar):** Households and residents in Arequipa evaluating local fiber internet — especially in covered districts (Socabaya, Centro de Arequipa). They arrive wanting to know if service reaches their address, compare home plans by speed, and contact the provider quickly (coverage check or WhatsApp).

**Secondary (Empresas):** Businesses in Arequipa needing dedicated corporate connectivity — fixed IPs, SLAs, and formal quotation. They evaluate B2B capability separately from the consumer offer.

## Product Purpose

Digo Telecom is an Internet Service Provider (ISP) in Arequipa, Perú, offering 100% symmetric fiber optic for homes and dedicated corporate connections for businesses. Success on the landing means visitors understand local coverage, trust the service for their segment (hogar vs. empresas), and take the right action: check coverage, request a home plan via WhatsApp, or request a corporate quote.

## Positioning

Unlike national ISPs with generic coverage claims, Digo Telecom is a local Arequipa provider with district-level coverage transparency (Socabaya, Centro de Arequipa), symmetric fiber for homes, and a dedicated B2B path with corporate-specific requirements (RUC, SLAs, fixed IPs) — not a single one-size-fits-all page.

## Operating Context

- Two distinct visitor journeys share a global shell but diverge in copy, CTAs, and proof: **Hogar** (`/`) and **Empresas** (`/empresas`).
- Primary language is **Spanish**; all copy, legal notices, and CTAs default to Spanish.
- Contact channels include direct phone (persistent floating banner), contextual WhatsApp (home vs. empresas messaging), and contact/quotation forms.
- Legal compliance is part of the product surface, not an afterthought: INDECOPI Libro de Reclamaciones, términos y condiciones, and OSIPTEL minimum-speed disclosure in the footer.
- Coverage evaluation is geographic and local — an interactive map (react-leaflet) highlights active districts with polygons.

## Capabilities and Constraints

**Confirmed capabilities:**
- Home landing with hero, promotional carousel, plan cards (Mbps + WhatsApp CTA), embedded YouTube institutional video, interactive coverage map, testimonials, FAQ accordion, and contact form
- Corporate landing (`/empresas`) with dedicated plans, fixed IPs, SLAs, and quotation form including RUC
- Legal pages: `/libro-de-reclamaciones` (INDECOPI normative form), `/terminos-y-condiciones`
- Global header with in-page anchors (`#planes`, `#cobertura`, `#testimonios`, `#faq`, `#contacto`) and prominent **[ Para Empresas ]** route to `/empresas`
- Persistent floating phone banner and contextual WhatsApp FAB (home vs. empresas)

**Technical constraints:**
- React + TypeScript + Vite
- react-leaflet for coverage polygons (Socabaya, Centro de Arequipa)
- Multi-route architecture as listed above

**Terminology:**
- ISP = Proveedor de Servicios de Internet
- Hogar = residential/home fiber offer
- Empresas = corporate/dedicated B2B offer
- Libro de Reclamaciones = INDECOPI-mandated complaints book
- OSIPTEL = Peruvian telecom regulator

**Undecided / to confirm at implementation:**
- Social URLs (phone/WhatsApp, address, email and web were confirmed on 2026-09-28: see src/config/site.ts)
- Specific plan speeds, pricing, and carousel promo content
- YouTube video URL
- Testimonial text and attribution
- RUC validation rules beyond field presence

## Brand Commitments

- Product/company name: **Digo Telecom**
- Primary language: **Spanish**
- Voice: local, trustworthy, service-oriented — a neighborhood ISP in Arequipa, not a faceless national brand
- **Official color palette (binding):**
  - Accent / CTA: `#de087e` (vibrant magenta — action buttons, highlights, active states, icons)
  - Structural / primary: `#041c7b` (navy — header, B2B sections, main headings, badges, dark backgrounds)
  - Background / neutral: `#ffffff` (white — plan cards, clean containers, general background)
- **Visual world (standing preference, whole site): Galaxia de fibra.** Chosen by the user on 2026-09-28 in an impeccable direction round (seed key `3a40c5e4`), replacing both the earlier Hogar "Sillar Arequipeño" world and the earlier Empresas category-standard world. The whole site (Hogar, separate views, legal pages and Empresas) lives in deep space derived from the brand navy, with fiber strands and magenta data pulses; the Hogar hero carries a WebGL galaxy with a rotating promotional ad board at its core (the speed selector was removed on 2026-09-28 to keep the hero to one screen). Empresas is a quieter rendition of the same world (static fiber field, no WebGL). No Arequipa visual identity (sillar, Misti, cathedral): local character lives in copy and the coverage map. See DESIGN.md.

## Evidence on Hand

**Confirmed assets (content to be wired; paths/URLs not yet in repo):**
- Brand name and defined color palette
- Home and corporate plan offerings
- Local coverage map data for Socabaya and Centro de Arequipa
- Institutional YouTube video
- Customer testimonials (Arequipa — speed and local support)
- Contact information (phone, address, email, social)
- Legal copy requirements: Libro de Reclamaciones (INDECOPI), términos y condiciones, OSIPTEL notice — *"En cumplimiento de la Ley N° 31207 y la Resolución de Consejo Directivo N° 00138-2021-CD/OSIPTEL, Digo Telecom garantiza el 70% de la velocidad contratada (mínimo garantizado) tanto en subida como en subida/bajada."*

**Absent in repo — must not fabricate:**
- Social profile URLs until provided (contact phone, email and address are confirmed)
- Plan prices or promos beyond the official flyer (500/800/1000 Mbps, promo S/ 44.50 x 3 meses, confirmed 2026-09-28)
- Testimonial names, quotes, or ratings until provided
- YouTube embed URL until provided
- RUC lookup/integration behavior beyond form capture unless specified

## Product Principles

1. **Local first** — Arequipa coverage, district-level map honesty, and Arequipeño testimonials matter more than generic national ISP language.
2. **Two journeys, one brand** — Hogar and Empresas share chrome but never blur CTAs, proof, or forms; corporate visitors get RUC, SLAs, and quotation flow without wading through consumer plans.
3. **Compliance is visible** — INDECOPI, OSIPTEL, and términos y condiciones are linked and readable from the footer; legal pages are first-class routes, not hidden PDFs.
4. **Contact without friction** — Phone banner, WhatsApp, and section CTAs are always reachable; the right message follows the visitor's segment (hogar vs. empresas).
5. **Show coverage, don't claim it** — The map and coverage check CTA prove service area; undelivered districts must not be implied as available.

## Accessibility & Inclusion

No product-specific accessibility standard confirmed. Follow baseline web accessibility: semantic markup, sufficient contrast (verify magenta `#de087e` and navy `#041c7b` on white), keyboard/focus for accordion/ forms/map controls, and reduced-motion respect for carousels and map interactions.
