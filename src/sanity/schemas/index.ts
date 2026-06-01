import { schemas as tenantSchemas } from './tenant'
import { siteEvent } from './siteEvent'
import { teatroShow } from './teatroShow'
import { teatroConfig } from './teatroConfig'

export const schemaTypes = [...tenantSchemas, siteEvent, teatroShow, teatroConfig]
