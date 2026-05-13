import type { Tenant, SiteConfig } from '@/data/types'
import type { HoursRow } from '@/data/types'

// ── Type mapping ──────────────────────────────────────────────────────────────

function schemaType(category: string): string {
  const c = category.toLowerCase()
  if (c.includes('gastronomía') || c.includes('restaurante') || c.includes('café') || c.includes('bistro') || c.includes('sushi') || c.includes('japonesa') || c.includes('italiana') || c.includes('pizza') || c.includes('cocina')) return 'Restaurant'
  if (c.includes('dental') || c.includes('odontología')) return 'Dentist'
  if (c.includes('óptica') || c.includes('opticas')) return 'Optician'
  if (c.includes('farmacia')) return 'Pharmacy'
  if (c.includes('pilates') || c.includes('gym') || c.includes('fitness') || c.includes('dojo') || c.includes('crossfit') || c.includes('deporte')) return 'SportsActivityLocation'
  if (c.includes('estética') || c.includes('belleza') || c.includes('spa') || c.includes('hair') || c.includes('skin') || c.includes('wax')) return 'BeautySalon'
  if (c.includes('médic') || c.includes('salud') || c.includes('clínica') || c.includes('hospital') || c.includes('oncolog') || c.includes('reumatolog') || c.includes('médic') || c.includes('insalud') || c.includes('goodmed') || c.includes('age metrics')) return 'MedicalBusiness'
  if (c.includes('moda') || c.includes('ropa') || c.includes('boutique') || c.includes('fashion')) return 'ClothingStore'
  if (c.includes('electrónic') || c.includes('tecnología') || c.includes('ishop') || c.includes('radio shack')) return 'ElectronicsStore'
  if (c.includes('hogar') || c.includes('muebles') || c.includes('decoración')) return 'HomeGoodStore'
  if (c.includes('automóvil') || c.includes('auto') || c.includes('dongfeng') || c.includes('lynk')) return 'AutoDealer'
  if (c.includes('banco') || c.includes('financier')) return 'BankOrCreditUnion'
  if (c.includes('oficin') || c.includes('oficentro') || c.includes('ofiplaza')) return 'ProfessionalService'
  return 'LocalBusiness'
}

// ── Day name conversion ────────────────────────────────────────────────────────

const DAY_MAP: Record<string, string> = {
  lun: 'Mo', mar: 'Tu', 'mié': 'We', mie: 'We',
  jue: 'Th', vie: 'Fr', 'sáb': 'Sa', sab: 'Sa', dom: 'Su',
  'lun – vie': 'Mo-Fr', 'lun – sáb': 'Mo-Sa', 'lun – dom': 'Mo-Su',
  'lun - vie': 'Mo-Fr', 'lun - sáb': 'Mo-Sa', 'lun - dom': 'Mo-Su',
  'mar – vie': 'Tu-Fr', 'mar - vie': 'Tu-Fr',
  'lun – jue': 'Mo-Th', 'lun - jue': 'Mo-Th',
  'vie – dom': 'Fr-Su', 'vie - dom': 'Fr-Su',
  'sáb – dom': 'Sa-Su', 'sab - dom': 'Sa-Su',
}

function parseTimeTo24(t: string): string | null {
  const lower = t.toLowerCase().replace(/\s/g, '')
  if (!lower) return null
  const pm = lower.includes('p.m.') || lower.includes('pm')
  const am = lower.includes('a.m.') || lower.includes('am')
  const clean = lower.replace(/a\.m\.|p\.m\.|am|pm/g, '').replace(':', '.')
  const parts = clean.split('.')
  let h = parseInt(parts[0] ?? '0', 10)
  const m = parseInt(parts[1] ?? '0', 10)
  if (isNaN(h)) return null
  if (pm && h !== 12) h += 12
  if (am && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function convertHoursRow(row: HoursRow): string | null {
  const dayKey = row.days.toLowerCase().trim()
  const schemaDay = DAY_MAP[dayKey]
  if (!schemaDay) return null

  const hoursStr = row.hours.toLowerCase()
  if (hoursStr.includes('24 hora')) return `${schemaDay} 00:00-23:59`

  // Split on – or - or "a" (Spanish)
  const parts = hoursStr.split(/\s*[–\-]\s*/)
  if (parts.length < 2) return null

  const open  = parseTimeTo24(parts[0])
  const close = parseTimeTo24(parts[parts.length - 1])
  if (!open || !close) return null

  return `${schemaDay} ${open}-${close}`
}

function buildOpeningHours(rows: HoursRow[]): string[] {
  return rows.map(convertHoursRow).filter((s): s is string => s !== null)
}

// ── Cuisine extraction ────────────────────────────────────────────────────────

function extractCuisine(category: string): string | undefined {
  const sub = category.split(' · ')[1]
  const gastronomyTerms = ['italiana', 'japonesa', 'peruana', 'mexicana', 'francesa', 'española', 'argentina', 'asiática', 'americana', 'costarricense', 'fusión', 'bistro', 'café', 'pizza', 'sushi', 'autor']
  if (sub && gastronomyTerms.some(t => sub.toLowerCase().includes(t))) return sub
  return undefined
}

// ── Main builder ──────────────────────────────────────────────────────────────

export function buildTenantSchema(
  tenant: Tenant,
  site: SiteConfig,
  canonicalBase: string,
): object {
  const type = schemaType(tenant.category + ' ' + tenant.name.toLowerCase())
  const sameAs: string[] = []
  if (tenant.website)   sameAs.push(tenant.website)
  if (tenant.instagram) sameAs.push(`https://instagram.com/${tenant.instagram}`)
  if (tenant.facebook)  sameAs.push(`https://facebook.com/${tenant.facebook}`)

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    name: tenant.name,
    description: tenant.description || tenant.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'San José',
      addressRegion: 'San José',
      addressCountry: 'CR',
    },
    url: `${canonicalBase}/${tenant.slug}`,
    logo: `${canonicalBase}/sites/${site.id}/logos/${tenant.logo}`,
    image: tenant.photo
      ? `${canonicalBase}/sites/${site.id}/photos/${tenant.photo}`
      : `${canonicalBase}/sites/${site.id}/logos/${tenant.logo}`,
    containedInPlace: {
      '@type': 'ShoppingCenter',
      name: site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address,
        addressLocality: 'San José',
        addressCountry: 'CR',
      },
    },
  }

  if (tenant.phone) {
    schema.telephone = tenant.phone
  }

  const openingHours = buildOpeningHours(tenant.hours ?? [])
  if (openingHours.length > 0) {
    schema.openingHoursSpecification = undefined // clear
    schema.openingHours = openingHours
  }

  const cuisine = extractCuisine(tenant.category)
  if (cuisine && type === 'Restaurant') {
    schema.servesCuisine = cuisine
  }

  if (sameAs.length > 0) {
    schema.sameAs = sameAs.length === 1 ? sameAs[0] : sameAs
  }

  return schema
}

// ── Site-level ShoppingCenter schema ─────────────────────────────────────────

export function buildSiteSchema(site: SiteConfig, canonicalBase: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ShoppingCenter',
    name: site.name,
    description: `${site.name} — destino lifestyle premium en ${site.address}, Costa Rica.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'San José',
      addressRegion: 'San José',
      addressCountry: 'CR',
    },
    telephone: site.phone,
    email: site.email,
    url: canonicalBase,
    sameAs: [
      `https://instagram.com/${site.instagram}`,
      `https://facebook.com/${site.facebook}`,
    ],
  }
}
