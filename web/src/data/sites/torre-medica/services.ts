export interface MedicalService {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  huliUrl: string
  photo?: string
}

// 7 anchor medical services at Torre Médica Momentum Pinares
// Huli URLs: directorio.torremedicamomentum.com (white-label Huli directory)
export const medicalServices: MedicalService[] = [
  {
    slug: 'imagen-test',
    name: 'Imagen Test',
    category: 'Radiología e Imágenes Médicas',
    tagline: 'Diagnóstico por imagen de alta precisión',
    description: 'Centro especializado en radiología e imágenes médicas. Ultrasonidos, radiografías y estudios de diagnóstico con tecnología avanzada para una detección temprana y precisa.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/clinic/imagen-test',
    photo: 'https://images.unsplash.com/photo-1516069677018-378515003435?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'larisa-paez-wellness',
    name: 'Larisa Páez Wellness Center',
    category: 'Centro de Nutrición y Bienestar',
    tagline: 'Nutrición, hábitos y vida saludable',
    description: 'Centro de bienestar integral dirigido por Larisa Páez. Nutrición, hábitos saludables y programas personalizados de wellness para mejorar tu calidad de vida desde adentro hacia afuera.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/clinic/centro-de-nutricion-larisa-paez-curridabat',
    photo: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'labin',
    name: 'Labin',
    category: 'Laboratorio Clínico',
    tagline: 'Resultados confiables y oportunos',
    description: 'Laboratorio clínico con amplia gama de análisis y exámenes. Resultados rápidos, precisos y con los más altos estándares de calidad para el diagnóstico médico.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/clinic/laboratorio-labin',
    photo: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'edgar-jimenez-solis',
    name: 'Dr. Edgar Jiménez Solís',
    category: 'Neurocirugía · Neuro-Oncología · Columna',
    tagline: 'Especialista en neurocirugía y columna vertebral',
    description: 'El Dr. Edgar Jiménez Solís es especialista en Neurocirugía, Neuro-Oncología y Cirugía de Columna Vertebral. Atención de alta complejidad con técnicas mínimamente invasivas de vanguardia.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/doctor/edgar-jimenez-masis',
    photo: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'ifisiotx',
    name: 'iFisioTx',
    category: 'Fisioterapia y Rehabilitación',
    tagline: 'Centro avanzado de fisioterapia y rehabilitación',
    description: 'Centro avanzado de fisioterapia y rehabilitación con técnicas modernas de última generación. Recuperación musculoesquelética, rehabilitación post-operatoria y programas de rendimiento deportivo.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/clinic/ifisiotx-centro-avanzado-de-fisioterapia-y-rehabilitacion_d8d5c3',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'm-surgical-center',
    name: 'M Surgical Center',
    category: 'Centro Quirúrgico',
    tagline: 'Quirófano de alta complejidad ambulatorio',
    description: 'Centro quirúrgico ambulatorio de alta complejidad. Sala de operaciones equipada con tecnología de primer nivel para cirugías programadas con los más altos estándares de seguridad y asepsia.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/search/health-service/m-surgical-center',
    photo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=500&fit=crop&auto=format&q=80',
  },
  {
    slug: 'ka-craneofacial',
    name: 'Ka Diagnóstico Craneofacial',
    category: 'Radiología Craneofacial',
    tagline: 'Diagnóstico radiológico craneofacial especializado',
    description: 'Centro especializado en diagnóstico radiológico craneofacial con tecnología de punta. Tomografías, radiografías panorámicas y estudios de imágenes para odontología y maxilofacial.',
    huliUrl: 'https://directorio.torremedicamomentum.com/es/clinic/ka-diagnostico-craneofacial',
    photo: 'https://images.unsplash.com/photo-1516069677018-378515003435?w=800&h=500&fit=crop&auto=format&q=80',
  },
]
