import { redirect } from 'next/navigation'

// Escazú does not have events — redirect to homepage
export default function Page() {
  redirect('/escazu')
}
