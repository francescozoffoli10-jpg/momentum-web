import { gastronomia, regionCards } from './gastronomia'
import { comercios } from './comercios'
import type { Tenant, DirectorySection } from '@/data/types'

export { regionCards }

export const allTenants: Tenant[] = [
  ...gastronomia,
  ...comercios,
]

export const tenantsBySection: Partial<Record<DirectorySection, Tenant[]>> = {
  gastronomia,
  comercios,
}

export function getTenant(slug: string): Tenant | undefined {
  return allTenants.find((t) => t.slug === slug)
}

export function getTenantsBySection(section: DirectorySection): Tenant[] {
  return tenantsBySection[section] ?? []
}
