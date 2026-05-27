import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allTenants, getTenant } from '@/data/sites/pinares/all'
import { pinaresSite } from '@/data/sites/pinares/index'
import TenantDetailPage from '@/components/pages/TenantDetailPage'
import { buildTenantSchema } from '@/lib/schema'
import { CANONICAL } from '@/lib/canonical'
import { fetchTenantBySlug, fetchTenantSlugs, fetchTenantsBySite } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

const CANONICAL_BASE = CANONICAL.pinares

export const revalidate = 3600

export async function generateStaticParams() {
  const sanitySlugs = await fetchTenantSlugs('pinares')
  if (sanitySlugs.length > 0) return sanitySlugs.map((slug) => ({ slug }))
  return allTenants.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sanityTenant = await fetchTenantBySlug('pinares', slug)
  const tenant: Tenant | undefined = sanityTenant ?? getTenant(slug)
  if (!tenant) return {}
  const ogImage = tenant.logo?.startsWith('http')
    ? tenant.logo
    : `${CANONICAL_BASE}/sites/pinares/logos/${tenant.logo}`
  return {
    title: tenant.name,
    description: tenant.description,
    openGraph: {
      title: `${tenant.name} — Momentum Pinares`,
      description: tenant.description,
      url: `${CANONICAL_BASE}/${slug}`,
      siteName: 'Momentum Pinares',
      images: [{ url: ogImage, width: 400, height: 200, alt: tenant.name }],
      locale: 'es_CR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${tenant.name} — Momentum Pinares`,
      description: tenant.description,
      images: [ogImage],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const sanityTenant = await fetchTenantBySlug('pinares', slug)
  const tenant: Tenant | undefined = sanityTenant ?? getTenant(slug)
  if (!tenant) notFound()

  const sanityAll = await fetchTenantsBySite('pinares')
  const allPool: Tenant[] = sanityAll ?? allTenants
  const related = allPool
    .filter(t => t.slug !== slug && t.section === tenant.section)
    .sort((a, b) => {
      const sameA = a.category === tenant.category ? 0 : 1
      const sameB = b.category === tenant.category ? 0 : 1
      return sameA - sameB || a.name.localeCompare(b.name, 'es')
    })
    .slice(0, 4)

  const jsonLd = buildTenantSchema(tenant, pinaresSite, CANONICAL_BASE)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TenantDetailPage
        tenant={tenant}
        relatedTenants={related}
        siteId="pinares"
        basePath="/pinares"
        site={pinaresSite}
      />
    </>
  )
}
