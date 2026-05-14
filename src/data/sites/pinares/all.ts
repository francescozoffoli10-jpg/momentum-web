import { gastronomia, regionCards } from './gastronomia'
import { comercios } from './comercios'
import { servicios } from './servicios'
import { torreMedica } from './torre-medica'
import { ofiplaza } from './ofiplaza'
import type { Tenant, DirectorySection } from '@/data/types'

export { regionCards }

export const allTenants: Tenant[] = [
  ...gastronomia,
  ...comercios,
  ...servicios,
  ...torreMedica,
  ...ofiplaza,
]

export const tenantsBySection: Partial<Record<DirectorySection, Tenant[]>> = {
  gastronomia,
  comercios,
  servicios,
  'torre-medica': torreMedica,
  ofiplaza,
}

export function getTenant(slug: string): Tenant | undefined {
  return allTenants.find((t) => t.slug === slug)
}

export function getTenantsBySection(section: DirectorySection): Tenant[] {
  return tenantsBySection[section] ?? []
}
