/**
 * Las guías de «Recursos y guías», en un solo lugar.
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
 * bajada). Las siete del final (sep-2026) son guías nuevas, escritas para
 * este sitio: no tienen original en el WordPress.
 *
 * `categoria` es el rótulo del WordPress (se conserva en los datos); lo que
 * se muestra es `tema`, uno de los TEMAS.
 */

/**
 * Los tres temas fijos del blog. Cada guía pertenece a uno; el mismo rótulo
 * se usa en la tarjeta de /blog/, en el chip de la cabecera del artículo, en
 * «Otras guías» y en las secciones (con ancla) de /blog/.
 */
export const TEMAS = [
  { id: 'permisos-seremi', nombre: 'Permisos SEREMI', bajada: 'Calificación industrial, informe sanitario, patente y qué hacer ante observaciones o sumarios.' },
  // 25-sep: «Emergencias» (4) e «Incendio» (1) se juntan: una sección de una
  // sola tarjeta dejaba un hueco de dos tercios de pantalla en /blog/
  { id: 'emergencias', nombre: 'Emergencias e incendio', bajada: 'Planes de emergencia para empresas y condominios, DS 44, fiscalización de la Dirección del Trabajo y carga de combustible según la OGUC.' },
  { id: 'residuos', nombre: 'Residuos y sustancias peligrosas', bajada: 'Manejo, transporte y declaración de residuos, y almacenamiento de sustancias peligrosas.' },
] as const;
export type Tema = (typeof TEMAS)[number]['nombre'];

export type Guia = {
  slug: string;
  /** uno de los TEMAS: tarjeta, chip del artículo y sección de /blog/ */
  tema: Tema;
  /** título de la tarjeta (el H2 de la tarjeta en /blog/) */
  titulo: string;
  bajada: string;
  categoria: string;
  fecha: string;
  lectura: string;
  /** la foto de la tarjeta y del og:image: nombre en mejoras/fotos (ver src/lib/fotos.ts) */
  imagen: { nombre: string; alt: string };
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
    tema: 'Residuos y sustancias peligrosas',
    titulo: 'Autorización Transporte de Residuos Chile: Guía Completa 2026',
    bajada: 'Requisitos SEREMI, documentos, costos, plazos y proceso completo para obtener la autorización sanitaria de transporte de residuos peligrosos y no peligrosos.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { nombre: 'camion-tolva-descarga-residuos-autorizados', alt: 'Autorización transporte residuos Chile - camión tolva descargando material en un sitio autorizado' },
    servicio: TR,
  },
  {
    slug: 'manejo-de-residuos-peligrosos-chile',
    tema: 'Residuos y sustancias peligrosas',
    titulo: 'Manejo de Residuos Peligrosos en Chile: Guía Completa 2026',
    bajada: 'Normativa DS 148, clasificación de RESPEL, plan de manejo, almacenamiento, transporte, declaración SIDREP y obligaciones del generador.',
    categoria: 'Residuos Peligrosos',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { nombre: 'tambores-azules-residuos-peligrosos-almacenamiento', alt: 'Manejo de residuos peligrosos Chile - Guía DS 148: tambores metálicos azules apilados' },
    servicio: RP,
  },
  {
    slug: 'plan-de-emergencia-empresa-chile',
    tema: 'Emergencias e incendio',
    titulo: 'Plan de emergencia para empresas: qué debe incluir y cómo se elabora',
    bajada: 'Qué debe incluir el plan, tipos de emergencia, cómo elaborarlo paso a paso y qué necesitas para la aprobación de SEREMI y Bomberos.',
    categoria: 'Emergencias',
    fecha: 'Feb 2026',
    lectura: '13 min lectura',
    imagen: { nombre: 'simulacro-incendio-extintor-plan-de-emergencia', alt: 'Plan de emergencia empresa Chile - Guía completa DS 44' },
    servicio: PE,
  },
  {
    slug: 'plan-de-emergencia-condominio-chile',
    tema: 'Emergencias e incendio',
    titulo: 'Plan de Emergencia Condominio Chile: Guía Definitiva 2026',
    bajada: 'La Ley 21.442 lo exige. Conoce los requisitos, el rol del Comité de Administración, multas y cómo proteger a tu comunidad.',
    categoria: 'Condominios',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { nombre: 'edificio-condominio-plan-de-emergencia', alt: 'Plan de emergencia condominio Chile - Ley 21.442' },
    servicio: PC,
  },
  {
    slug: 'calificacion-tecnica-industrial-chile',
    tema: 'Permisos SEREMI',
    titulo: 'Calificación Técnica Industrial Chile: Guía Definitiva 2026',
    // «sin rechazos» del WordPress: promesa, se cambia por algo que la guía sí entrega
    bajada: 'Requisitos SEREMI, documentos necesarios, categorías de clasificación, plazos reales y cómo obtener tu CTI evitando los rechazos más comunes.',
    categoria: 'Permisos Industriales',
    fecha: 'Feb 2026',
    lectura: '13 min lectura',
    imagen: { nombre: 'bodega-centro-logistico-carga-combustible', alt: 'Calificación técnica industrial Chile - Requisitos SEREMI' },
    servicio: CTI,
  },
  {
    slug: 'estudio-de-carga-combustible-chile',
    tema: 'Emergencias e incendio',
    titulo: 'Estudio de Carga Combustible Chile: Guía Completa 2026',
    bajada: 'Normativa OGUC, categorías de resistencia al fuego (A, B, C, D), metodología NCh 1916 y cómo el estudio puede ahorrarte millones.',
    categoria: 'Seguridad Incendios',
    fecha: 'Feb 2026',
    lectura: '12 min lectura',
    imagen: { nombre: 'bodega-productos-estudio-carga-combustible', alt: 'Estudio de carga combustible Chile - Normativa OGUC' },
    servicio: ECC,
  },
  // --- las tres que el índice del WordPress no listaba ----------------------
  {
    slug: 'plan-de-emergencia-ds-44-empresas-chile',
    tema: 'Emergencias e incendio',
    titulo: 'DS 44: obligaciones, simulacro anual y fiscalización',
    bajada: 'Qué obliga el Decreto Supremo 44 a toda empresa: requisitos del plan de emergencia, simulacro anual, fiscalización de la Dirección del Trabajo y cómo evitar sanciones.',
    categoria: 'Seguridad Laboral',
    fecha: 'Mar 2026',
    lectura: '13 min lectura',
    imagen: { nombre: 'senal-salida-emergencia-evacuacion', alt: 'Plan de emergencia DS 44 Chile - Señal de salida de emergencia en instalación industrial' },
    servicio: PE,
  },
  {
    slug: 'calificacion-inofensiva-seremi',
    tema: 'Permisos SEREMI',
    titulo: 'Calificación Inofensiva SEREMI: Guía para Obtener tu Patente en Chile 2026',
    bajada: 'Todo lo que necesitas saber sobre la calificación de actividad inofensiva: qué es, quién la necesita, documentos requeridos, plazos y cómo obtenerla evitando los rechazos más comunes.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Mar 2026',
    lectura: '11 min lectura',
    imagen: { nombre: 'bodega-calificacion-tecnica-industrial', alt: 'Calificación inofensiva SEREMI Chile - Bodega con portones y patio de maniobras' },
    servicio: CTI,
  },
  {
    slug: 'que-es-informe-sanitario',
    tema: 'Permisos SEREMI',
    titulo: 'Informe Sanitario Favorable Chile: Guía Completa 2026',
    bajada: 'Qué es el informe sanitario favorable, quién lo necesita, documentos requeridos, marco normativo, plazos, costos y cómo obtenerlo ante la SEREMI de Salud.',
    categoria: 'Permisos y Cumplimiento',
    fecha: 'Abr 2026',
    lectura: '15 min lectura',
    imagen: { nombre: 'manipulacion-alimentos-informe-sanitario', alt: 'Informe sanitario favorable Chile - Manipulación de alimentos en una instalación evaluada por la SEREMI de Salud' },
    servicio: IS,
  },
  // --- las guías nuevas (sep-2026), sin original en el WordPress --------------
  {
    slug: 'patente-definitiva-permisos-seremi',
    tema: 'Permisos SEREMI',
    titulo: 'Patente definitiva: qué permisos de la SEREMI necesitas',
    bajada: 'De la patente provisoria a la definitiva: qué exige la municipalidad según tu rubro, cuándo entra la SEREMI de Salud y en qué orden hacer los trámites.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'firma-solicitud-seremi-en-linea', alt: 'Patente definitiva - persona firma los antecedentes de su solicitud ante la SEREMI de Salud' },
    servicio: CTI,
  },
  {
    slug: 'checklist-ds-44-fiscalizacion',
    tema: 'Emergencias e incendio',
    titulo: 'Checklist DS 44: qué revisa la Dirección del Trabajo en una fiscalización',
    bajada: 'Lista práctica basada en el Formulario Único de Fiscalización del DS 44: matriz de riesgos, programa preventivo, plan de emergencia, comité y multas.',
    categoria: 'Seguridad Laboral',
    fecha: 'Sep 2026',
    lectura: '10 min lectura',
    imagen: { nombre: 'inspeccion-planta-fiscalizacion-seremi', alt: 'Checklist DS 44 - técnico con carpeta revisa los equipos de una planta en una fiscalización' },
    servicio: PE,
  },
  {
    slug: 'autorizacion-transporte-residuos-no-peligrosos',
    tema: 'Residuos y sustancias peligrosas',
    titulo: 'Autorización para transportar residuos no peligrosos: paso a paso',
    bajada: 'Quién la pide, qué antecedentes revisa la SEREMI, cómo se completa en SEREMI en Línea y en qué se diferencia de la de residuos peligrosos.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'camion-tolva-escombros-residuos-no-peligrosos', alt: 'Autorización de transporte de residuos no peligrosos - camión tolva cargado con escombros en una obra' },
    servicio: TR,
  },
  {
    slug: 'declaracion-residuos-sidrep-sinader',
    tema: 'Residuos y sustancias peligrosas',
    titulo: 'Declaración de residuos en SIDREP y SINADER: quién declara y cómo',
    bajada: 'SIDREP para residuos peligrosos y SINADER para no peligrosos: obligados, plazos, acceso por la Ventanilla Única del RETC y errores comunes.',
    categoria: 'Residuos Peligrosos',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'tambores-bodega-residuos-peligrosos', alt: 'Declaración de residuos en SIDREP y SINADER - tambores de residuos peligrosos etiquetados con su número UN y sus pictogramas de peligro' },
    servicio: RP,
  },
  {
    slug: 'sumario-sanitario-seremi',
    tema: 'Permisos SEREMI',
    titulo: 'Sumario sanitario de la SEREMI: qué hacer si te llega un acta o una multa',
    bajada: 'Cómo avanza el sumario sanitario desde el acta hasta la sentencia, qué sanciones puede aplicar la SEREMI, qué poner en tus descargos y qué plazos tienes.',
    categoria: 'Permisos y Cumplimiento',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'preparacion-descargos-sumario-sanitario', alt: 'Sumario sanitario SEREMI - profesional ordena los documentos para preparar los descargos' },
    servicio: IS,
  },
  {
    slug: 'rechazo-observaciones-seremi',
    tema: 'Permisos SEREMI',
    titulo: 'La SEREMI rechazó u observó tu solicitud: cómo responder',
    bajada: 'Observación no es rechazo: cómo responder punto por punto, qué recursos tienes, en qué plazos y qué pasa si la SEREMI no responde a tiempo.',
    categoria: 'Permisos y Autorizaciones',
    fecha: 'Sep 2026',
    lectura: '8 min lectura',
    imagen: { nombre: 'revision-expediente-observaciones-seremi', alt: 'Rechazo u observaciones de la SEREMI - dos personas revisan el expediente para responder' },
    servicio: CTI,
  },
  {
    slug: 'plan-manejo-sustancias-peligrosas-ds-43',
    tema: 'Residuos y sustancias peligrosas',
    titulo: 'Plan de manejo de sustancias peligrosas (DS 43): cuándo lo exigen y qué incluye',
    bajada: 'Umbrales de autorización sanitaria, tipos de bodega según la cantidad, documentos del plan de manejo y declaración semestral según el DS 43.',
    categoria: 'Residuos Peligrosos',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'tambores-plasticos-sustancias-peligrosas-ds-43', alt: 'Sustancias peligrosas DS 43 - tambores plásticos con tapa naranja almacenados' },
    servicio: RP,
  },
  // --- el clúster del estudio de carga de combustible (29-sep-2026): tres
  // guías que cuelgan de la página de servicio ECC y complementan a
  // estudio-de-carga-combustible-chile sin repetir su tema ------------------
  {
    slug: 'calculo-carga-de-fuego-nch-1916',
    tema: 'Emergencias e incendio',
    titulo: 'Cómo se calcula la carga de fuego según la NCh 1916 (con ejemplo)',
    bajada: 'Fórmula de la NCh 1916, calores de combustión de referencia, densidad media y puntual máxima, y un ejemplo numérico de una bodega de 1.000 m² clasificada según la OGUC.',
    categoria: 'Seguridad Incendios',
    fecha: 'Sep 2026',
    lectura: '10 min lectura',
    imagen: { nombre: 'bodega-racks-mercaderia-carga-combustible', alt: 'Cálculo de carga de fuego NCh 1916 - racks de una bodega cargados con mercadería en pallets' },
    servicio: ECC,
  },
  {
    slug: 'cuando-piden-estudio-de-carga-de-combustible',
    tema: 'Emergencias e incendio',
    titulo: 'Cuándo te piden el estudio de carga de combustible: DOM, SEREMI, patente y seguros',
    bajada: 'Quién exige el estudio y en qué trámite: permiso de edificación y recepción en la DOM, calificación técnica e informe sanitario de la SEREMI, patente, bodegas con sustancias peligrosas y pólizas de incendio.',
    categoria: 'Seguridad Incendios',
    fecha: 'Sep 2026',
    lectura: '9 min lectura',
    imagen: { nombre: 'bodega-andenes-carga-permisos-seremi', alt: 'Cuándo piden el estudio de carga de combustible - andenes de carga de una bodega con camiones' },
    servicio: ECC,
  },
  {
    slug: 'resistencia-al-fuego-oguc',
    tema: 'Emergencias e incendio',
    titulo: 'Resistencia al fuego según la OGUC: tipos a, b, c y d y la tabla de exigencias',
    bajada: 'Qué significan F-15 a F-180, la tabla del art. 4.3.3 por elemento, cómo se determina el tipo con las tablas del art. 4.3.4 y qué implica para una bodega o una planta industrial.',
    categoria: 'Seguridad Incendios',
    fecha: 'Sep 2026',
    lectura: '11 min lectura',
    imagen: { nombre: 'bodega-estanterias-estudio-carga-combustible', alt: 'Resistencia al fuego OGUC - estanterías altas de una bodega cuya estructura debe cumplir la resistencia al fuego exigida' },
    servicio: ECC,
  },
];

/**
 * Las ocho guías del menú «Recursos y guías» (escritorio y móvil) y de la
 * columna del mismo nombre en el pie (Footer2). Las tres leen esta lista, así
 * que el menú y el pie no pueden diferir; después de las ocho va siempre
 * «Ver todas las guías» → /blog/.
 *
 * 29-sep: una guía por servicio (y dos de la CTI, pedido de Carlos): CTI,
 * calificación inofensiva, carga de combustible, plan de emergencia DS 44,
 * condominios, residuos peligrosos, transporte de residuos e informe
 * sanitario. Patente definitiva y sumario sanitario salen del menú (siguen
 * en /blog/). Ocho entradas = 2 columnas × 4 filas en el desplegable.
 */
export const GUIAS_MENU: { slug: string; rotulo: string; descripcion: string }[] = [
  { slug: 'calificacion-tecnica-industrial-chile', rotulo: 'Calificación Técnica Industrial en Chile', descripcion: 'Guía completa del trámite: quién lo necesita, plazos y documentos.' },
  { slug: 'calificacion-inofensiva-seremi', rotulo: 'Calificación Inofensiva SEREMI', descripcion: 'Cómo obtener el certificado de actividad inofensiva y tu patente.' },
  { slug: 'estudio-de-carga-combustible-chile', rotulo: 'Estudio de Carga de Combustible', descripcion: 'Qué es, cuándo lo exige la OGUC y cómo se calcula la carga de fuego.' },
  { slug: 'plan-de-emergencia-ds-44-empresas-chile', rotulo: 'Plan de Emergencia DS 44', descripcion: 'Qué exige el decreto, contenido obligatorio, simulacros y sanciones.' },
  { slug: 'plan-de-emergencia-condominio-chile', rotulo: 'Plan de Emergencia en Condominios', descripcion: 'Lo que la Ley 21.442 pide a la administración de tu comunidad.' },
  { slug: 'manejo-de-residuos-peligrosos-chile', rotulo: 'Manejo de Residuos Peligrosos', descripcion: 'DS 148: clasificación, plan de manejo, bodega y declaración SIDREP.' },
  { slug: 'autorizacion-transporte-residuos-chile', rotulo: 'Autorización de Transporte de Residuos', descripcion: 'Peligrosos y no peligrosos: qué resolución necesitas y cómo se obtiene.' },
  { slug: 'que-es-informe-sanitario', rotulo: '¿Qué es el Informe Sanitario?', descripcion: 'Quién lo necesita, documentos, plazos y costos ante la SEREMI.' },
];
export const VER_TODAS_LAS_GUIAS = { rotulo: 'Ver todas las guías', ruta: '/blog/' };

export const guia = (slug: string) => {
  const g = GUIAS.find((x) => x.slug === slug);
  if (!g) throw new Error(`No existe la guía ${slug}`);
  return g;
};
