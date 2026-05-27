/**
 * Sanity data fetching via HTTP API — no @sanity/client dependency.
 * Uses native fetch (Node 18+ / Edge Runtime compatible).
 */

import type { Tenant, SiteEvent } from '@/data/types'
import {
  TENANTS_BY_SECTION,
  TENANTS_BY_SITE,
  TENANT_BY_SLUG,
  TENANT_SLUGS_BY_SITE,
  EVENTS_BY_SITE,
} from './queries'

const PROJECT_ID  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'klr3qmou'
const DATASET     = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VERSION = '2024-01-01'

// CDN for reads (fast, cached).
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
      headers: { 'Accept': 'application/json' },
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

// ── Tenant helpers ────────────────────────────────────────────────────────────

/**
 * Sanity is considered "not yet set up" only when the fetch itself fails (returns null).
 * An empty array [] is a valid CMS response — it means the section was intentionally cleared.
 * This ensures deletions are reflected immediately after the webhook triggers revalidation.
 */

/** Fetch tenants for a site + section. Returns null ONLY on fetch error (triggers static fallback). */
export async function fetchTenantsBySection(
  siteId: string,
  section: string
): Promise<Tenant[] | null> {
  const result = await sanityFetch<Tenant[]>(
    TENANTS_BY_SECTION(siteId, section),
    { revalidate: 300 }  // 5 min fallback; webhook clears cache instantly on publish/delete
  )
  // null = fetch error → fall back to static data
  // [] = intentionally empty section → respect it (show nothing)
  if (result === null) return null
  return result
}

/** Fetch all tenants for a site across all sections. */
export async function fetchTenantsBySite(siteId: string): Promise<Tenant[] | null> {
  const result = await sanityFetch<Tenant[]>(
    TENANTS_BY_SITE(siteId),
    { revalidate: 300 }
  )
  if (result === null) return null
  return result
}

/** Fetch a single tenant by slug. */
export async function fetchTenantBySlug(
  siteId: string,
  slug: string
): Promise<Tenant | null> {
  return sanityFetch<Tenant>(TENANT_BY_SLUG(siteId, slug), { revalidate: 300 })
}

/** Fetch just the slugs (for generateStaticParams). */
export async function fetchTenantSlugs(siteId: string): Promise<string[]> {
  const result = await sanityFetch<{ slug: string }[]>(
    TENANT_SLUGS_BY_SITE(siteId),
    { revalidate: 300 }
  )
  return result?.map((r) => r.slug) ?? []
}

// ── Event helpers ─────────────────────────────────────────────────────────────

export async function fetchEventsBySite(siteId: string): Promise<SiteEvent[] | null> {
  const result = await sanityFetch<SiteEvent[]>(
    EVENTS_BY_SITE(siteId),
    { revalidate: 300 }
  )
  if (result === null) return null
  return result
}
