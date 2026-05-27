# Momentum Costa Rica — Project Memory

> Last updated: 2026-05-21

---

## 1. What This Project Is

A **Next.js 14 App Router** website (not yet launched) replacing three separate Squarespace sites and one Torre Médica sub-site. It is a premium lifestyle commercial ecosystem — NOT a shopping mall.

**Live preview URL (Vercel):** https://momentumcr.vercel.app
**GitHub repo:** https://github.com/francescozoffoli10-jpg/momentum-web
**GitHub API token:** (see Vercel env vars or ask Francesco — redacted for secret scanning)
**Vercel project name:** momentum-prototype
**Sanity project:** klr3qmou / production dataset

---

## 2. Sites & URL Structure

All four sites live under a single Next.js app using a path-prefix system at the preview domain:

| Site | Preview URL | Future production domain |
|------|-------------|--------------------------|
| Landing (ecosystem) | /  | momentumcr.com (TBD) |
| Momentum Lindora | /lindora | momentumlindora.com |
| Momentum Escazú | /escazu | momentumescazu.com |
| Momentum Pinares | /pinares | momentumpinares.com |
| Torre Médica Momentum | /torre-medica | torremedicamomentum.com |

**IMPORTANT:** The live production domains (momentumlindora.com, momentumescazu.com, etc.) currently point to OLD Squarespace sites. The new Next.js site is ONLY on Vercel preview. Never tell the user to go to the production domain — always use momentumcr.vercel.app.

**Middleware** (`src/middleware.ts`) handles hostname-based routing: when production domains eventually point here, clean URLs (e.g. momentumlindora.com/gastronomia) work without the site prefix.

---

## 3. Repository & Deployment

- **Branch:** `main` — all pushes go here
- **Auto-deploy:** Vercel auto-deploys on every push to main
- **Deploy method:** GitHub API (no local git due to permissions lock issue with .git/index.lock)
- **How to push files:**
  ```bash
  TOKEN="<YOUR_GITHUB_TOKEN>"
  REPO="francescozoffoli10-jpg/momentum-web"
  # Get current SHA of file (required for updates):
  SHA=$(curl -s -H "Authorization: token $TOKEN" \
    "https://api.github.com/repos/$REPO/contents/PATH?ref=main" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))")
  # Push (include sha for updates, omit for new files):
  CONTENT=$(base64 -w 0 /path/to/file)
  ```

---

## 4. Tech Stack

- **Framework:** Next.js 14 App Router (TypeScript)
- **Styling:** Inline styles only — NO Tailwind, NO CSS modules
- **CMS:** Sanity v3 (studio at /studio, client in src/sanity/)
- **Analytics:** Vercel Analytics
- **Medical directory:** Huli Labs widget (hulilabs.com)
- **Images:** Next.js Image with Sanity CDN + Unsplash remotePatterns
- **Language:** Costa Rican Spanish — use vos imperative forms: "Elegí", "Descubrí", "Explorá", "Encontrá", "Consultá"

---

## 5. File Structure

```
web/src/
├── app/
│   ├── page.tsx                    ← Ecosystem landing page (3 destinations)
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── (sites)/
│   │   ├── lindora/                ← Lindora site
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx     ← Tenant detail
│   │   │   ├── gastronomia/
│   │   │   ├── comercios/
│   │   │   ├── servicios/
│   │   │   ├── ofiplaza/
│   │   │   ├── mediplaza/
│   │   │   ├── eventos/
│   │   │   ├── app/
│   │   │   ├── como-llegar/
│   │   │   ├── alquiler/
│   │   │   └── contacto/
│   │   ├── escazu/                 ← Escazú site
│   │   │   ├── gastronomia/
│   │   │   ├── servicios/
│   │   │   ├── centro-medico/      ← Has HuliSearchbox widget
│   │   │   ├── oficentro/
│   │   │   ├── eventos/
│   │   │   └── ...
│   │   ├── pinares/                ← Pinares site
│   │   │   ├── gastronomia/
│   │   │   ├── comercios/
│   │   │   ├── servicios/
│   │   │   ├── torre-medica/       ← Pinares Torre Médica section
│   │   │   ├── ofiplaza/
│   │   │   └── ...
│   │   └── torre-medica/           ← Torre Médica sub-site
│   │       ├── page.tsx
│   │       ├── directorio/         ← Has HuliSearchbox widget
│   │       ├── servicios/
│   │       ├── alquileres/
│   │       └── contacto/
│   ├── admin/analytics/
│   └── studio/[[...tool]]/
├── components/
│   ├── directory/
│   │   ├── LogoGrid.tsx
│   │   └── PageHeader.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedTenants.tsx
│   │   ├── RegionGrid.tsx
│   │   ├── EditorialSection.tsx
│   │   ├── MarqueeStrip.tsx
│   │   └── StatsBar.tsx
│   ├── huli/
│   │   └── HuliSearchbox.tsx       ← 'use client', Huli Labs medical widget
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── AlquilerPage.tsx
│   │   ├── AppPage.tsx
│   │   ├── ComoLlegarPage.tsx
│   │   ├── ContactoPage.tsx
│   │   ├── EventosPage.tsx
│   │   └── TenantDetailPage.tsx
│   ├── torre-medica/
│   │   ├── TorreMedicaNav.tsx
│   │   └── TorreMedicaFooter.tsx
│   └── ui/
│       ├── AppBadge.tsx
│       └── WhatsAppBadge.tsx
├── data/
│   ├── types.ts
│   └── sites/
│       ├── lindora/    (index, gastronomia, comercios, servicios, eventos, ofiplaza, mediplaza, all)
│       ├── escazu/     (index, gastronomia, servicios, centro-medico, oficentro, eventos, all)
│       ├── pinares/    (index, gastronomia, comercios, servicios, torre-medica, eventos, ofiplaza, all)
│       └── torre-medica/ (index, services, specialties)
├── middleware.ts
└── sanity/
    ├── config.ts
    ├── lib/
    └── schemas/
```

---

## 6. Site Configs Summary

### Lindora
- Accent: `#932D2B` (dark red)
- Logo: `/brand/lindora-white.png`
- Sections: gastronomia, comercios, ofiplaza, mediplaza
- Address: Santa Ana, frente al Automercado de Lindora

### Escazú
- Accent: `#56717A` (slate blue-grey)
- Logo: `/brand/momentum-white.png`
- Sections: gastronomia, servicios, centro-medico, oficentro
- Address: Escazú, San José

### Pinares
- Accent: `#4F5B3E` (olive green)
- Logo: `/brand/momentum-white.png`
- Sections: gastronomia, comercios, servicios, torre-medica, ofiplaza
- Address: Curridabat, frente al Walmart

### Torre Médica
- Accent: `#1B5E8A` (medical blue)
- Separate Nav/Footer components (TorreMedicaNav, TorreMedicaFooter)
- No tenant slug pages — specialty/service listings only

---

## 7. Huli Medical Directory Integration

Huli Labs provides an embeddable searchbox for medical specialists.

**Component:** `src/components/huli/HuliSearchbox.tsx` (client component)
**Script:** `https://search.hulilabs.com/js/plugins/loader.js`
**Mount point:** `<div id="huli-searchbox" data-site="..." data-lang="es">`

| Site | dataSite value | Fallback directory URL |
|------|---------------|------------------------|
| Escazú | `momentum-escazu` | directorio.momentumescazu.com |
| Torre Médica / Pinares | `torre-medica-momentum` | directorio.torremedicamomentum.com |

**Currently integrated:**
- `/escazu/centro-medico` — HuliSearchbox between PageHeader and LogoGrid
- `/torre-medica/directorio` — HuliSearchbox replaces old iframe

---

## 8. Design System

- **Dark background:** `#070D14` (near-black)
- **CSS variable `--dk`:** used in footer background
- **CSS variable `--a`:** accent color (varies per site)
- **Typography:** System font stack, `fontWeight: 200–600`, `letterSpacing` for elegance
- **No CSS framework** — all inline styles
- **Spacing:** generous whitespace, `padding: '80px 32px'` typical for sections
- **Borders:** `0.5px solid rgba(255,255,255,0.06)` for subtle dark separators
- **Images:** Next.js `<Image>` with `/sites/{site}/banners/`, `/sites/{site}/logos/`, `/sites/{site}/photos/`

---

## 9. Important Rules & Patterns

### Server vs Client components
- Pages that export `metadata` MUST be server components (no `'use client'`)
- Components with hooks/events need `'use client'`
- Server pages CAN import client components (Next.js handles the boundary)

### Copy style
- Costa Rican vos imperative: "Elegí", "Descubrí", "Explorá", "Encontrá", "Agendá", "Consultá"
- NOT "Elije/Elige", "Descubre", "Explora" — those are tú forms

### Landing page
- Shows exactly 3 destinations: Lindora, Escazú, Pinares
- Torre Médica was REMOVED from landing page
- Tagline: "Tres destinos. Un ecosistema."

### Footer cross-discovery
- Each site footer shows the other 2 sites (not Torre Médica)
- Label: "Descubrí el ecosistema Momentum" (NOT "Descubre")

---

## 10. Public Assets Location

```
public/
├── brand/
│   ├── momentum-white.png          ← Generic Momentum logo (Escazú, Pinares)
│   ├── lindora-white.png           ← Lindora specific
│   ├── lindora-color.png
│   ├── lindora-full.png
│   └── momentum-lindora-white.png
└── sites/
    ├── lindora/banners/ photos/ logos/ app/
    ├── escazu/banners/ photos/ logos/
    └── pinares/banners/ photos/ logos/
```

---

## 11. Completed Work Log

| Date | Item | Notes |
|------|------|-------|
| 2026-05-21 | Formspree contact form | Form ID `mnjrgqee`, email `mercadeo@momentum.co.cr`, env var `NEXT_PUBLIC_FORMSPREE_ID` on Vercel |
| 2026-05-21 | WhatsApp badge | All 3 sites use direct link `https://wa.me/message/434VEBX5JFO7D1` (hardcoded in `WhatsAppBadge.tsx`) |
| 2026-05-21 | Landing page scroll indicator | Replaced thin glowing line with chevron-down SVG arrow |
| 2026-05-21 | Alquiler inquiry form | `AlquilerPage.tsx` has `LeaseInquiryForm` wired to Formspree; fields: nombre, correo, teléfono, tipo de espacio, área, mensaje |
| 2026-05-21 | App page QR codes | `AppPage.tsx` shows QR codes for App Store + Google Play (via `api.qrserver.com`) |
| 2026-05-21 | Mobile audit | All main pages audited and fixed (tasks 46, 59 complete) |
| 2026-05-21 | Category grid images — Lindora | All 9 cuisine category images updated |
| 2026-05-21 | Category grid images — Escazú | 6 category images updated (filenames: `*-v2.webp` for cache busting); data refs updated in `gastronomia.ts` |
| 2026-05-21 | Category grid images — Pinares | Updated (no separate categories folder — uses inline data images) |
| 2026-05-26 | Nav z-index fix | `Nav.tsx` and `TorreMedicaNav.tsx` raised to `zIndex: 1000` to stay above Huli sticky search bar |
| 2026-05-26 | SEO — JSON-LD structured data | Added `ShoppingCenter` schema to Lindora/Escazú/Pinares layouts; `MedicalOrganization` to Torre Médica layout |
| 2026-05-26 | SEO — Torre Médica OG image | Added missing OG image to Torre Médica layout (uses pinares hero banner) |
| 2026-05-26 | GA4 Analytics | Created `src/components/analytics/GoogleAnalytics.tsx`; wired into root layout; reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var |
| 2026-05-27 | Sanity CMS migration — schema + queries | Updated `tenant.ts` schema (logoUrl/photoUrl fallback fields); rewrote `queries.ts` (fixed slug.current, coalesce); rewrote `fetch.ts` (typed helpers, null fallback pattern) |
| 2026-05-27 | Sanity CMS migration — components | Added `resolveMediaUrl()` to `LogoGrid.tsx` and `TenantDetailPage.tsx` to handle Sanity CDN URLs vs local paths |
| 2026-05-27 | Sanity CMS migration — 14 directory pages | All 13 section pages + Pinares ofiplaza updated with `fetchTenantsBySection` + static fallback pattern; `revalidate = 3600` |
| 2026-05-27 | Sanity CMS migration — [slug] pages | All 3 `[slug]/page.tsx` files updated with `fetchTenantBySlug` + static fallback; `generateStaticParams` uses `fetchTenantSlugs` |
| 2026-05-27 | Sanity seed script | Created `scripts/seed-sanity.mjs` — seeds all tenants (Lindora, Escazú, Pinares) via Sanity mutations API; excludes Sucremart + Ramstack from Lindora comercios; run with `SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs` |

---

## 11b. Pending Tasks

| # | Task | Notes |
|---|------|-------|
| SEED | Run Sanity seed script | Need write token: sanity.io/manage → project klr3qmou → API → Tokens → create Editor token; then `SANITY_WRITE_TOKEN=sk... node web/scripts/seed-sanity.mjs` |
| 47 | Upload stock event images to Sanity | |
| 60 | Add premium lifestyle stock images to Sanity events | |
| GA4 | Add GA4 Measurement ID to Vercel | Create property at analytics.google.com, get G-XXXXXXXXXX, add as `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var in Vercel |
| SEO | Update `metadataBase` URLs to production domains when DNS flips | Currently all point to `momentumcr.vercel.app`; update to `momentumlindora.com`, `momentumescazu.com`, `momentumpinares.com` |
| SEO | Update sitemap base URL to production domains | `src/app/sitemap.ts` — change `BASE` const when domains flip |

---

## 12. Known Issues / History

- `.git/index.lock` blocks local git commands → always use GitHub API to push
- PPTX emoji don't render in LibreOffice/PowerPoint → use colored shape pills with text
- Torre Médica was removed from landing page (was 4th panel, now only 3)
- `src/data/sites/escazu/centro-medico.ts` was missing from GitHub (fixed 2026-05-21)
- `momentum-preview-coral.vercel.app` is an OLD URL — use `momentumcr.vercel.app`

---

## 13. Vercel Build Gotchas

- Build fails if any imported file doesn't exist in the repo (even if it exists locally)
- Always verify local-only files with: `curl .../repos/.../contents/PATH | python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if 'sha' in d else 'MISSING')"`
- Vercel project name in URL is still `momentum-prototype` (internal only — user-facing is `momentumcr.vercel.app`)
