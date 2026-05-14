/**
 * Sanity data fetching via HTTP API — no @sanity/client dependency.
 * Uses native fetch (Node 18+ / Edge Runtime compatible).
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'klr3qmou'
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VERSION = '2024-01-01'

// CDN for reads (fast, cached). Disable for fresh data during ISR/SSR.
const BASE_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`

export async function sanityFetch<T = unknown>(
  query: string,
  options: { cache?: RequestCache; revalidate?: number } = {}
): Promise<T | null> {
  const { cache = 'force-cache', revalidate } = options

  const url = `${BASE_URL}?query=${encodeURIComponent(query)}`

  try {
    const res = await fetch(url, {
      cache,
      next: revalidate !== undefined ? { revalidate } : undefined,
      headers: {
        // Public dataset — no auth token needed for reads
        'Accept': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`[sanityFetch] HTTP ${res.status} for query: ${query.slice(0, 80)}`)
      return null
    }

    const json = await res.json()
    return json.result as T
  } catch (err) {
    console.error('[sanityFetch] fetch error:', err)
    return null
  }
}

// ── Typed query helpers ──────────────────────────────────────────────────────

export async function fetchEventsBySite(siteId: string) {
  const query = `*[_type == "siteEvent" && site == "${siteId}"] | order(date asc) {
    id,
    title,
    subtitle,
    description,
    date,
    timeLabel,
    "image": image.asset->url,
    tag,
    ctaLabel,
    ctaUrl,
    featured
  }`
  return sanityFetch<Record<string, unknown>[]>(query, { revalidate: 3600 })
}

export async function fetchTenantsBySite(siteId: string) {
  const query = `*[_type == "tenant" && site == "${siteId}"] | order(name asc) {
    slug,
    name,
    section,
    category,
    tagline,
    description,
    "logo": logo.asset->url,
    "photo": photo.asset->url,
    hours,
    phone,
    local,
    website,
    facebook,
    instagram,
    whatsapp,
    menuUrl,
    featured
  }`
  return sanityFetch<Record<string, unknown>[]>(query, { revalidate: 3600 })
}
