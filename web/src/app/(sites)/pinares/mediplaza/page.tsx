import { redirect } from 'next/navigation'

// Renamed to Torre Médica — redirect permanently
export default function MediplazaRedirect() {
  redirect('/pinares/torre-medica')
}
