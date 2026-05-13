import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allTenants, getTenant } from '@/data/sites/pinares/all'
import { pinaresSite } from '@/data/sites/pinares/index'
import TenantDetailPage from '@/components/pages/TenantDetailPage'

export async function generateStaticParams() {
  return allTenants.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) return {}
  return {
    title: tenant.name,
    description: tenant.description,
    openGraph: {
      title: `${tenant.name} — Momentum Pinares`,
      description: tenant.description,
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

  return (
    <TenantDetailPage
      tenant={tenant}
      relatedTenants={related}
      siteId="pinares"
      basePath="/pinares"
      site={pinaresSite}
    />
  )
}
