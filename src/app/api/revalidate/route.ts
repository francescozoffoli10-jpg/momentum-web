/**
 * Sanity webhook → Vercel On-Demand Revalidation
 *
 * Sanity fires this endpoint whenever a tenant or siteEvent is published/deleted.
 * We revalidate the affected site's pages so changes appear immediately.
 *
 * Webhook URL: https://momentumcr.vercel.app/api/revalidate?secret=SANITY_REVALIDATE_SECRET
 * Trigger on: publish, unpublish, delete — document types: tenant, siteEvent
 */

import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const SECRET = process.env.SANITY_REVALIDATE_SECRET

// All paths to revalidate per site
const SITE_PATHS: Record<string, string[]> = {
  lindora: [
    '/lindora',
    '/lindora/gastronomia',
    '/lindora/comercios',
    '/lindora/servicios',
    '/lindora/ofiplaza',
    '/lindora/mediplaza',
    '/lindora/eventos',
  ],
  escazu: [
    '/escazu',
    '/escazu/gastronomia',
    '/escazu/servicios',
    '/escazu/centro-medico',
    '/escazu/oficentro',
    '/escazu/eventos',
  ],
  pinares: [
    '/pinares',
    '/pinares/gastronomia',
    '/pinares/comercios',
    '/pinares/servicios',
    '/pinares/torre-medica',
    '/pinares/ofiplaza',
    '/pinares/eventos',
  ],
}

export async function POST(req: NextRequest) {
  // Verify secret
  const secret = req.nextUrl.searchParams.get('secret')
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; site?: string; slug?: { current?: string } } = {}
  try {
    body = await req.json()
  } catch {
    // Body might be empty for some webhook events — still revalidate all
  }

  const { _type, site, slug } = body

  try {
    if (_type === 'tenant') {
      if (site && SITE_PATHS[site]) {
        // Revalidate all section pages for this site
        for (const path of SITE_PATHS[site]) {
          revalidatePath(path, 'page')
        }
        // Revalidate the specific tenant detail page if slug is known
        if (slug?.current) {
          revalidatePath(`/${site}/${slug.current}`, 'page')
        } else {
          // Revalidate all tenant detail pages for this site (broad sweep)
          revalidatePath(`/${site}`, 'layout')
        }
      } else {
        // Site not specified — revalidate everything
        revalidatePath('/', 'layout')
      }
    } else if (_type === 'siteEvent') {
      if (site && SITE_PATHS[site]) {
        revalidatePath(`/${site}/eventos`, 'page')
      } else {
        revalidatePath('/lindora/eventos', 'page')
        revalidatePath('/escazu/eventos', 'page')
        revalidatePath('/pinares/eventos', 'page')
      }
    } else {
      // Unknown type — revalidate everything to be safe
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      type: _type ?? 'unknown',
      site: site ?? 'all',
      slug: slug?.current ?? null,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[revalidate] Error:', err)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}

// Also allow GET for easy manual testing from browser
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, message: 'All paths cleared', timestamp: new Date().toISOString() })
}
