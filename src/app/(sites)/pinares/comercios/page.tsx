import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { comercios } from '@/data/sites/pinares/comercios'

export const metadata: Metadata = {
  title: 'Comercios',
  description: 'Tiendas, moda y servicios en Momentum Pinares.',
}

export default function ComerciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Comercios"
        description="Moda, hogar, servicios y mucho más en Momentum Pinares."
        count={comercios.length}
        countLabel="comercios"
        sectionLinks={[
    { href: "/pinares/gastronomia", label: "Gastronomía", active: false },
    { href: "/pinares/comercios", label: "Comercios", active: true },
        ]}
      />
      <LogoGrid tenants={comercios} basePath="/pinares" siteId="pinares" />
    </>
  )
}
