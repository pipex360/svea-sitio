/**
 * /cotiza-estudio-de-carga-de-combustible/ · landing de Google Ads.
 *
 * Texto, formulario y asunto extraídos del bloque HTML del original
 * (originales-wp/landings-ads/cotiza-estudio-de-carga-de-combustible.html). No se retoca a mano sin
 * revisar el original: el cruce palabra por palabra lo compara.
 *
 * Única diferencia de texto con el original: los plazos de SVEA, cambiados
 * el 24-sep por decisión de Carlos (3-5 días hábiles en todos los servicios,
 * 5-10 en Plan de Emergencia empresa y condominios). Los plazos de la
 * autoridad (SEREMI, Bomberos) quedan como estaban.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  "ruta": "/cotiza-estudio-de-carga-de-combustible/",
  "urgencia": "<strong>¿Fiscalización o permiso pendiente?</strong> — Sin estudio de carga de combustible tu instalación queda fuera de norma. Cotízalo hoy.",
  "badge": "Cotización en menos de 24 horas",
  "h1": "Estudio de Carga de<br>Combustible y <em>Carga de Fuego</em>",
  "bajada": "Elaboramos tu <strong>estudio de carga de combustible</strong> e <strong>informe de carga de fuego</strong> con respaldo técnico: identificación de materiales, cálculo de carga térmica e informe conforme a la OGUC y NCh. Tú no tienes que hacer nada.",
  "pills": [
    "Informe de carga de fuego conforme a la OGUC",
    "Correcciones sin costo incluidas",
    "Estudio en 3-5 días hábiles"
  ],
  "cifras": [
    {
      "valor": "250+",
      "texto": "Empresas atendidas"
    },
    {
      "valor": "3-5",
      "texto": "Días hábiles"
    },
    {
      "valor": "24h",
      "texto": "Cotización"
    }
  ],
  "formulario": {
    "titulo": "Cotiza tu Estudio de Carga",
    "bajada": "Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>",
    "id": "form-landing-ecc",
    "ocultos": [
      {
        "name": "access_key",
        "value": "076a0f9a-9911-48f6-880e-dd9d44c3063b"
      },
      {
        "name": "subject",
        "value": "[LANDING ADS] Cotización ECC - SVEA",
        "id": "dynamic-subject-lecc"
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
        "value": "Estudio de Carga de Combustible / Carga de Fuego"
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
            "value": "Bodega / Centro logístico",
            "texto": "Bodega / Centro logístico"
          },
          {
            "value": "Fábrica / Industria",
            "texto": "Fábrica / Industria"
          },
          {
            "value": "Taller mecánico / industrial",
            "texto": "Taller mecánico / industrial"
          },
          {
            "value": "Centro comercial",
            "texto": "Centro comercial"
          },
          {
            "value": "Almacén de materiales",
            "texto": "Almacén de materiales"
          },
          {
            "value": "Planta de producción",
            "texto": "Planta de producción"
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
        "placeholder": "¿Necesitas el estudio de carga de combustible por fiscalización, patente u otro motivo?"
      }
    ],
    "boton": "SOLICITAR COTIZACIÓN GRATUITA →",
    "confianza": "Datos protegidos · Sin compromiso",
    "garantia": {
      "titulo": "Informe de carga de fuego con respaldo normativo",
      "texto": "Incluye correcciones sin costo adicional hasta la aprobación"
    }
  },
  "riesgos": {
    "copete": "Riesgos reales",
    "titulo": "Sin estudio de carga de combustible <em>operas fuera de norma</em>",
    "bajada": "El informe de carga de fuego es obligatorio para cumplir la OGUC y obtener tus permisos.",
    "items": [
      {
        "titulo": "Incumplimiento de la OGUC",
        "texto": "La Ordenanza exige conocer la carga de combustible para clasificar el nivel de riesgo de incendio de tu instalación."
      },
      {
        "titulo": "Rechazo de permisos",
        "texto": "Sin el estudio de carga de combustible no puedes obtener autorizaciones municipales ni permisos de edificación."
      },
      {
        "titulo": "Carga de fuego no evaluada",
        "texto": "Desconocer la carga de fuego de tu instalación impide implementar medidas de prevención adecuadas contra incendios."
      },
      {
        "titulo": "Responsabilidad ante siniestros",
        "texto": "Sin informe de carga de combustible vigente, la empresa enfrenta responsabilidad directa ante un incendio."
      }
    ],
    "llamado": "No arriesgues tu instalación. Obtén tu estudio de carga de fuego hoy: cotiza ahora.",
    "boton": "Cotizar estudio de carga"
  },
  "incluye": {
    "copete": "Servicio integral",
    "titulo": "¿Qué incluye el <em>estudio de carga de combustible</em>?",
    "bajada": "Informe de carga de fuego completo con cálculo térmico, planos y clasificación de riesgo.",
    "items": [
      {
        "icono": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>",
        "titulo": "Inspección en Terreno",
        "texto": "Levantamiento de materiales combustibles presentes en cada sector de la instalación."
      },
      {
        "icono": "<path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
        "titulo": "Cálculo de Carga de Fuego",
        "texto": "Cuantificación de la carga de combustible por sector según metodología normada OGUC."
      },
      {
        "icono": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
        "titulo": "Clasificación de Riesgo",
        "texto": "Determinación del nivel de riesgo (bajo, medio, alto) según la carga de fuego calculada."
      },
      {
        "icono": "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>",
        "titulo": "Planos y Zonificación",
        "texto": "Planos con identificación de sectores, materiales y clasificación de riesgo de incendio."
      },
      {
        "icono": "<path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
        "titulo": "Informe de Carga de Combustible",
        "texto": "Documento técnico completo con resultados del estudio de carga, análisis y recomendaciones."
      },
      {
        "icono": "<polyline points=\"9 11 12 14 22 4\"/><path d=\"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11\"/>",
        "titulo": "Recomendaciones de Seguridad",
        "texto": "Medidas para optimizar almacenamiento y reducir la carga de fuego de tu instalación."
      }
    ]
  },
  "proceso": {
    "copete": "5 pasos",
    "titulo": "Tu estudio de carga de combustible, <em>sin complicaciones</em>",
    "pasos": [
      {
        "titulo": "Cotización",
        "texto": "En menos de 24h"
      },
      {
        "titulo": "Inspección",
        "texto": "Visita a tu instalación"
      },
      {
        "titulo": "Cálculo",
        "texto": "Carga de fuego por sector"
      },
      {
        "titulo": "Informe",
        "texto": "Estudio de carga + planos"
      },
      {
        "titulo": "Entrega",
        "texto": "Informe aprobado"
      }
    ]
  },
  "normativa": {
    "copete": "Marco legal",
    "titulo": "Estudio de carga de combustible con <em>cumplimiento normativo</em>",
    "bajada": "Tu informe de carga de fuego cumplirá con la normativa vigente de seguridad contra incendios.",
    "items": [
      {
        "sigla": "OGUC",
        "titulo": "Ordenanza de Urbanismo",
        "texto": "Define la clasificación de riesgo según carga de combustible y exige medidas de protección contra incendios."
      },
      {
        "sigla": "DS 594",
        "titulo": "Condiciones Sanitarias",
        "texto": "Establece condiciones de seguridad y prevención de riesgos en lugares de trabajo."
      },
      {
        "sigla": "NCh 1916",
        "titulo": "Protección contra Incendio",
        "texto": "Norma chilena que establece requisitos de seguridad contra incendio y cálculo de carga de fuego en edificaciones."
      }
    ]
  },
  "faq": {
    "copete": "Preguntas frecuentes",
    "titulo": "Sobre el estudio de carga de combustible y <em>carga de fuego</em>",
    "items": [
      {
        "p": "¿Qué es el estudio de carga de combustible?",
        "r": "El <strong>estudio de carga de combustible</strong> es un análisis técnico que cuantifica los materiales combustibles en tu instalación, determina la carga térmica por sector y clasifica el nivel de riesgo de incendio conforme a la OGUC. También se le conoce como <strong>informe de carga de fuego</strong>."
      },
      {
        "p": "¿Qué es la carga de fuego y cómo se calcula?",
        "r": "La <strong>carga de fuego</strong> es la cantidad total de energía calorífica que pueden liberar los materiales combustibles presentes en un sector. Se calcula identificando cada material, su cantidad y su poder calorífico, y se expresa en Mcal/m². El <strong>estudio de carga de combustible</strong> incluye este cálculo para cada sector de tu instalación."
      },
      {
        "p": "¿Quiénes deben realizar el estudio de carga de combustible?",
        "r": "Bodegas, fábricas, talleres, centros logísticos, centros comerciales y cualquier instalación que almacene materiales combustibles o inflamables. Es obligatorio para cumplir con la OGUC."
      },
      {
        "p": "¿Qué pasa si la carga de fuego supera los límites?",
        "r": "Se deben implementar medidas correctivas: reducción de materiales combustibles, instalación de sistemas contra incendios o redistribución del almacenamiento. Te asesoramos en las soluciones."
      },
      {
        "p": "¿Cuánto cuesta el estudio de carga de combustible?",
        "r": "Depende del tamaño y complejidad de la instalación. Solicita tu cotización sin compromiso y la recibirás en menos de 24 horas."
      }
    ]
  },
  "cierre": {
    "titulo": "Obtén tu estudio de carga de combustible <em>hoy</em>",
    "texto": "Informe de carga de fuego con respaldo profesional. Cotización en menos de 24 horas, estudio en 3-5 días hábiles, conforme a la OGUC y NCh.",
    "boton": "Cotizar estudio de carga",
    "whatsapp": "https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20un%20estudio%20de%20carga%20de%20combustible%20%2F%20carga%20de%20fuego%20para%20mi%20instalaci%C3%B3n.%20Llego%20desde%20Google.",
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
            "texto": "Autorización de Transporte de Residuos"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion-condominios/",
            "texto": "Planes de Emergencia para Condominios"
          }
        ]
      }
    ],
    "presentacion": "Expertos en estudios de carga de combustible, informes de carga de fuego y gestión de permisos ante SEREMI. Cumplimiento normativo OGUC y seguridad contra incendios.",
    "contacto": true
  },
  "foto": 'operario-transpaleta-racks-estudio-carga-combustible',
  "medicion": {
    "servicio": "Estudio de Carga de Combustible",
    "prefijoAsunto": "[ADS] Cotización ECC - ",
    "subjectId": "dynamic-subject-lecc",
    "eventoGA4": true,
    "eventoWhatsApp": true,
    "origen": "<script> del original"
  }
};

export default landing;
