---
target: revisar la pagina completa (/)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-09-28T20-19-18Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A design review, B detector+browser).

## Design Health Score — 19/32 (7, 10 n/a) — Acceptable
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | "Lo quiero" doesn't say it opens WhatsApp in a new tab |
| 2 | Match real world | 3 | megas vs Mbps; no IGV/contract/permanence wording |
| 3 | User control | 3 | form.reset() right after window.open (useWhatsAppForm.tsx:74) loses input if WhatsApp fails |
| 4 | Consistency | 1 | 3 phone identities (ad +51 967 471 827, site 962 629 028, Lima (01) 701-2341), 2 addresses, promo 2 vs 3 months, hero "S/ 44.50" without /mes vs card S/ 89 |
| 5 | Error prevention | 2 | phone regex accepts "(((((("; no required markers |
| 6 | Recognition | 2 | plan feature rows not parallel (content.ts:25-51) |
| 7 | Flexibility | n/a | persuade single visit |
| 8 | Aesthetic/minimal | 2 | Services duplicates plans; Benefits+Process same timeline motif |
| 9 | Error recovery | 3 | generic "Completa este campo." |
| 10 | Help | n/a | FAQ on own route; purchase objections unanswered on / |

## Design specificity
Fold authored (symmetry headline, Bajada/Subida lanes). Below plans = generic ISP template. No district/face/address on /. Client ad art (Pixar mascot + own contact strip) clashes with galaxy world.
Detector: TSX 0 findings; CSS 31 design-system drift (20 font-size, 6 radius, 5 color; black shadows FP). Browser: dark-glow + thin-border-wide-shadow on .hero-ad and arrows; footer legal ~110ch; width transition on .carousel-dots (index.css:272); marquee = fiber seams (FP); mobile viewport-edge = rail/carousel (FP).

## Strengths
1. Symmetry visualized via speed-proportional lanes.
2. A11y plumbing: skip link, focus rings, menu trap/Escape, carousel pauses, aria-live rail, single h1.
3. Honest WhatsApp form with fallback link.

## Priority issues
- [P0] Contradictory contact/offer data (ad image vs site.ts; promo 2 vs 3 months; hero title no /mes). Fix: single source in site.ts, crop ad contact strip, title "1000 Mbps a S/ 44.50/mes · primeros N meses, luego S/ 89". → clarify
- [P1] No social proof in prod: all 4 testimonials synthetic → TestimonialsSection returns null; restaurant (B2B) quote on Hogar. → harden
- [P1] Coverage not answered on /: districts only in ad slide 2. Add strip "Fibra activa hoy en Socabaya y Centro" + address field deep-linking /cobertura. → layout
- [P2] Plans not comparable: non-parallel rows, empty promo gap, highlighted column head ~25px lower, no IGV. → layout
- [P2] Redundant middle (Services) + fragile form (reset, phone regex). → distill + harden

## Persona red flags
- Jordan: S/ 44.50 vs S/ 89; doesn't know Lo quiero → WhatsApp; no contract info.
- Riley: "((((((" valid; form wiped if popup blocked; different phone on ad; TikTok icon black on navy.
- Casey: WhatsApp FAB overlaps ad arrow and plan cards; plan card taller than viewport; "Más popular" hidden as card 2; tap targets 24px (ad tabs, testimonial dots), 32px pause.
- Socabaya household: "Socabaya" absent from / except ad slide 2; /cobertura address field at ~40% down.

## Minor
LCP = hero ad backdrop img with loading="lazy" (HeroAdBoard.tsx:107), 192KB; ad JPGs 2.5-3.2x oversized; districtBoundaries.ts 86KB loaded on /; 6 controls for 2 ads; ad tilt softens text; 4 "Lo quiero" links different targets; plan h3 reads "Fibra Digo500Mbps"; placeholder badge 4.43:1; step-1 numeral ~3.2:1; carousels loop inconsistently; page ~5400px desktop / 7600px mobile.

## Questions
1. Why does the hero feature a price flyer instead of the symmetry lanes?
2. What real local artifact can the client supply this week?
3. Should the promo be in the hero while its term is unconfirmed?
