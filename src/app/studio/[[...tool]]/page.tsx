// @ts-nocheck
/**
 * Sanity Studio — embedded at /studio
 *
 * Access: http://localhost:3000/studio  (dev)
 *         https://your-domain.com/studio (prod)
 */
import dynamic from 'next/dynamic'
import config from '@/sanity/config'

export { metadata, viewport } from 'next-sanity/studio'

// Load studio only on the client — NextStudio uses React.createContext which
// cannot run during SSR (causes build failure with Turbopack)
const NextStudio = dynamic(
    () => import('next-sanity/studio').then(mod => mod.NextStudio),
  { ssr: false }
  )

export default function StudioPage() {
    return <NextStudio config={config} />
}
