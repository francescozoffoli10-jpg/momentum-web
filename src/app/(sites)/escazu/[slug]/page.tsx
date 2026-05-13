import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allTenants, getTenant } from '@/data/sites/escazu/all'
import { escazuSite } from '@/data/sites/escazu/index'
import TenantDetailPage from '@/components/pages/TenantDetailPage'
import { buildTenantSchema } from '@/lib/schema'
import { CANONICAL } from '@/lib/canonical'

const CANONICAL_BASE = CANONICAL.escazu

export async function generateStaticParams() {
  return allTenants.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) return {}
  const ogImage = `${CANONICAL_BASE}/sites/escazu/logos/${tenant.logo}`
  return {
    title: `${tenant.name} — Momentum Escazú`,
    description: tenant.description,
    openGraph: {
      title: `${tenant.name} — Momentum Escazú`,
      description: tenant.description,
      url: `${CANONICAL_BASE}/${slug}`,
      siteName: 'Momentum Escazú',
      images: [{ url: ogImage, width: 400, height: 200, alt: tenant.name }],
      locale: 'es_CR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${tenant.name} — Momentum Escazú`,
      description: tenant.description,
      images: [ogImage],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) notFound()

  const related = allTenants
    .filter(t => t.slug !== slug && t.section === tenant.section)
    .sort((a, b) => {
      const sameA = a.category === tenant.category ? 0 : 1
      const sameB = b.category === tenant.category ? 0 : 1
      return sameA - sameB || a.name.localeCompare(b.name, 'es')
    })
    .slice(0, 4)

  const jsonLd = buildTenantSchema(tenant, escazuSite, CANONICAL_BASE)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TenantDetailPage
        tenant={tenant}
        relatedTenants={related}
        siteId="escazu"
        basePath="/escazu"
        site={escazuSite}
      />
    </>
  )
}
