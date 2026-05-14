/**
 * Momentum Hostname Routing Middleware
 *
 * Purpose: When production domains point to this Next.js app, all existing URLs
 * continue to work at the exact same paths — zero SEO loss, zero redirects.
 *
 * How it works:
 *   momentumlindora.com/la-fabbrica        → internally serves /lindora/la-fabbrica
 *   momentumescazu.com/gastronomia         → internally serves /escazu/gastronomia
 *   torremedicamomentum.com/directorio     → internally serves /torre-medica/directorio
 *   (browser URL stays unchanged — Google sees the same URL it already indexed)
 *
 * Preview domain (momentumcr.vercel.app) is unaffected — it
 * continues to use /lindora, /escazu, /pinares, /torre-medica prefixes.
 *
 * Only DNS change at the domain registrar will activate this behavior.
 * Live sites are 100% untouched until that moment.
 */

import { NextRequest, NextResponse } from 'next/server'

// ── Domain → site mapping ─────────────────────────────────────────────────────
function getSiteFromHostname(hostname: string): 'lindora' | 'escazu' | 'pinares' | 'torre-medica' | null {
  if (hostname.includes('torremedicamomentum')) return 'torre-medica'
  if (hostname.includes('lindora'))             return 'lindora'
  if (hostname.includes('escazu'))              return 'escazu'
  if (hostname.includes('pinares'))             return 'pinares'
  return null
}

// ── Paths that must pass through untouched ────────────────────────────────────
const BYPASS_PREFIXES = [
  '/_next',
  '/api',
  '/brand',
  '/sites',
  '/favicon',
  '/vercel',
]
const BYPASS_EXACT = new Set(['/sitemap.xml', '/robots.txt', '/favicon.ico'])

function shouldBypass(pathname: string): boolean {
  if (BYPASS_EXACT.has(pathname)) return true
  return BYPASS_PREFIXES.some((p) => pathname.startsWith(p))
}

// ── Known Squarespace section slugs per site ──────────────────────────────────
// Used to provide helpful redirects for old Squarespace-only paths.
const SQUARESPACE_REDIRECTS: Record<string, Record<string, string>> = {
  escazu: {
    '/gastronoma-2': '/gastronomia', // typo on live site — preserve redirect
    '/directorio':   '/gastronomia', // Squarespace nav link
    '/inicio':       '/',
  },
  lindora: {
    '/directorio': '/gastronomia',
    '/inicio':     '/',
  },
  pinares: {
    '/directorio': '/gastronomia',
    '/inicio':     '/',
  },
  'torre-medica': {
    '/inicio':  '/',
    '/home':    '/',
    '/contact': '/contacto',
  },
}

// ─────────────────────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const { pathname, search } = request.nextUrl

  // ── 1. www → apex redirect (canonical) ─────────────────────────────────────
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = hostname.slice(4) // strip "www."
    return NextResponse.redirect(url, { status: 301 })
  }

  // ── 2. Detect site from hostname ────────────────────────────────────────────
  const site = getSiteFromHostname(hostname)

  // Not a known Momentum production domain → pass through normally.
  // This covers the preview domain, localhost, etc.
  if (!site) {
    return NextResponse.next()
  }

  // ── 3. Bypass static assets and Next.js internals ──────────────────────────
  if (shouldBypass(pathname)) {
    return NextResponse.next()
  }

  // ── 4. Handle known Squarespace-specific redirects (301 — preserves equity) ─
  const legacyTarget = SQUARESPACE_REDIRECTS[site]?.[pathname]
  if (legacyTarget) {
    const url = request.nextUrl.clone()
    // Route through the site prefix so the rewrite in step 6 picks it up
    url.pathname = `/${site}${legacyTarget === '/' ? '' : legacyTarget}`
    return NextResponse.redirect(url, { status: 301 })
  }

  // ── 5. If URL already carries the site prefix, pass through ────────────────
  // (e.g. someone types momentumlindora.com/lindora/gastronomia — unlikely but safe)
  if (pathname.startsWith(`/${site}/`) || pathname === `/${site}`) {
    return NextResponse.next()
  }

  // ── 6. Core rewrite: flat URL → prefixed Next.js route ───────────────────
  // The browser URL remains unchanged — only the internal routing is affected.
  // momentumlindora.com/la-fabbrica           → serves /lindora/la-fabbrica
  // torremedicamomentum.com/directorio        → serves /torre-medica/directorio
  // torremedicamomentum.com/                  → serves /torre-medica
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${site}` : `/${site}${pathname}`
  return NextResponse.rewrite(url)
}

// ── Matcher: run on all routes except Next.js internals ──────────────────────
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image  (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon\\.ico).*)',
  ],
}
