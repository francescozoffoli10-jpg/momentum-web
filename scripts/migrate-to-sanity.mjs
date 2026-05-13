/**
 * Momentum → Sanity Migration Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads all static TypeScript data files and imports them into Sanity.
 *
 * SETUP (one-time):
 *   1. cp .env.example .env.local
 *   2. Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 *   3. node scripts/migrate-to-sanity.mjs
 *
 * The script is IDEMPOTENT — re-running it updates existing documents.
 * It uses the tenant slug + site as the Sanity document _id to avoid duplicates.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Load env ──────────────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

function loadEnv() {
  try {
    const raw = readFileSync(join(root, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const [k, ...v] = line.split('=')
      if (k && v.length) process.env[k.trim()] = v.join('=').trim()
    }
  } catch { /* .env.local not found — rely on process.env */ }
}
loadEnv()

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const TOKEN      = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || PROJECT_ID === 'REPLACE_ME') {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID not set. See .env.example.')
  process.exit(1)
}
if (!TOKEN) {
  console.error('❌  SANITY_API_TOKEN not set. Create an Editor token at sanity.io → your project → API.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2024-01-01',
  token:     TOKEN,
  useCdn:    false,
})

// ── Static data (imported as JSON via dynamic require-workaround) ─────────────
// Since the source files are TypeScript we read a pre-compiled version.
// For migration purposes, we inline the data here as plain JS objects.
// If you add new tenants to the .ts files, update this list before re-running.

// Load data dynamically from compiled output or inline
async function loadData() {
  // Try to import the compiled data files if available
  // Otherwise fall back to manual inline (see bottom of this file)
  try {
    const base = `file://${root}/src/data/sites`

    const [
      { gastronomia: lGastro },
      { comercios:   lCom   },
      { servicios:   lServ  },
      { mediplaza:   lMed   },
      { ofiplaza:    lOfi   },
      { eventos:     lEvt   },
    ] = await Promise.all([
      import(`${base}/lindora/gastronomia.js`).catch(() => ({ gastronomia: [] })),
      import(`${base}/lindora/comercios.js`  ).catch(() => ({ comercios:   [] })),
      import(`${base}/lindora/servicios.js`  ).catch(() => ({ servicios:   [] })),
      import(`${base}/lindora/mediplaza.js`  ).catch(() => ({ mediplaza:   [] })),
      import(`${base}/lindora/ofiplaza.js`   ).catch(() => ({ ofiplaza:    [] })),
      import(`${base}/lindora/eventos.js`    ).catch(() => ({ eventos:     [] })),
    ])

    return {
      lindora: {
        tenants: [...lGastro, ...lCom, ...lServ, ...lMed, ...lOfi],
        eventos: lEvt,
      },
    }
  } catch {
    console.warn('⚠️  Could not load compiled .js files. Run `tsc` first, or use ts-node.')
    return { lindora: { tenants: [], eventos: [] } }
  }
}

// ── Upsert helpers ────────────────────────────────────────────────────────────
function tenantDocId(siteId, slug) {
  return `tenant-${siteId}-${slug}`
}

function eventDocId(siteId, id) {
  return `event-${siteId}-${id}`
}

async function upsertTenant(siteId, tenant) {
  const docId = tenantDocId(siteId, tenant.slug)

  const doc = {
    _id:   docId,
    _type: 'tenant',
    site:  siteId,
    slug:  tenant.slug,
    name:  tenant.name,
    section:     tenant.section,
    category:    tenant.category,
    tagline:     tenant.tagline     ?? '',
    description: tenant.description ?? '',
    featured:    tenant.featured    ?? false,
    local:       tenant.local       ?? '',
    hours:       (tenant.hours ?? []).map((h, i) => ({
      _key: `h${i}`,
      days:  h.days,
      hours: h.hours,
    })),
    phone:     tenant.phone     ?? '',
    whatsapp:  tenant.whatsapp  ?? '',
    website:   tenant.website   ?? '',
    menuUrl:   tenant.menuUrl   ?? '',
    instagram: tenant.instagram ?? '',
    facebook:  tenant.facebook  ?? '',
    // logo / photo / gallery: uploaded separately via Sanity Studio
    // Use logo filename as a temporary text note in description until images are uploaded
  }

  // Remove empty strings so Sanity stays clean
  for (const key of Object.keys(doc)) {
    if (doc[key] === '') delete doc[key]
  }

  try {
    await client.createOrReplace(doc)
    return true
  } catch (err) {
    console.error(`  ✗ ${tenant.name}:`, err.message)
    return false
  }
}

async function upsertEvent(siteId, event) {
  const docId = eventDocId(siteId, event.id)

  const doc = {
    _id:   docId,
    _type: 'siteEvent',
    site:  siteId,
    id:    event.id,
    title: event.title,
    subtitle:    event.subtitle    ?? '',
    description: event.description ?? '',
    date:        event.date,
    timeLabel:   event.timeLabel   ?? '',
    tag:         event.tag         ?? '',
    ctaLabel:    event.ctaLabel    ?? '',
    ctaUrl:      event.ctaUrl      ?? '',
    featured:    event.featured    ?? false,
  }

  for (const key of Object.keys(doc)) {
    if (doc[key] === '') delete doc[key]
  }

  try {
    await client.createOrReplace(doc)
    return true
  } catch (err) {
    console.error(`  ✗ ${event.title}:`, err.message)
    return false
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  Momentum → Sanity migration`)
  console.log(`    Project: ${PROJECT_ID}  Dataset: ${DATASET}\n`)

  const data = await loadData()

  // Lindora tenants
  const lTenants = data.lindora.tenants
  if (lTenants.length > 0) {
    console.log(`📦  Lindora: importing ${lTenants.length} tenants…`)
    let ok = 0
    for (const t of lTenants) {
      const success = await upsertTenant('lindora', t)
      if (success) { ok++; process.stdout.write('.') }
    }
    console.log(`\n    ✓ ${ok}/${lTenants.length} tenants imported`)
  } else {
    console.log('ℹ️   No compiled Lindora tenant data found.')
    console.log('    Run: npx tsc --outDir ./.sanity-tmp --module esnext --moduleResolution bundler')
    console.log('    Or open Sanity Studio at /studio and create tenants manually.\n')
  }

  // Lindora events
  const lEvents = data.lindora.eventos
  if (lEvents.length > 0) {
    console.log(`\n📅  Lindora: importing ${lEvents.length} events…`)
    let ok = 0
    for (const e of lEvents) {
      const success = await upsertEvent('lindora', e)
      if (success) { ok++; process.stdout.write('.') }
    }
    console.log(`\n    ✓ ${ok}/${lEvents.length} events imported`)
  }

  console.log('\n✅  Migration complete!')
  console.log('\nNEXT STEPS:')
  console.log('  1. Open https://sanity.io/manage and verify your documents')
  console.log('  2. Upload logos + photos via Sanity Studio at /studio')
  console.log('  3. Once all images are uploaded, swap data imports in pages to use sanityClient')
  console.log('     See: src/sanity/lib/queries.ts for the GROQ queries\n')
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
