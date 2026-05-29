# Momentum Costa Rica — Project Memory

> Last updated: 2026-05-28

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
- **GitHub token:** Generate at github.com/settings/tokens → classic token, `repo` scope, name "Momentum deploy" (redacted — never commit the actual token)

### ⚠️ CRITICAL: Repo Structure & Build Path

The repo root IS the Next.js project. Vercel builds from `/` (repo root), NOT from `web/`.

```
/ (repo root — what Vercel builds)
├── next.config.ts        ← built by Vercel
├── package.json
├── tsconfig.json         ← excludes: node_modules, web, src/sanity, src/app/studio, src/src
├── src/                  ← THE SOURCE CODE Vercel deploys
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── sanity/
└── web/                  ← LOCAL MIRROR ONLY — excluded from TypeScript, NOT deployed
    └── src/ ...          ← changes here do NOT affect the live site
```

**ALL file pushes for deployment MUST target root paths** (`src/...`, `next.config.ts`, etc.).  
Files pushed to `web/src/...` are ignored by the build.

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

- **Framework:** Next.js 16.2.6 App Router (TypeScript), React 19
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
| 2026-05-27 | Tenant video support | Added `videoUrl` field to `types.ts`, Sanity schema (`videoFile` file type), and queries; `TenantDetailPage.tsx` shows video in 3rd hero column on desktop; video plays behind logo on mobile; CSS classes `has-video`, `tenant-hero-video-col`, `tenant-hero-video-bg` |
| 2026-05-28 | Tenant videos uploaded to Sanity | 10 Lindora tenants have videos live in Sanity: La Fabbrica, Ají Limón, El Ávila Bar & Grill, Naans & Curries, Nail Station by Sense, Pâtisserie d'Amour, Shawaddi, Soda Tapia, Zócalo. Downloaded from Google Drive (file IDs resolved via Drive DOM), uploaded via Sanity Assets API, patched tenant docs via Mutations API. |
| 2026-05-27 | Sanity webhook → Vercel revalidation | Created `src/app/api/revalidate/route.ts` (POST+GET); `SANITY_REVALIDATE_SECRET` env var in Vercel; Sanity webhook "Vercel Revalidation" fires on Create/Update/Delete for `tenant`+`siteEvent` in `production` dataset; cache now clears instantly on publish/delete |
| 2026-05-27 | Fix fetch fallback logic | `fetch.ts`: `null` = fetch error (fall back to static), `[]` = intentional empty (respect it); `revalidate` reduced from 3600→300s as safety net |
| 2026-05-27 | Fix Vercel build failures | Root cause: `tsconfig.json` `include: ["**/*.tsx"]` was picking up `web/src/**` files; `web/src/app/**/[slug]/page.tsx` imported `fetchTenantBySlug`/`fetchTenantSlugs` that don't exist in `src/sanity/lib/fetch.ts`. Fix: added `"web"` to tsconfig `exclude`. Also removed invalid `eslint` property from `next.config.ts` (removed in Next.js 16). Build now passing. |
| 2026-05-27 | Fix [slug] page 500s — null slugs | Sanity seeds some docs with `slug: null`; these passed the related filter (`null !== 'slug'` = true) and crashed `RelatedCard`. Fix: added `t.slug &&` guard to related tenants filter in all 3 `[slug]/page.tsx` files. |
| 2026-05-27 | Fix [slug] page 500s — null logos | `resolveMediaUrl(null, ...)` returns `''`; `<Image src="">` throws in Next.js. Fix: guarded `<Image>` in `RelatedCard` and hero with `{logoSrc ? <Image .../> : <div placeholder />}`. |
| 2026-05-27 | Fix [slug] page 500s — null gallery | `fetch()` returns `"gallery": null` from Sanity; spread `[photo, ...null]` throws (default params only fire for `undefined`, not `null`). Fix: changed to `[photo, ...(gallery ?? [])]` and `(gallery?.length ?? 0) > 0` in `PhotoGallery`. |
| 2026-05-27 | **Sanity CMS fully live** ✅ | All tenant detail pages + directory pages now read from Sanity with static fallback. Revalidation webhook active. 200 across all routes on `momentumcr.vercel.app`. |
| 2026-05-28 | Delete test tenants | Deleted `Prueba Delicias` (lindora) and `Imagen Test` (pinares) test entries from Sanity via Mutations API DELETE operation |
| 2026-05-28 | Fix Pinares cross-site logo filenames | 4 tenants updated: `boston-beer-garden` → `boston-beer-garden.png`, `naans-curries-pinares` → `naans-curries-pinares.png`, `vinum-pinares` → `vinum-pinares.png`, `dj-arbitraje-oficentro` → `dj-arbitraje-oficentro.png` |
| 2026-05-28 | Lindora logo/photo audit + full remapping | Visually audited all 46 logo files via browser JS overlay. Logo files had wrong content (e.g. `aji-limon.png` actually contained AquaNest logo). Bulk-patched Sanity `logoUrl`+`photoUrl` for 31 Lindora tenants via Mutations API. See Known Issues for remaining unresolved tenants. |
| 2026-05-28 | Lindora logo audit round 2 — 3 more fixes | Found 3 more mismatched logos via close inspection: `george-bakkar` → `dongfeng.png`; `naans-curries` → `sales-xcelerator.png`; `purple-express` → `md-fajas.png`. All patched in Sanity + verified live. |
| 2026-05-28 | Full Escazú logo audit | Visually audited all 31 logo files. All correctly match their tenants. 5 tenants with no file uploaded (not mismatched): `audinsa`, `capri`, `centro-medico-momentum`, `kinesis`, `la-clinique`. |
| 2026-05-28 | Full Pinares logo audit | Visually audited all 51 logo files. All correctly match their tenants. Several Torre Médica specialists use `torre-medica.png` as expected fallback. |
| 2026-05-28 | Lindora photo audit round 3 — Zócalo + Newgate fixes | Zócalo: patched `photoUrl` → `ortodoncia-loranca.webp` (file confirmed in GitHub). Newgate Tattoos: patched `logoUrl` → `newgate.png` (correct tattoo studio logo), `photoUrl` → `rejuvenese.webp` (correct b&w tattoo artist photo). Transaction `UAjCtlAuHSg7wG7TzF29nn`. |
| 2026-05-28 | Nail Station photo diagnosed | `plantimec.webp` (54KB, 1080×1350) is valid WEBP but contains a medical insole/orthopedic product image — wrong for Nail Station. No correct Nail Station photo file exists in the folder. Needs new file uploaded. |
| 2026-05-29 | Sanity schema fix — deployed missing fields | `src/sanity/schemas/tenant.ts` on GitHub was missing `logoUrl`, `photoUrl`, `videoFile` fields (only existed in local web/ mirror). Pushed full corrected schema to root `src/sanity/schemas/tenant.ts`. Commit: `50f6af58`. |
| 2026-05-29 | Lindora logos + photos — full slug-based remapping | 39 logos (PNG) + 39 photos (WebP, converted from JPG via Pillow) uploaded to `public/sites/lindora/logos/` and `public/sites/lindora/photos/` using clean slug-based filenames. All 39 Lindora tenant Sanity docs patched with `logoUrl` + `photoUrl`. Transaction `bM4Vn6Xhr0kQ8myfj5AjZq`. |
| 2026-05-29 | Legatus video — Lindora | Downloaded from Google Drive (66.6 MB), compressed to 5.4 MB via ffmpeg (CRF 28, 720p, no audio), uploaded to Sanity Assets API, patched `lindora-legatus`. |
| 2026-05-29 | Pinares videos — all 20 tenants | Downloaded, compressed (CRF 28, 720p), uploaded to Sanity, patched all 20 Pinares tenant docs: spazio-verde, sazon-tico, refill-to-go, play-and-dream, pikeos, ottos-corner, naans-curries-pinares, kenana, wkb-honbu-dojo, gnc, fun-in-a-box, la-fonda-azteca, el-caminito, dennys, da-noi, chamo-gourmet, boston-beer-garden, bbq-chicken-pinares, ayana-fashion, antonella-boutique. Videos sourced from `https://drive.google.com/drive/folders/1IxujsYcsFIKGFTjBDt0g4KEvc8Okp8in`. |
| 2026-05-29 | Escazú videos — 8 tenants | Downloaded, compressed, uploaded, patched: paladixo, la-clinique, gyrotronic, goodmed-escazu, entrecote, el-tramito-a-granel, contrology-pilates, audinsa. Sourced from `https://drive.google.com/drive/folders/1nJHU3u9RLusOZraOMQtT77U9Rk6JYTtB`. 3 Drive folders (Dr. Manrique Navas, DermaKids, General) skipped — no matching Sanity slug. |

---

## 11b. Pending Tasks

| # | Task | Notes |
|---|------|-------|
| ~~SEED~~ | ~~Run Sanity seed script~~ | ✅ Done 2026-05-27 — 140 tenants seeded across Lindora/Escazú/Pinares |
| ~~AUDIT~~ | ~~Audit Escazú and Pinares logos~~ | ✅ Done 2026-05-28 — both sites clean, no mismatches |
| ~~LINDORA LOGOS/PHOTOS~~ | ~~Upload slug-based logos + photos for all Lindora tenants~~ | ✅ Done 2026-05-29 — 39 logos + 39 photos pushed to GitHub, all Sanity docs patched |
| ~~PINARES VIDEOS~~ | ~~Upload all Pinares tenant videos~~ | ✅ Done 2026-05-29 — 20 tenants, all in Sanity |
| ~~ESCAZU VIDEOS~~ | ~~Upload all Escazú tenant videos~~ | ✅ Done 2026-05-29 — 8 tenants, all in Sanity |
| LOGOS | Upload logos for 2 remaining Lindora tenants | Core Medical Center (`core-medical.png` has Shawaddi logo), MDT Costa Rica (`mdt-costa-rica.png` has Soda Tapia logo) — correct logo files not found in folder; need new files uploaded and Sanity patched |
| LOGOS | Upload logos for Escazú tenants with no file | `audinsa`, `capri`, `centro-medico-momentum`, `kinesis`, `la-clinique` — no logo file in `public/sites/escazu/logos/` |
| ~~PHOTOS~~ | ~~Zócalo photo fixed~~ | ✅ Done 2026-05-28 — patched to `ortodoncia-loranca.webp` (confirmed in GitHub repo) |
| PHOTOS | Nail Station has no correct photo | `plantimec.webp` contains a medical insole image (wrong). No correct Nail Station photo in folder. Need new file: upload to `public/sites/lindora/photos/nail-station-photo.webp` (or similar) and patch Sanity `photoUrl` |
| VIDEOS | Vinum (Lindora) video | Antonella was uploading as .mov — needs conversion to MP4 first. If she can provide Drive link, download + convert + upload. |
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

### ⚠️ Lindora Logo/Photo Mismatch (partially resolved 2026-05-28)

Logo and photo files in `public/sites/lindora/logos/` and `public/sites/lindora/photos/` were batch-uploaded with incorrect filename assignments. Example: `aji-limon.png` contained AquaNest's logo, `kotoy.png` contained Desarrolladores 506's logo, etc.

**Fix applied:** Patched Sanity `logoUrl`/`photoUrl` for 31 tenants so each points to the file that actually contains its correct image. Files were NOT renamed — the fix is entirely in Sanity data.

**Round 2 fixes (2026-05-28):** Found 3 more logos hiding under wrong filenames:
- `naans-curries` → fixed: `sales-xcelerator.png` contained the correct logo ✓
- `george-bakkar` → fixed: `dongfeng.png` contained the correct logo ✓
- `purple-express` → fixed: `md-fajas.png` contained the correct logo ✓

**Round 3 fixes (2026-05-28):**
- `zocalo` → photo fixed: `ortodoncia-loranca.webp` (confirmed in GitHub repo) ✓
- `newgate-tattoos` → logo fixed: `newgate.png` (correct tattoo studio logo) ✓; photo fixed: `rejuvenese.webp` ✓

**Still unresolved (no correct file exists anywhere in the folder):**
- `core-medical` — `core-medical.png` has Shawaddi logo; `core-medical.webp` has Shawaddi food photo — correct files not uploaded
- `mdt-costa-rica` — `mdt-costa-rica.png` has Soda Tapia logo; `mdt-costa-rica.webp` has Soda Tapia desserts — correct files not uploaded
- `nail-station` — `plantimec.webp` contains a medical insole image (wrong); no correct Nail Station photo in folder

**Escazú logos**: Fully audited 2026-05-28 — all 31 files correctly match their tenants. No mismatches.
**Pinares logos**: Fully audited 2026-05-28 — all 51 files correctly match their tenants. No mismatches.

### ✅ Sanity Migration Complete (2026-05-27)

All Sanity migration files have been pushed to root `src/` and are **live on Vercel**. The site reads from Sanity CMS with static data fallback on every page. 140 tenants are seeded across Lindora/Escazú/Pinares.

The `web/src/` folder remains as a local mirror only — any future changes must be pushed to root `src/` via GitHub API.

---

## 13. Vercel Build Gotchas

- Vercel builds from repo ROOT — all source files must be at `src/...` not `web/src/...`
- `tsconfig.json` now excludes `"web"` to prevent web mirror files from causing TS errors
- `next.config.ts` at root must NOT have `eslint: { ignoreDuringBuilds: true }` — removed in Next.js 16
- Build fails if any imported file doesn't exist in the repo (even if it exists locally)
- `src/sanity` is excluded from TypeScript but files are still type-checked when imported by included files
- Always verify file exists at correct path: `curl .../repos/.../contents/src/PATH | python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if 'sha' in d else 'MISSING')"`
- Vercel project name in URL is still `momentum-prototype` (internal only — user-facing is `momentumcr.vercel.app`)
- The "middleware" convention is deprecated in Next.js 16 — warning shown but not an error (use "proxy" eventually)
