import { schemas as tenantSchemas } from './tenant'
import { siteEvent } from './siteEvent'
import { teatroShow } from './teatroShow'

export const schemaTypes = [...tenantSchemas, siteEvent, teatroShow]
