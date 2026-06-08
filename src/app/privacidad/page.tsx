import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Cómo Momentum Costa Rica recolecta, utiliza y protege tus datos personales, en cumplimiento de la Ley N.° 8968 de Costa Rica.',
}

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updated="8 de junio de 2026"
      intro="En Momentum valoramos tu confianza. Esta política explica de forma clara qué datos personales recolectamos, con qué finalidad los utilizamos y cuáles son tus derechos sobre ellos."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos personales recolectados a través de este sitio es
        <strong> Momentum Costa Rica</strong>, con domicilio en San José, Costa Rica. Para cualquier consulta relacionada
        con tus datos personales podés escribirnos a <a href="mailto:mercadeo@momentum.co.cr">mercadeo@momentum.co.cr</a>.
      </p>

      <h2>2. Marco legal</h2>
      <p>
        Tratamos tus datos personales conforme a la <strong>Ley N.° 8968, Protección de la Persona frente al Tratamiento
        de sus Datos Personales</strong>, su reglamento, y las directrices de la Agencia de Protección de Datos de los
        Habitantes (PRODHAB) de Costa Rica.
      </p>

      <h2>3. Qué datos recolectamos</h2>
      <p>Dependiendo de cómo interactúes con el sitio, podemos recolectar:</p>
      <ul>
        <li><strong>Datos de contacto</strong> que nos brindás voluntariamente a través de formularios: nombre, correo electrónico, número de teléfono y el contenido de tu mensaje.</li>
        <li><strong>Datos de consultas de alquiler o arrendamiento</strong>: tipo de espacio de interés, área aproximada y detalles del requerimiento.</li>
        <li><strong>Datos de navegación</strong>: dirección IP, tipo de dispositivo y navegador, páginas visitadas y tiempo de permanencia, recolectados mediante cookies y herramientas de analítica.</li>
      </ul>
      <p>No recolectamos datos sensibles ni solicitamos información que no sea necesaria para la finalidad indicada.</p>

      <h2>4. Para qué usamos tus datos</h2>
      <ul>
        <li>Atender tus consultas, solicitudes de información y mensajes de contacto.</li>
        <li>Gestionar solicitudes de alquiler, arrendamiento o información comercial.</li>
        <li>Enviarte comunicaciones sobre eventos, novedades y promociones del ecosistema Momentum, siempre que lo hayás autorizado.</li>
        <li>Mejorar el funcionamiento, la seguridad y la experiencia de uso del sitio.</li>
        <li>Cumplir con obligaciones legales aplicables.</li>
      </ul>

      <h2>5. Base de legitimación</h2>
      <p>
        El tratamiento de tus datos se fundamenta en el <strong>consentimiento</strong> que otorgás al completar nuestros
        formularios o al aceptar el uso de cookies, así como en el interés legítimo de mantener y mejorar nuestros servicios.
        Podés retirar tu consentimiento en cualquier momento.
      </p>

      <h2>6. Con quién compartimos tus datos</h2>
      <p>
        No vendemos ni alquilamos tus datos personales. Podemos compartirlos únicamente con proveedores que nos prestan
        servicios tecnológicos y operativos (por ejemplo, alojamiento web, gestión de formularios y herramientas de
        analítica), quienes los tratan bajo nuestras instrucciones y con las debidas garantías de confidencialidad y
        seguridad. Algunos de estos proveedores pueden procesar datos fuera de Costa Rica, siempre con niveles de
        protección adecuados.
      </p>

      <h2>7. Conservación de los datos</h2>
      <p>
        Conservamos tus datos personales únicamente durante el tiempo necesario para cumplir con la finalidad para la
        que fueron recolectados, y posteriormente durante los plazos exigidos por la legislación aplicable. Una vez
        cumplidos esos plazos, los datos se eliminan o anonimizan de forma segura.
      </p>

      <h2>8. Tus derechos</h2>
      <p>De acuerdo con la Ley N.° 8968, en cualquier momento podés ejercer tus derechos de:</p>
      <ul>
        <li><strong>Acceso</strong> a los datos personales que tratamos sobre vos.</li>
        <li><strong>Rectificación</strong> de datos inexactos o incompletos.</li>
        <li><strong>Eliminación</strong> de tus datos cuando ya no sean necesarios.</li>
        <li><strong>Revocación del consentimiento</strong> otorgado para su tratamiento.</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escribinos a <a href="mailto:mercadeo@momentum.co.cr">mercadeo@momentum.co.cr</a>.
        Atenderemos tu solicitud dentro de los plazos establecidos por la ley.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos personales contra el acceso no
        autorizado, la pérdida, la alteración o la divulgación indebida.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Este sitio utiliza cookies y tecnologías similares. Para conocer en detalle cómo las usamos y cómo podés
        gestionarlas, consultá nuestra <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad para reflejar cambios legales u operativos. Publicaremos cualquier
        modificación en esta misma página, indicando la fecha de la última actualización.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Si tenés preguntas sobre esta política o sobre el tratamiento de tus datos, escribinos a
        <a href="mailto:mercadeo@momentum.co.cr"> mercadeo@momentum.co.cr</a>.
      </p>
    </LegalPage>
  )
}
