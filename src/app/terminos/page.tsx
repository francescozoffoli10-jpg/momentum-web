import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de los sitios web del ecosistema Momentum Costa Rica.',
}

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      updated="8 de junio de 2026"
      intro="Estos términos regulan el uso de los sitios web del ecosistema Momentum. Al navegar y utilizar nuestros sitios, aceptás las condiciones descritas a continuación."
    >
      <h2>1. Aceptación</h2>
      <p>
        El acceso y uso de los sitios web del ecosistema Momentum (incluyendo Momentum Lindora, Momentum Escazú,
        Momentum Pinares y Torre Médica Momentum) implica la aceptación plena de estos Términos y Condiciones. Si no
        estás de acuerdo con ellos, te solicitamos no utilizar el sitio.
      </p>

      <h2>2. Objeto del sitio</h2>
      <p>
        Nuestros sitios tienen una finalidad informativa: presentar los destinos, locales comerciales, servicios,
        eventos y experiencias que conforman el ecosistema Momentum, así como facilitar el contacto con nosotros. La
        información se ofrece de buena fe y con el mayor cuidado posible.
      </p>

      <h2>3. Información de locales y terceros</h2>
      <p>
        El directorio incluye locales comerciales, restaurantes, servicios de bienestar, comercios y especialistas
        médicos independientes. Cada uno de ellos es responsable de sus propios productos, servicios, precios, horarios
        y disponibilidad. Momentum no garantiza ni se responsabiliza por la prestación, calidad o condiciones de los
        servicios ofrecidos por terceros dentro de sus instalaciones.
      </p>

      <h2>4. Servicios médicos</h2>
      <p>
        La información relacionada con especialistas y servicios médicos tiene carácter referencial y no sustituye una
        consulta profesional. La relación médico-paciente, los diagnósticos y los tratamientos son responsabilidad
        exclusiva de cada profesional o centro médico.
      </p>

      <h2>5. Propiedad intelectual</h2>
      <p>
        Las marcas, logotipos, textos, imágenes, diseños y demás contenidos de los sitios son propiedad de Momentum
        Costa Rica o de sus respectivos titulares, y están protegidos por la legislación aplicable. Queda prohibida su
        reproducción, distribución o modificación total o parcial sin autorización previa por escrito.
      </p>

      <h2>6. Uso permitido</h2>
      <p>Al utilizar el sitio, te comprometés a:</p>
      <ul>
        <li>Hacer un uso lícito y conforme a estos términos y a la legislación vigente.</li>
        <li>No realizar acciones que puedan dañar, sobrecargar o afectar el funcionamiento del sitio.</li>
        <li>No utilizar el contenido con fines comerciales no autorizados.</li>
        <li>Proporcionar información veraz al completar nuestros formularios.</li>
      </ul>

      <h2>7. Enlaces externos</h2>
      <p>
        El sitio puede contener enlaces a páginas de terceros (por ejemplo, redes sociales, plataformas de directorio
        médico o sitios de locales comerciales). No tenemos control sobre dichos sitios y no asumimos responsabilidad
        por su contenido ni por sus políticas de privacidad.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        Procuramos mantener la información del sitio actualizada y disponible, pero no garantizamos que esté libre de
        errores o interrupciones. En la medida permitida por la ley, Momentum no será responsable por daños derivados
        del uso o la imposibilidad de uso del sitio, ni por la exactitud de la información de terceros.
      </p>

      <h2>9. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales que nos brindás se rige por nuestra
        <a href="/privacidad"> Política de Privacidad</a>, en cumplimiento de la Ley N.° 8968 de Costa Rica.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Podemos modificar estos Términos y Condiciones en cualquier momento. Las versiones actualizadas se publicarán en
        esta misma página, indicando la fecha de la última actualización. El uso continuado del sitio implica la
        aceptación de los cambios.
      </p>

      <h2>11. Legislación y jurisdicción</h2>
      <p>
        Estos términos se rigen por la legislación de la República de Costa Rica. Cualquier controversia se someterá a
        los tribunales competentes del país.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para consultas relacionadas con estos términos, escribinos a
        <a href="mailto:mercadeo@momentum.co.cr"> mercadeo@momentum.co.cr</a>.
      </p>
    </LegalPage>
  )
}
