/**
 * Las nueve guías de «Recursos y guías», en un solo lugar.
 *
 * De aquí salen las tarjetas de /blog/, el bloque «Otras guías» al pie de
 * cada artículo y el «Servicio relacionado» de cada uno. El contenido de
 * cada artículo vive al lado, en <slug>.json (extraído del WordPress sin
 * quitar una palabra ni un enlace).
 *
 * Las seis primeras tarjetas repiten al pie de la letra las del /blog/ del
 * WordPress (título, bajada, categoría, fecha, lectura, alt de la
 * foto): son texto de esa página y no se puede perder. Las tres últimas no
 * estaban en el índice viejo; sus textos salen del propio artículo (H1 y
 * bajada).
 */

export type Guia = {
  slug: string;
  /** título de la tarjeta (el H2 de la tarjeta en /blog/) */
  titulo: string;
  bajada: string;
  categoria: string;
  fecha: string;
  lectura: string;
  imagen: { archivo: string; alt: string; ancho: number; alto: number };
  servicio: Servicio;
};

export type Servicio = {
  nombre: string;
  /** ruta de la página de servicio */
  ruta: string;
  /** ancla del formulario en esa página */
  formulario: string;
  texto: string;
};

const CTI: Servicio = {
  nombre: 'Calificación Técnica Industrial',
  ruta: '/calificacion-tecnica-industrial/',
  formulario: '#formulario-cti',
  texto: 'Nos encargamos de todo el proceso ante la SEREMI de Salud, desde el informe técnico hasta la resolución, con acompañamiento en cada observación.',
};
const ECC: Servicio = {
  nombre: 'Estudio de Carga de Combustible',
  ruta: '/estudio-de-carga-de-combustible/',
  formulario: '#formulario-ecc',
  texto: 'Cálculo de la carga de fuego según NCh 1916, categoría de resistencia al fuego según la OGUC e informe firmado por profesional.',
};
const PE: Servicio = {
  nombre: 'Planes de Emergencia y Evacuación',
  ruta: '/planes-de-emergencia-y-evacuacion/',
  formulario: '#formulario-pe',
  texto: 'Plan de emergencia para tu empresa conforme al DS 44 y al DS 594: mapa de riesgos, protocolos, planos de evacuación y simulacros.',
};
const PC: Servicio = {
  nombre: 'Planes de Emergencia para Condominios',
  ruta: '/planes-de-emergencia-y-evacuacion-condominios/',
  formulario: '#formulario-pc',
  texto: 'Plan de emergencia y evacuación para edificios y condominios conforme a la Ley 21.442, listo para presentar ante Bomberos y Carabineros.',
};
const RP: Servicio = {
  nombre: 'Manejo de Residuos Peligrosos',
  ruta: '/manejo-de-residuos-peligrosos/',
  formulario: '#formulario-rp',
  texto: 'Plan de manejo de residuos peligrosos, clasificación, bodega de almacenamiento y declaración en SIDREP según el DS 148.',
};
const TR: Servicio = {
  nombre: 'Autorización de Transporte de Residuos',
  ruta: '/autorizacion-de-transporte-de-residuos/',
  formulario: '#formulario-tr',
  texto: 'Autorización sanitaria para el transporte de residuos peligrosos y no peligrosos: expediente, vehículos y tramitación ante la SEREMI de Salud.',
};
const IS: Servicio = {
  nombre: 'Informe Sanitario',
  ruta: '/informe-sanitario/',
  formulario: '#formulario-is',
  texto: 'Expediente técnico completo y tramitación ante la SEREMI de Salud para obtener tu informe sanitario favorable y la patente municipal.',
};

export const GUIAS: Guia[] = [
  {
    slug: 'autorizacion-transporte-residuos-chile',
    titulo: 'Autorización Transporte de Residuos Chile: Guía Completa 2026',
    bajada: 'Requisitos SEREMI, documentos, costos, plazos y proceso completo para obtener la autorización sanitaria de transporte de residuos peligrosos y no peligrosos.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { archivo: 'camion-excavadora-residuos', alt: 'Autorización transporte residuos Chile - Guía completa DS 148 y DS 594', ancho: 960, alto: 640 },
    servicio: TR,
  },
  {
    slug: 'manejo-de-residuos-peligrosos-chile',
    titulo: 'Manejo de Residuos Peligrosos en Chile: Guía Completa 2026',
    bajada: 'Normativa DS 148, clasificación de RESPEL, plan de manejo, almacenamiento, transporte, declaración SIDREP y obligaciones del generador.',
    categoria: 'Residuos Peligrosos',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { archivo: 'contenedores-sustancias-gaseosas', alt: 'Manejo de residuos peligrosos Chile - Guía DS 148', ancho: 1200, alto: 800 },
    servicio: RP,
  },
  {
    slug: 'plan-de-emergencia-empresa-chile',
    titulo: 'Plan de Emergencia Empresa Chile: Guía Definitiva 2026',
    bajada: 'Requisitos del DS 44, multas por incumplimiento, cómo elaborar tu plan y qué necesitas para la aprobación de SEREMI y Bomberos.',
    categoria: 'Emergencias',
    fecha: 'Feb 2026',
    lectura: '13 min lectura',
    imagen: { archivo: 'simulacro-evacuacion', alt: 'Plan de emergencia empresa Chile - Guía completa DS 44', ancho: 1200, alto: 659 },
    servicio: PE,
  },
  {
    slug: 'plan-de-emergencia-condominio-chile',
    titulo: 'Plan de Emergencia Condominio Chile: Guía Definitiva 2026',
    bajada: 'La Ley 21.442 lo exige. Conoce los requisitos, el rol del Comité de Administración, multas y cómo proteger a tu comunidad.',
    categoria: 'Condominios',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { archivo: 'edificio-sento-angamos', alt: 'Plan de emergencia condominio Chile - Ley 21.442', ancho: 1200, alto: 675 },
    servicio: PC,
  },
  {
    slug: 'calificacion-tecnica-industrial-chile',
    titulo: 'Calificación Técnica Industrial Chile: Guía Definitiva 2026',
    // «sin rechazos» del WordPress: promesa, se cambia por algo que la guía sí entrega
    bajada: 'Requisitos SEREMI, documentos necesarios, categorías de clasificación, plazos reales y cómo obtener tu CTI evitando los rechazos más comunes.',
    categoria: 'Permisos Industriales',
    fecha: 'Feb 2026',
    lectura: '13 min lectura',
    imagen: { archivo: 'bodega-centro-logistico', alt: 'Calificación técnica industrial Chile - Requisitos SEREMI', ancho: 1200, alto: 675 },
    servicio: CTI,
  },
  {
    slug: 'estudio-de-carga-combustible-chile',
    titulo: 'Estudio de Carga Combustible Chile: Guía Completa 2026',
    bajada: 'Normativa OGUC, categorías de resistencia al fuego (A, B, C, D), metodología NCh 1916 y cómo el estudio puede ahorrarte millones.',
    categoria: 'Seguridad Incendios',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { archivo: 'bodega-productos', alt: 'Estudio de carga combustible Chile - Normativa OGUC', ancho: 1200, alto: 800 },
    servicio: ECC,
  },
  // --- las tres que el índice del WordPress no listaba ----------------------
  {
    slug: 'plan-de-emergencia-ds-44-empresas-chile',
    titulo: 'Plan de Emergencia DS 44: Guía Completa para Empresas en Chile 2026',
    bajada: 'El Decreto Supremo 44 exige a toda empresa contar con un plan de emergencia actualizado. Conoce los requisitos, contenido obligatorio, simulacros y cómo evitar sanciones.',
    categoria: 'Seguridad Laboral',
    fecha: 'Mar 2026',
    lectura: '13 min lectura',
    imagen: { archivo: 'senal-salida-emergencia', alt: 'Plan de emergencia DS 44 Chile - Señal de salida de emergencia en instalación industrial', ancho: 1200, alto: 800 },
    servicio: PE,
  },
  {
    slug: 'calificacion-inofensiva-seremi-2026',
    titulo: 'Calificación Inofensiva SEREMI: Guía para Obtener tu Patente en Chile 2026',
    bajada: 'Todo lo que necesitas saber sobre la calificación de actividad inofensiva: qué es, quién la necesita, documentos requeridos, plazos y cómo obtenerla evitando los rechazos más comunes.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Mar 2026',
    lectura: '11 min lectura',
    imagen: { archivo: 'refineria-petroquimica', alt: 'Calificación inofensiva SEREMI Chile - Establecimiento comercial e industrial', ancho: 1200, alto: 799 },
    servicio: CTI,
  },
  {
    slug: 'que-es-informe-sanitario',
    titulo: 'Informe Sanitario Favorable Chile: Guía Completa 2026',
    bajada: 'Qué es el informe sanitario favorable, quién lo necesita, documentos requeridos, marco normativo, plazos, costos y cómo obtenerlo ante la SEREMI de Salud.',
    categoria: 'Permisos y Cumplimiento',
    fecha: 'Abr 2026',
    lectura: '15 min lectura',
    imagen: { archivo: 'planta-quimica', alt: 'Informe sanitario favorable Chile - Instalación industrial evaluada por la SEREMI de Salud', ancho: 1200, alto: 674 },
    servicio: IS,
  },
];

export const guia = (slug: string) => {
  const g = GUIAS.find((x) => x.slug === slug);
  if (!g) throw new Error(`No existe la guía ${slug}`);
  return g;
};
