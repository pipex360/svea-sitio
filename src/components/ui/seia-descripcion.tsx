'use client';

/**
 * «Descripción General» de Permisos Ambientales y Pertinencias del SEIA, con
 * el formato de ecc-que-es.tsx: los tres párrafos del WordPress con la foto
 * fija al lado. Las dos primeras hablan de la planta ecológica (la foto del
 * original); la tercera, de la energía renovable.
 *
 * Texto del WordPress con un cambio: «garantizando» y «garantizamos» eran
 * promesas que no dependen de nosotros (la resolución la da el SEA), y se
 * cambiaron por «verificando» y «trabajamos para que».
 */
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

const bloques = (): BloqueScroll[] => {
  const planta = {
    foto: 'planta-industrial-entorno-verde-seia',
    alt: 'Planta industrial en un entorno verde: proyecto que evalúa su pertinencia de ingreso al SEIA',
  };
  const renovable = {
    foto: 'consultoria-ambiental-parque-energia-renovable',
    alt: 'Parque de energía renovable con aerogeneradores, proyecto sujeto a permisos ambientales del SEIA',
  };
  return [
    {
      texto:
        'El servicio de Permisos Ambientales y Pertinencias del SEIA de Svea Consultores está diseñado para ayudar a las empresas a gestionar de manera efectiva los permisos ambientales aplicables. Nos encargamos de evaluar la pertinencia de tu proyecto dentro del Sistema de Evaluación de Impacto Ambiental (SEIA), verificando que cumpla con los requisitos ambientales y legales antes de su ejecución. Nuestro enfoque integral incluye la preparación y presentación de los documentos necesarios, asegurando que el proyecto cumpla con todas las normativas y optimizando los tiempos de tramitación.',
      ...planta,
    },
    {
      texto:
        'En Svea Consultores, trabajamos para que cada proyecto cuente con la documentación adecuada, cumpla con todas las exigencias legales y se presente dentro de los plazos establecidos, minimizando riesgos regulatorios y retrasos en la ejecución. Además, orientamos a nuestros clientes en la correcta planificación ambiental desde etapas tempranas, promoviendo decisiones responsables y sostenibles.',
      ...planta,
    },
    {
      texto:
        'Ya sea que estés iniciando un proyecto o necesites regularizar uno existente, evaluamos tu caso y te entregamos un plan de acción para cumplir con los permisos ambientales obligatorios. Nuestra experiencia en tramitación ambiental te permite enfocarte en tu negocio mientras nosotros nos encargamos del cumplimiento normativo.',
      ...renovable,
    },
  ];
};

export function SeiaDescripcion({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="descripcion" aria-labelledby="titulo-descripcion">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          base={base}
          bloques={bloques()}
          encabezado={
            <h2
              id="titulo-descripcion"
              className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              Descripción <span className="font-black text-svea">General</span>
            </h2>
          }
        />
      </div>
    </section>
  );
}

export default SeiaDescripcion;
