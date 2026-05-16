export interface Specialty {
  name: string
  category: string
}

// 47 specialties — sourced from torremedicamomentum.com
export const specialties: Specialty[] = [
  // Cirugía
  { name: 'Cirugía Estética',                      category: 'Cirugía' },
  { name: 'Cirugía General',                        category: 'Cirugía' },
  { name: 'Cirugía Oral',                             category: 'Cirugía' },
  { name: 'Maxilofacial',                            category: 'Cirugía' },
  { name: 'Cirugía Pediátrica',                     category: 'Cirugía' },
  { name: 'Cirugía Plástica',                       category: 'Cirugía' },
  { name: 'Coloproctología',                        category: 'Cirugía' },
  { name: 'Neurocirugía',                           category: 'Cirugía' },

  // Medicina General & Interna
  { name: 'Medicina General',                       category: 'Medicina' },
  { name: 'Medicina Interna',                       category: 'Medicina' },
  { name: 'Medicina del Dolor',                     category: 'Medicina' },
  { name: 'Medicina Estética',                      category: 'Medicina' },
  { name: 'Medicina Nutricional y Regenerativa',    category: 'Medicina' },
  { name: 'Geriatría y Gerontología',               category: 'Medicina' },

  // Especialidades
  { name: 'Audiología',                             category: 'Especialidades' },
  { name: 'Cardiología',                            category: 'Especialidades' },
  { name: 'Dermatología',                           category: 'Especialidades' },
  { name: 'Endocrinología',                         category: 'Especialidades' },
  { name: 'Gastroenterología',                      category: 'Especialidades' },
  { name: 'Ginecología y Obstetricia',              category: 'Especialidades' },
  { name: 'Neumología',                             category: 'Especialidades' },
  { name: 'Neurología',                             category: 'Especialidades' },
  { name: 'Oftalmología',                           category: 'Especialidades' },
  { name: 'Otorrinolaringología',                   category: 'Especialidades' },
  { name: 'Reumatología',                           category: 'Especialidades' },
  { name: 'Urología',                               category: 'Especialidades' },
  { name: 'Vascular Periférico',                    category: 'Especialidades' },

  // Pediatría & Infantil
  { name: 'Pediatría y Neonatología',               category: 'Pediatría' },
  { name: 'Ortopedia Pediátrica',                   category: 'Pediatría' },
  { name: 'Psiquiatría Infantil',                   category: 'Pediatría' },
  { name: 'Estimulación Temprana',                  category: 'Pediatría' },

  // Ortopedia
  { name: 'Ortopedia y Traumatología',              category: 'Ortopedia' },

  // Odontología
  { name: 'Odontología General',                    category: 'Odontología' },
  { name: 'Odontopediatría',                        category: 'Odontología' },
  { name: 'Ortodoncia',                             category: 'Odontología' },
  { name: 'Periodoncia',                            category: 'Odontología' },
  { name: 'Prostodoncia',                           category: 'Odontología' },

  // Psicología & Salud Mental
  { name: 'Psicología',                             category: 'Salud Mental' },
  { name: 'Psicología Clínica',                     category: 'Salud Mental' },
  { name: 'Psiquiatría',                            category: 'Salud Mental' },
  { name: 'Neuropsiquiatría',                       category: 'Salud Mental' },
  { name: 'Psicooncología',                         category: 'Salud Mental' },
  { name: 'Psicopedagogía',                         category: 'Salud Mental' },

  // Rehabilitación & Bienestar
  { name: 'Fisioterapia',                           category: 'Rehabilitación' },
  { name: 'Terapia de Lenguaje, Habla y Voz',       category: 'Rehabilitación' },
  { name: 'Terapia Ocupacional',                    category: 'Rehabilitación' },
  { name: 'Nutrición',                              category: 'Rehabilitación' },

  // Diagnóstico
  { name: 'Radiología / Imágenes Médicas',          category: 'Diagnóstico' },
]

export const specialtyCategories = [
  'Cirugía',
  'Medicina',
  'Especialidades',
  'Pediatría',
  'Ortopedia',
  'Odontología',
  'Salud Mental',
  'Rehabilitación',
  'Diagnóstico',
]
