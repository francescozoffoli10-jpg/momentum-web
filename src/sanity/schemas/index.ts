import { schemas as tenantSchemas } from './tenant'
import { siteEvent } from './siteEvent'

export const schemaTypes = [...tenantSchemas, siteEvent]
