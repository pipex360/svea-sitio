'use client';

/**
 * «¿Qué es la CTI?» y «¿Quién necesita una CTI?», que en el WordPress eran
 * dos secciones seguidas y aquí van en una: la definición con la foto fija
 * al lado, y debajo los ocho tipos de empresa.
 *
 * Son el mismo tema —qué es esto y a quién le aplica—, y juntarlas ahorra un
 * encabezado y un salto de sección sin quitar una palabra: los cuatro
 * párrafos y los ocho tipos están completos y con el mismo texto.
 *
 * La definición usa Scroll01 (21st.dev): la foto se queda fija mientras se
 * leen los párrafos y cambia a la mitad. Así entran las dos fotos que el
 * WordPress tiene para esta página —antes sólo usábamos una— y el texto
 * largo deja de ser un bloque parejo.
 */

import {
  BuildingIcon,
  FactoryIcon,
  LeafIcon,
  PackageIcon,
  RefreshCwIcon,
  StoreIcon,
  WarehouseIcon,
  WrenchIcon,
} from 'lucide-react';

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original, con la foto que acompaña a cada uno:
 *  las dos primeras sobre qué es y para qué sirve, con la planta química;
 *  las dos últimas sobre lo que hacemos nosotros, con la instalación. */
const bloques = (base: string): BloqueScroll[] => {
  const planta = {
    media: `${base}/img/cti/chemical-plant.webp`,
    alt: 'Calificación técnica industrial - planta química evaluada por SVEA Consultores',
  };
  const instalacion = {
    media: `${base}/img/cti/industry-factory.webp`,
    alt: 'Informe CTI SEREMI de Salud - instalación industrial nocturna',
  };
  return [
    {
      texto:
        'La Calificación Técnica Industrial (CTI) es un informe fundamental emitido por la SEREMI de Salud, cuyo objetivo es certificar que una industria, empresa o establecimiento cumple con los requisitos normativos, técnicos y territoriales necesarios para operar legalmente dentro de una comuna.',
      ...planta,
    },
    {
      texto:
        'Este documento es clave para demostrar que la actividad se encuentra correctamente emplazada, de acuerdo con el uso de suelo establecido por el Plan Regulador Comunal, y que su funcionamiento no representa riesgos sanitarios o ambientales para la comunidad.',
      ...planta,
    },
    {
      texto:
        'En SVEA Consultores nos encargamos de evaluar detalladamente las características de tu infraestructura, levantamos toda la información requerida y preparamos el expediente técnico completo que exige la SEREMI de Salud. Además, gestionamos directamente la tramitación del informe, representándote ante la autoridad sanitaria y facilitando la regularización de tu actividad.',
      ...instalacion,
    },
    {
      texto:
        'Ya sea que estés comenzando un proyecto o necesites regularizar una instalación existente, te ayudamos a cumplir con la normativa de forma segura, ágil y con respaldo profesional. También gestionamos la calificación como actividad inofensiva ante la SEREMI de Salud (Circular B32/04).',
      ...instalacion,
    },
  ];
};

/** Los ocho del original, con el icono que le toca a cada instalación. */
const QUIENES: Ficha[] = [
  { nombre: 'Fábricas e industrias', icono: FactoryIcon },
  { nombre: 'Bodegas y centros de distribución', icono: WarehouseIcon },
  { nombre: 'Talleres mecánicos e industriales', icono: WrenchIcon },
  { nombre: 'Empresas con modificaciones', icono: BuildingIcon },
  { nombre: 'Locales comerciales regulados', icono: StoreIcon },
  { nombre: 'Centros de almacenamiento', icono: PackageIcon },
  { nombre: 'Cambios de giro o ampliaciones', icono: RefreshCwIcon },
  { nombre: 'Actividades inofensivas (B32/04)', icono: LeafIcon },
];

export function CtiQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          bloques={bloques(base)}
          encabezado={
            <h2
              id="titulo-que-es"
              className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              ¿Qué es la <span className="font-black text-svea">Calificación Técnica Industrial?</span>
            </h2>
          }
        />

        <ServiceGrid
          className="mt-20"
          titulo={
            <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
              ¿Quién necesita una Calificación Técnica Industrial?
            </h3>
          }
          fichas={QUIENES}
        />
      </div>
    </section>
  );
}

export default CtiQueEs;
