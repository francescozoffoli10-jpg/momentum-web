import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Qué cookies utiliza el sitio de Momentum Costa Rica y cómo podés gestionarlas.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      updated="8 de junio de 2026"
      intro="Las cookies nos ayudan a que el sitio funcione correctamente y a entender cómo se utiliza. Acá te explicamos cuáles usamos y cómo podés controlarlas."
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo cuando lo visitás. Sirven
        para recordar preferencias, mantener el funcionamiento del sitio y obtener información estadística sobre su uso.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>
      <h3>Cookies necesarias</h3>
      <p>
        Son imprescindibles para el funcionamiento del sitio y para recordar tus preferencias, como tu decisión sobre el
        uso de cookies. No requieren tu consentimiento y no pueden desactivarse desde el sitio.
      </p>
      <h3>Cookies de analítica</h3>
      <p>
        Nos permiten entender cómo interactuás con el sitio —por ejemplo, qué páginas visitás y cuánto tiempo permanecés—
        para mejorar la experiencia. Utilizamos herramientas como <strong>Google Analytics</strong>. Estas cookies solo
        se activan si las aceptás.
      </p>

      <h2>3. Tu consentimiento</h2>
      <p>
        Al ingresar al sitio te mostramos un aviso en la parte inferior de la pantalla. Si seleccionás
        <strong> Aceptar</strong>, activamos las cookies de analítica. Si seleccionás <strong>Rechazar</strong>, solo se
        utilizarán las cookies necesarias para el funcionamiento del sitio. Tu elección se guarda en tu dispositivo para
        no volver a preguntarte en cada visita.
      </p>

      <h2>4. Cómo gestionar o eliminar las cookies</h2>
      <p>
        Podés cambiar tu decisión en cualquier momento borrando las cookies y los datos de navegación guardados por este
        sitio desde la configuración de tu navegador; al volver a ingresar, te mostraremos nuevamente el aviso. Además,
        la mayoría de los navegadores te permiten bloquear o eliminar cookies desde su configuración:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad.</li>
        <li><strong>Firefox:</strong> Ajustes → Privacidad y seguridad → Cookies y datos del sitio.</li>
        <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio.</li>
      </ul>
      <p>
        Tené en cuenta que desactivar ciertas cookies puede afectar el funcionamiento de algunas secciones del sitio.
      </p>

      <h2>5. Más información</h2>
      <p>
        El tratamiento de los datos obtenidos mediante cookies se rige por nuestra
        <a href="/privacidad"> Política de Privacidad</a>. Si tenés dudas, escribinos a
        <a href="mailto:mercadeo@momentum.co.cr"> mercadeo@momentum.co.cr</a>.
      </p>
    </LegalPage>
  )
}
