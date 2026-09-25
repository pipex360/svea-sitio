/**
 * /cotiza-autorizacion-transporte-residuos/ · landing de Google Ads NUEVA.
 *
 * No existe en el WordPress: no hay original contra el cual cruzar el texto.
 * El contenido sale de la página de servicio
 * (originales-wp/servicios/autorizacion-de-transporte-de-residuos.html y sus
 * componentes tr-*.tsx: qué es, quién lo necesita, tipos de residuos, qué
 * incluye, pasos y las seis preguntas frecuentes, éstas con su texto exacto),
 * llevado al formato de landing y sin promesas («garantizado», «100%»).
 *
 * El formulario sigue la estructura de las otras cinco landings (LISTA ROJA):
 * los mismos ocultos, el asunto con id dynamic-subject-ltr y la palabra
 * «Transporte» en el prefijo, que es la que n8n usa para clasificar el lead.
 * El H1 es el de paginas.json.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  ruta: '/cotiza-autorizacion-transporte-residuos/',
  urgencia:
    '<strong>¿Transportas residuos sin autorización?</strong> — La SEREMI puede aplicar multas, sumarios sanitarios y paralizar tu operación. Regulariza hoy.',
  badge: 'Cotización en menos de 24 horas',
  h1: 'Autorización de Transporte de Residuos<br><em>Peligrosos y No Peligrosos</em>',
  bajada:
    '<strong>Autorización sanitaria SEREMI para transporte de residuos</strong>: clasificamos tus residuos, armamos el expediente con el plan de contingencias y la memoria técnica de cada camión o vehículo, lo ingresamos en SEREMI en Línea y hacemos el seguimiento ante la SEREMI de Salud hasta la resolución sanitaria.',
  pills: [
    'Residuos peligrosos (RESPEL) y no peligrosos',
    'Correcciones sin costo hasta la resolución',
    'Expediente listo en 3-5 días hábiles',
    'Por camión o vehículo, con su memoria técnica',
  ],
  cifras: [
    { valor: '250+', texto: 'Empresas atendidas' },
    { valor: '3-5', texto: 'Días hábiles expediente' },
    { valor: '24h', texto: 'Cotización' },
  ],
  formulario: {
    titulo: 'Cotiza tu Autorización de Transporte',
    bajada: 'Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>',
    id: 'form-landing-tr',
    ocultos: [
      { name: 'access_key', value: '076a0f9a-9911-48f6-880e-dd9d44c3063b' },
      { name: 'subject', value: '[LANDING ADS] Cotización Transporte Residuos - SVEA', id: 'dynamic-subject-ltr' },
      { name: 'from_name', value: 'SVEA Landing Ads' },
      { name: 'redirect', value: 'https://sveaconsultores.cl/gracias/' },
      { name: 'Servicio', value: 'Autorización de Transporte de Residuos Peligrosos y No Peligrosos' },
      { name: 'Fuente', value: 'Google Ads Landing' },
      { name: 'gclid', value: '', id: 'field-gclid' },
      { name: 'utm_source', value: '', id: 'field-utm_source' },
      { name: 'utm_medium', value: '', id: 'field-utm_medium' },
      { name: 'utm_campaign', value: '', id: 'field-utm_campaign' },
      { name: 'utm_content', value: '', id: 'field-utm_content' },
      { name: 'utm_term', value: '', id: 'field-utm_term' },
    ],
    campos: [
      { control: 'input', label: 'Nombre completo *', name: 'Nombre', type: 'text', placeholder: 'Ej: María González', required: true },
      { control: 'input', label: 'Teléfono *', name: 'Teléfono', type: 'tel', placeholder: '+569 1234 5678', required: true, mitad: true },
      { control: 'input', label: 'Email *', name: 'Email', type: 'email', placeholder: 'correo@empresa.cl', required: true, mitad: true },
      { control: 'input', label: 'Empresa *', name: 'Empresa', type: 'text', placeholder: 'Nombre de tu empresa', required: true },
      {
        control: 'select',
        label: 'Tipo de residuo',
        name: 'Tipo de Residuo',
        opciones: [
          { value: '', texto: 'Selecciona...', placeholder: true },
          { value: 'Residuos peligrosos (RESPEL)', texto: 'Residuos peligrosos (RESPEL)' },
          { value: 'Residuos no peligrosos', texto: 'Residuos no peligrosos' },
          { value: 'Ambos', texto: 'Ambos' },
          { value: 'No estoy seguro', texto: 'No estoy seguro' },
        ],
      },
      {
        control: 'textarea',
        label: 'Mensaje (opcional)',
        name: 'Mensaje',
        placeholder: '¿Qué residuos transportas, cuántos vehículos y hacia qué destino?',
      },
    ],
    boton: 'SOLICITAR COTIZACIÓN GRATUITA →',
    confianza: 'Datos protegidos · Sin compromiso',
    garantia: {
      titulo: 'Te acompañamos hasta la resolución',
      texto: 'Si la SEREMI pide correcciones o antecedentes, los preparamos sin costo adicional',
    },
  },
  queEs: {
    copete: 'El permiso',
    titulo: '¿Qué es la <em>autorización de transporte de residuos</em>?',
    parrafos: [
      'La Autorización de Transporte de Residuos es el permiso otorgado por la SEREMI de Salud que habilita a empresas y transportistas para trasladar residuos peligrosos y no peligrosos de manera legal y segura.',
      'La autorización la necesita quien transporta: la empresa de transporte, o el generador que traslada sus propios residuos con vehículos propios hacia un destino autorizado (tratamiento, reciclaje o disposición final). Si tu empresa contrata a un tercero para el traslado, no tramita este permiso, pero debe exigirle al transportista su autorización sanitaria vigente.',
      'En SVEA Consultores nos encargamos de todo el proceso: desde la clasificación de residuos hasta la obtención del permiso y la entrega de la documentación completa.',
    ],
    foto: {
      nombre: 'camion-tolva-escombros-obra-autorizacion-transporte',
      alt: 'Camión tolva cargado con escombros junto a una obra en la calle, transporte que requiere autorización sanitaria de la SEREMI',
    },
  },
  riesgos: {
    copete: 'Riesgos reales',
    titulo: 'Transportar residuos sin autorización <em>te expone</em>',
    bajada:
      'La autorización de la SEREMI de Salud es obligatoria para trasladar residuos peligrosos y no peligrosos a un destino autorizado.',
    items: [
      {
        titulo: 'Multas y sumarios sanitarios',
        texto: 'Transportar residuos sin autorización expone a la empresa a multas y sumarios sanitarios por parte de la autoridad sanitaria.',
      },
      {
        titulo: 'Paralización de operaciones',
        texto: 'La autoridad sanitaria puede paralizar tus operaciones. Las sanciones pueden incluir clausuras temporales o definitivas.',
      },
      {
        titulo: 'Rechazo por información incompleta',
        texto: 'La solicitud exige tipos de residuos, volúmenes, datos del transportista, la memoria técnica de los vehículos y un plan de contingencias. Si falta algo, el trámite se atrasa.',
      },
      {
        titulo: 'Residuos mal clasificados',
        texto: 'Si un residuo peligroso se declara como no peligroso —o al revés—, la autorización no corresponde a lo que transportas.',
      },
    ],
    llamado: 'No arriesgues tu operación. Obtén tu autorización de transporte hoy.',
    boton: 'Cotizar mi autorización ahora',
  },
  listas: [
    {
      copete: 'Quién lo necesita',
      titulo: '¿Quién necesita la <em>autorización de transporte</em>?',
      items: [
        'Fábricas e industrias',
        'Centros de almacenamiento',
        'Talleres industriales',
        'Empresas de construcción',
        'Empresas de transporte',
        'Centros de salud',
        'Estaciones de servicio',
        'Plantas de reciclaje',
      ],
    },
    {
      copete: 'Tipos de residuos',
      titulo: 'Residuos que <em>gestionamos</em>',
      items: [
        'Residuos peligrosos (RESPEL)',
        'Residuos industriales no peligrosos',
        'Aceites usados e hidrocarburos',
        'Residuos químicos y solventes',
        'Escombros y residuos de construcción',
        'Residuos hospitalarios y biomédicos',
      ],
    },
  ],
  incluye: {
    copete: 'Servicio integral',
    titulo: '¿Qué incluye <em>nuestro servicio</em>?',
    bajada: 'Desde la clasificación de tus residuos hasta la resolución de la SEREMI de Salud.',
    items: [
      {
        icono: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
        titulo: 'Evaluación y Clasificación de Residuos',
        texto: 'Identificación del tipo de residuo (peligroso o no peligroso) según normativa vigente.',
      },
      {
        icono: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
        titulo: 'Solicitud de Autorización ante SEREMI',
        texto: 'Preparación y presentación de toda la documentación requerida por la autoridad sanitaria.',
      },
      {
        icono: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/>',
        titulo: 'Obtención del Permiso de Transporte',
        texto: 'Ingreso en SEREMI en Línea, seguimiento y gestión ante la SEREMI de Salud hasta la resolución sanitaria de la solicitud.',
      },
      {
        icono: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15"/><circle cx="18" cy="5" r="3"/>',
        titulo: 'Plan de Contingencias y Antecedentes de los Vehículos',
        texto: 'Plan de contingencias ante derrames, accidentes o emergencias durante el traslado (DS 148), y la memoria técnica de los vehículos que harán el transporte.',
      },
      {
        icono: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
        titulo: 'Informe de Seguimiento y Cumplimiento',
        texto: 'Documentación que acredita el cumplimiento normativo ante fiscalizaciones.',
      },
      {
        icono: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        titulo: 'Respuesta a Observaciones',
        texto: 'Si la SEREMI pide correcciones o antecedentes, los preparamos sin costo adicional.',
      },
    ],
  },
  proceso: {
    copete: '5 pasos',
    titulo: 'Tu autorización de transporte, <em>sin complicaciones</em>',
    pasos: [
      { titulo: 'Cotización', texto: 'En menos de 24h' },
      { titulo: 'Clasificación', texto: 'Evaluación de tus residuos' },
      { titulo: 'Documentación', texto: 'Expediente + plan de contingencias' },
      { titulo: 'Gestión SEREMI', texto: 'Presentación y seguimiento' },
      { titulo: 'Resolución', texto: 'Seguimiento hasta que resuelve la SEREMI' },
    ],
  },
  normativa: {
    copete: 'Marco legal',
    titulo: 'Autorización de transporte con <em>cumplimiento normativo</em>',
    bajada: 'Tu solicitud se prepara conforme a la normativa sanitaria y ambiental vigente.',
    items: [
      {
        sigla: 'DS 148',
        titulo: 'Residuos Peligrosos',
        texto: 'Reglamento Sanitario sobre Manejo de Residuos Peligrosos: el transporte de residuos peligrosos requiere autorización sanitaria.',
      },
      {
        sigla: 'DS 298',
        titulo: 'Transporte de Cargas Peligrosas',
        texto: 'Reglamenta el transporte de cargas peligrosas por calles y caminos: vehículos, rotulación y documentación.',
      },
      {
        sigla: 'Cód. Sanitario',
        titulo: 'Código Sanitario',
        texto: 'DFL N°725: marco legal de las autorizaciones que otorga y fiscaliza la SEREMI de Salud.',
      },
    ],
  },
  faq: {
    copete: 'Preguntas frecuentes',
    titulo: 'Sobre la autorización de <em>transporte de residuos</em>',
    items: [
      {
        p: '¿Cómo obtengo el permiso de transporte ante la SEREMI de Salud?',
        r: 'El permiso se obtiene gestionando la solicitud de autorización a través de la SEREMI de Salud. Este proceso incluye la clasificación de los residuos, la presentación de la documentación necesaria y el cumplimiento de los requisitos establecidos por la autoridad sanitaria. La solicitud se ingresa en SEREMI en Línea (seremienlinea.minsal.cl) y termina en una resolución sanitaria que indica qué vehículos quedan autorizados y para qué residuos. En SVEA Consultores nos encargamos de todo el proceso.',
      },
      {
        p: '¿Qué sanciones existen por transportar residuos sin autorización?',
        r: 'Las empresas que transporten residuos sin la autorización correspondiente se exponen a multas, sumarios sanitarios y la paralización de sus operaciones por parte de la autoridad sanitaria. Las sanciones pueden incluir clausuras temporales o definitivas.',
      },
      {
        p: '¿Cuánto demora el proceso de autorización?',
        r: 'Los plazos dependen del tipo de residuo y la documentación presentada. En SVEA Consultores gestionamos el proceso completo para que obtenga su autorización en el menor tiempo posible, optimizando cada etapa del trámite.',
      },
      {
        p: '¿Qué información necesito para solicitar la autorización?',
        r: 'Se requiere información detallada sobre los tipos de residuos, volúmenes generados, procedimientos de manejo y transporte, datos del transportista, la memoria técnica de los vehículos y un plan de contingencias para el traslado, conforme al DS 148 y las regulaciones vigentes.',
      },
      {
        p: '¿Toda empresa que genera residuos necesita esta autorización?',
        r: 'No. La autorización la necesita quien transporta los residuos: la empresa de transporte, o el generador que los traslada con vehículos propios. Si tu empresa contrata a un tercero para el traslado, no tramita esta autorización, pero debe exigirle al transportista su autorización sanitaria vigente.',
      },
      {
        p: '¿Cuánto cuesta el servicio?',
        r: 'El arancel de la SEREMI de Salud es de $135.700 por trámite (valor en la SEREMI RM, septiembre de 2026; se reajusta cada año). Aparte, el costo del servicio varía según la complejidad de la instalación, el tipo de residuo a transportar y la cantidad de vehículos involucrados. Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
      },
    ],
  },
  cierre: {
    titulo: 'Obtén tu autorización de transporte <em>hoy</em>',
    texto:
      'Autorización de transporte de residuos peligrosos y no peligrosos con respaldo profesional. Cotización en menos de 24 horas, expediente en 3-5 días hábiles y gestión completa ante la SEREMI de Salud.',
    boton: 'Cotiza tu autorización ahora',
    whatsapp:
      'https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20una%20autorizaci%C3%B3n%20de%20transporte%20de%20residuos%20para%20mi%20empresa.%20Llego%20desde%20Google.',
    whatsappTexto: 'WhatsApp directo',
  },
  pie: {
    presentacion:
      'Expertos en autorizaciones de transporte de residuos y gestión de permisos ante SEREMI. Cumplimiento normativo y seguridad operativa.',
    columnas: [
      {
        titulo: 'Empresa',
        enlaces: [
          { href: 'https://sveaconsultores.cl/#Nosotros', texto: 'Nosotros' },
          { href: 'https://sveaconsultores.cl/#Formulario', texto: 'Contacto' },
          { href: 'https://sveaconsultores.cl/#Formulario', texto: 'Trabaje con Nosotros' },
        ],
      },
      {
        titulo: 'Servicios',
        enlaces: [
          { href: 'https://sveaconsultores.cl/calificacion-tecnica-industrial/', texto: 'Calificación Técnica Industrial' },
          { href: 'https://sveaconsultores.cl/estudio-de-carga-de-combustible/', texto: 'Estudio de Carga de Combustible' },
          { href: 'https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion/', texto: 'Planes de Emergencia y Evacuación Industrial' },
          { href: 'https://sveaconsultores.cl/manejo-de-residuos-peligrosos/', texto: 'Manejo de Sustancias y Residuos Peligrosos' },
          { href: 'https://sveaconsultores.cl/autorizacion-de-transporte-de-residuos/', texto: 'Autorización de Transporte de Residuos Peligrosos y no Peligrosos' },
          { href: 'https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion-condominios/', texto: 'Planes de Emergencia y Evacuación para Condominios' },
        ],
      },
    ],
    contacto: true,
  },
  foto: 'camion-tolva-carga-planta-residuos',
  medicion: {
    servicio: 'Autorización Transporte de Residuos',
    prefijoAsunto: '[ADS] Cotización Transporte Residuos - ',
    subjectId: 'dynamic-subject-ltr',
    eventoGA4: true,
    eventoWhatsApp: true,
    origen: 'paginas.json (landing nueva, sin original en el WordPress)',
  },
};

export default landing;
