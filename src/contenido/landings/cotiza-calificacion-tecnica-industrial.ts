/**
 * /cotiza-calificacion-tecnica-industrial/ · landing de Google Ads.
 *
 * Texto, formulario y asunto extraídos del bloque HTML del original
 * (originales-wp/landings-ads/cotiza-calificacion-tecnica-industrial.html). No se retoca a mano sin
 * revisar el original: el cruce palabra por palabra lo compara.
 *
 * Única diferencia de texto con el original: los plazos de SVEA, cambiados
 * el 24-sep por decisión de Carlos (3-5 días hábiles en todos los servicios,
 * 5-10 en Plan de Emergencia empresa y condominios). Los plazos de la
 * autoridad (SEREMI, Bomberos) quedan como estaban.
 *
 * Agregado el 24-sep (sólo se suma texto, no se quita nada del original):
 * «calificación inofensiva» y «calificación industrial SEREMI» en la bajada,
 * una pill, un ítem de «qué incluye» y una pregunta frecuente.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  "ruta": "/cotiza-calificacion-tecnica-industrial/",
  "urgencia": "<strong>¿Necesitas tu certificado de actividad inofensiva?</strong> — Sin calificación técnica industrial aprobada no puedes operar. Regulariza hoy.",
  "badge": "Cotización en menos de 24 horas",
  "h1": "Certificado de Actividad<br>Inofensiva y <em>Calificación Técnica Industrial</em>",
  "bajada": "Gestionamos tu <strong>certificado de actividad inofensiva</strong> (la calificación inofensiva) y la <strong>calificación técnica industrial</strong> completa ante la SEREMI de Salud: evaluación, expediente y tramitación. Tú no tienes que hacer nada.",
  "pills": [
    "Certificado de actividad inofensiva ante SEREMI",
    "Calificación industrial SEREMI de principio a fin",
    "Correcciones sin costo hasta la resolución",
    "Expediente listo en 3-5 días hábiles"
  ],
  "cifras": [
    {
      "valor": "250+",
      "texto": "Empresas atendidas"
    },
    {
      "valor": "15-45",
      "texto": "Días SEREMI (referencial)"
    },
    {
      "valor": "24h",
      "texto": "Cotización"
    }
  ],
  "formulario": {
    "titulo": "Cotiza tu Certificado Ahora",
    "bajada": "Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>",
    "id": "form-landing-cti",
    "ocultos": [
      {
        "name": "access_key",
        "value": "076a0f9a-9911-48f6-880e-dd9d44c3063b"
      },
      {
        "name": "subject",
        "value": "[LANDING ADS] Cotización CTI - SVEA",
        "id": "dynamic-subject-lcti"
      },
      {
        "name": "from_name",
        "value": "SVEA Landing Ads"
      },
      {
        "name": "redirect",
        "value": "https://sveaconsultores.cl/gracias/"
      },
      {
        "name": "Servicio",
        "value": "Certificado Actividad Inofensiva / Calificación Técnica Industrial"
      },
      {
        "name": "Fuente",
        "value": "Google Ads Landing"
      },
      {
        "name": "gclid",
        "value": "",
        "id": "field-gclid"
      },
      {
        "name": "utm_source",
        "value": "",
        "id": "field-utm_source"
      },
      {
        "name": "utm_medium",
        "value": "",
        "id": "field-utm_medium"
      },
      {
        "name": "utm_campaign",
        "value": "",
        "id": "field-utm_campaign"
      },
      {
        "name": "utm_content",
        "value": "",
        "id": "field-utm_content"
      },
      {
        "name": "utm_term",
        "value": "",
        "id": "field-utm_term"
      }
    ],
    "campos": [
      {
        "control": "input",
        "label": "Nombre completo *",
        "name": "Nombre",
        "type": "text",
        "placeholder": "Ej: María González",
        "required": true
      },
      {
        "control": "input",
        "label": "Teléfono *",
        "name": "Teléfono",
        "type": "tel",
        "placeholder": "+569 1234 5678",
        "required": true,
        "mitad": true
      },
      {
        "control": "input",
        "label": "Email *",
        "name": "Email",
        "type": "email",
        "placeholder": "correo@empresa.cl",
        "required": true,
        "mitad": true
      },
      {
        "control": "input",
        "label": "Empresa *",
        "name": "Empresa",
        "type": "text",
        "placeholder": "Nombre de tu empresa",
        "required": true
      },
      {
        "control": "select",
        "label": "Tipo de establecimiento",
        "name": "Tipo de Establecimiento",
        "opciones": [
          {
            "value": "",
            "texto": "Selecciona...",
            "placeholder": true
          },
          {
            "value": "Fábrica / Industria",
            "texto": "Fábrica / Industria"
          },
          {
            "value": "Bodega / Centro logístico",
            "texto": "Bodega / Centro logístico"
          },
          {
            "value": "Taller mecánico / industrial",
            "texto": "Taller mecánico / industrial"
          },
          {
            "value": "Planta de alimentos",
            "texto": "Planta de alimentos"
          },
          {
            "value": "Local comercial",
            "texto": "Local comercial"
          },
          {
            "value": "Oficinas con actividad industrial",
            "texto": "Oficinas con actividad industrial"
          },
          {
            "value": "Microempresa (Ley 20.898)",
            "texto": "Microempresa (Ley 20.898)"
          },
          {
            "value": "Otro",
            "texto": "Otro"
          }
        ]
      },
      {
        "control": "textarea",
        "label": "Mensaje (opcional)",
        "name": "Mensaje",
        "placeholder": "¿Necesitas certificado de actividad inofensiva, CTI por patente nueva, renovación o regularización?"
      }
    ],
    "boton": "SOLICITAR COTIZACIÓN GRATUITA →",
    "confianza": "Datos protegidos · Sin compromiso",
    "garantia": {
      "titulo": "Te acompañamos hasta la resolución",
      "texto": "Si la SEREMI pide correcciones o antecedentes, los preparamos sin costo adicional"
    }
  },
  "riesgos": {
    "copete": "Riesgos reales",
    "titulo": "Sin certificado de actividad inofensiva <em>no puedes operar</em>",
    "bajada": "La calificación técnica industrial es obligatoria para obtener tu patente municipal.",
    "items": [
      {
        "titulo": "Sin patente municipal",
        "texto": "El certificado de actividad inofensiva es requisito obligatorio para obtener tu patente industrial. Sin calificación técnica industrial, no puedes operar."
      },
      {
        "titulo": "Multas y clausura",
        "texto": "Operar sin calificación industrial expone tu empresa a multas de la SEREMI de Salud y cierre del establecimiento."
      },
      {
        "titulo": "Rechazo por documentación incompleta",
        "texto": "La SEREMI rechaza expedientes con planos incompletos o información insuficiente. Pierdes tiempo y dinero."
      },
      {
        "titulo": "Problemas de uso de suelo",
        "texto": "Si tu actividad no es compatible con el Plan Regulador Comunal, la calificación técnica industrial será rechazada sin asesoría previa."
      }
    ],
    "llamado": "No arriesgues tu operación. Obtén tu certificado de actividad inofensiva hoy.",
    "boton": "Cotizar mi certificado ahora"
  },
  "incluye": {
    "copete": "Servicio integral",
    "titulo": "¿Qué incluye la <em>calificación técnica industrial</em>?",
    "bajada": "Desde la evaluación hasta el certificado de actividad inofensiva aprobado por SEREMI. Sin complicaciones.",
    "items": [
      {
        "icono": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>",
        "titulo": "Evaluación de Infraestructura",
        "texto": "Inspección técnica del establecimiento, uso de suelo y condiciones normativas para la calificación industrial."
      },
      {
        "icono": "<path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
        "titulo": "Expediente Técnico CTI",
        "texto": "Elaboración del informe de calificación técnica industrial con toda la documentación que exige la SEREMI."
      },
      {
        "icono": "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>",
        "titulo": "Planos y Memorias",
        "texto": "Planos de planta, memoria descriptiva y antecedentes técnicos requeridos para el certificado."
      },
      {
        "icono": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
        "titulo": "Verificación Normativa",
        "texto": "Compatibilidad con Plan Regulador Comunal, uso de suelo y normativa sanitaria DS 594."
      },
      {
        "icono": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
        "titulo": "Tramitación SEREMI",
        "texto": "Presentación y gestión directa ante la SEREMI de Salud para obtener tu calificación industrial SEREMI y el certificado de actividad inofensiva."
      },
      {
        "icono": "<polyline points=\"9 11 12 14 22 4\"/><path d=\"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11\"/>",
        "titulo": "Hasta la Resolución",
        "texto": "Acompañamiento hasta la resolución de la SEREMI y el certificado de calificación industrial."
      }
    ]
  },
  "proceso": {
    "copete": "5 pasos",
    "titulo": "Tu certificado de actividad inofensiva, <em>sin complicaciones</em>",
    "pasos": [
      {
        "titulo": "Cotización",
        "texto": "En menos de 24h"
      },
      {
        "titulo": "Evaluación",
        "texto": "Inspección en terreno"
      },
      {
        "titulo": "Expediente",
        "texto": "Informe CTI + planos"
      },
      {
        "titulo": "Tramitación",
        "texto": "Gestión ante SEREMI"
      },
      {
        "titulo": "Certificado",
        "texto": "Actividad inofensiva aprobada"
      }
    ]
  },
  "normativa": {
    "copete": "Marco legal",
    "titulo": "Calificación técnica industrial con <em>cumplimiento normativo</em>",
    "bajada": "Tu expediente cumplirá con toda la normativa que exige la SEREMI para el certificado de actividad inofensiva.",
    "items": [
      {
        "sigla": "DS 594",
        "titulo": "Condiciones Sanitarias",
        "texto": "Establece las condiciones sanitarias y ambientales básicas que debe cumplir todo lugar de trabajo para obtener la calificación industrial."
      },
      {
        "sigla": "OGUC",
        "titulo": "Ordenanza de Urbanismo",
        "texto": "Define el uso de suelo, condiciones de emplazamiento y requisitos para actividades industriales."
      },
      {
        "sigla": "PRC",
        "titulo": "Plan Regulador Comunal",
        "texto": "Determina si tu actividad es compatible con la zona donde opera tu establecimiento."
      }
    ]
  },
  "faq": {
    "copete": "Preguntas frecuentes",
    "titulo": "Sobre el certificado de actividad inofensiva y <em>calificación industrial</em>",
    "items": [
      {
        "p": "¿Qué es el certificado de actividad inofensiva?",
        "r": "El <strong>certificado de actividad inofensiva</strong> es la resolución que emite la SEREMI de Salud cuando tu actividad se clasifica como “inofensiva” según el D.S. 594. Es el resultado del proceso de <strong>Calificación Técnica Industrial</strong> (CTI) y es requisito obligatorio para obtener tu patente municipal. Nosotros preparamos el expediente técnico completo y tramitamos la obtención del certificado ante la autoridad."
      },
      {
        "p": "¿Qué es la Calificación Técnica Industrial (CTI)?",
        "r": "La <strong>calificación técnica industrial</strong> es un informe emitido por la SEREMI de Salud que certifica que tu establecimiento cumple con los requisitos normativos, técnicos y territoriales para operar legalmente. Según la <strong>calificación industrial</strong>, tu actividad puede clasificarse como inofensiva, molesta, insalubre, contaminante o peligrosa. Es requisito obligatorio para la patente municipal."
      },
      {
        "p": "¿Cuánto demora obtener el certificado de actividad inofensiva?",
        "r": "El expediente técnico de calificación técnica industrial lo preparamos en 3 a 5 días hábiles. La tramitación ante SEREMI para obtener el certificado puede tomar 15 a 45 días adicionales (plazo referencial según nuestra experiencia), dependiendo de la autoridad. Nosotros gestionamos todo el proceso."
      },
      {
        "p": "¿Calificación inofensiva o calificación industrial SEREMI: cuál necesito?",
        "r": "Son parte del mismo trámite. La <strong>calificación industrial SEREMI</strong> (CTI) clasifica tu actividad como inofensiva, molesta, insalubre, contaminante o peligrosa; cuando el resultado es inofensiva, lo que recibes es la <strong>calificación inofensiva</strong>, que es la que pide la municipalidad para la patente. Antes de ingresar el expediente te decimos qué categoría esperar."
      },
      {
        "p": "¿Qué pasa si mi infraestructura no cumple con la calificación industrial?",
        "r": "Te asesoramos sobre los cambios necesarios para cumplir con la normativa antes de presentar el expediente de calificación técnica industrial. Esto evita rechazos y ahorra tiempo."
      },
      {
        "p": "¿Puedo operar sin calificación técnica industrial?",
        "r": "No. La calificación industrial es requisito para obtener la patente municipal. Operar sin el certificado de actividad inofensiva puede resultar en multas, clausura del establecimiento y problemas legales."
      },
      {
        "p": "¿Soy microempresa, aplico a un trámite simplificado? (Ley 20.898)",
        "r": "Sí. La <strong>Ley 20.898 (artículo 7)</strong> permite a las microempresas presentar una declaración simplificada ante la SEREMI de Salud para obtener el <strong>certificado de actividad inofensiva</strong>. Te conviene contratarnos si tu local necesita planos y memoria técnica, si la SEREMI te pidió antecedentes o si no está claro que tu actividad sea inofensiva."
      },
      {
        "p": "¿Cuánto cuesta la calificación técnica industrial?",
        "r": "Depende del tamaño y complejidad de la infraestructura. Solicita tu cotización sin compromiso y la recibirás en menos de 24 horas."
      }
    ]
  },
  "cierre": {
    "titulo": "Obtén tu certificado de actividad inofensiva <em>hoy</em>",
    "texto": "Calificación técnica industrial con respaldo profesional. Cotización en menos de 24 horas, expediente en 3-5 días hábiles y resolución SEREMI en 15-45 días (referencial).",
    "boton": "Cotiza tu certificado ahora",
    "whatsapp": "https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20un%20certificado%20de%20actividad%20inofensiva%20%2F%20calificaci%C3%B3n%20t%C3%A9cnica%20industrial%20para%20mi%20empresa.%20Llego%20desde%20Google.",
    "whatsappTexto": "WhatsApp directo"
  },
  "pie": {
    "columnas": [
      {
        "titulo": "Empresa",
        "enlaces": [
          {
            "href": "https://sveaconsultores.cl/#Nosotros",
            "texto": "Nosotros"
          },
          {
            "href": "https://sveaconsultores.cl/#Formulario",
            "texto": "Contacto"
          },
          {
            "href": "https://sveaconsultores.cl/#Formulario",
            "texto": "Trabaje con Nosotros"
          }
        ]
      },
      {
        "titulo": "Servicios",
        "enlaces": [
          {
            "href": "https://sveaconsultores.cl/calificacion-tecnica-industrial/",
            "texto": "Calificación Técnica Industrial"
          },
          {
            "href": "https://sveaconsultores.cl/estudio-de-carga-de-combustible/",
            "texto": "Estudio de Carga de Combustible"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion/",
            "texto": "Planes de Emergencia y Evacuación Industrial"
          },
          {
            "href": "https://sveaconsultores.cl/manejo-de-residuos-peligrosos/",
            "texto": "Manejo de Sustancias y Residuos Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/autorizacion-de-transporte-de-residuos/",
            "texto": "Autorización de Transporte de Residuos Peligrosos y no Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion-condominios/",
            "texto": "Planes de Emergencia y Evacuación para Condominios"
          }
        ]
      }
    ],
    "presentacion": "Expertos en certificados de actividad inofensiva, calificación técnica industrial y gestión de permisos ante SEREMI. Cumplimiento normativo y seguridad operativa.",
    "contacto": true
  },
  "foto": 'operarios-grua-horquilla-bodega-calificacion-tecnica',
  "medicion": {
    "servicio": "Calificación Técnica Industrial",
    "prefijoAsunto": "[ADS] Cotización CTI - ",
    "subjectId": "dynamic-subject-lcti",
    "eventoGA4": true,
    "eventoWhatsApp": true,
    "origen": "<script> del original"
  }
};

export default landing;
