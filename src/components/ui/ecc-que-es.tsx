'use client';

/**
 * «¿Qué es el Estudio de Carga de Combustible?» y «¿Quién necesita un
 * Estudio de Carga de Combustible?», con el mismo formato que la CTI
 * (cti-que-es.tsx): la definición con la foto fija al lado y debajo los ocho
 * tipos de instalación. Texto idéntico al WordPress.
 */
import {
  BuildingIcon,
  FactoryIcon,
  FlameIcon,
  RefreshCwIcon,
  StoreIcon,
  TruckIcon,
  WarehouseIcon,
  WrenchIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el
 *  estudio, con la bodega; los dos últimos sobre qué se evalúa y para qué
 *  sirve, con el centro logístico. */
const bloques = (): BloqueScroll[] => {
  const bodega = {
    foto: 'bodega-productos-estudio-carga-combustible',
    alt: 'Bodega con productos en racks: la carga que evalúa el estudio de carga de combustible',
  };
  const logistica = {
    foto: 'bodega-centro-logistico-carga-combustible',
    alt: 'Centro logístico con estanterías altas, objeto de un estudio de carga de combustible según la OGUC',
  };
  return [
    {
      texto:
        'El Estudio de Carga de Combustible (ECC) es un análisis técnico especializado que permite cuantificar con precisión la cantidad total de material combustible presente en una instalación, ya sea industrial, comercial o de almacenamiento.',
      ...bodega,
    },
    {
      texto:
        'Este estudio es fundamental para identificar el riesgo potencial de incendio y clasificar adecuadamente los sectores según su nivel de carga térmica, tal como lo establece la normativa vigente en Chile, incluyendo la Ordenanza General de Urbanismo y Construcción (OGUC) y la norma NCh 1916.',
      ...bodega,
    },
    {
      texto:
        'A través de este análisis, se evalúa no solo la cantidad de materiales combustibles, sino también su ubicación, distribución y comportamiento ante una eventual emergencia. Con esta información, es posible determinar el nivel de riesgo que representa cada área, facilitando la implementación de medidas de seguridad específicas.',
      ...logistica,
    },
    {
      texto:
        'Su correcta ejecución contribuye a la seguridad de las personas y las instalaciones, permite acceder a autorizaciones municipales, prevenir sanciones y demostrar el compromiso de la empresa con la gestión integral del riesgo.',
      ...logistica,
    },
  ];
};

const QUIENES = [
  { texto: 'Fábricas e industrias', icono: FactoryIcon },
  { texto: 'Bodegas de almacenamiento', icono: WarehouseIcon },
  { texto: 'Talleres mecánicos', icono: WrenchIcon },
  { texto: 'Centros comerciales', icono: StoreIcon },
  { texto: 'Centros logísticos', icono: TruckIcon },
  { texto: 'Empresas con modificaciones', icono: BuildingIcon },
  { texto: 'Instalaciones con inflamables', icono: FlameIcon },
  { texto: 'Ampliaciones o cambio de giro', icono: RefreshCwIcon },
];

export function EccQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          base={base}
          bloques={bloques()}
          encabezado={
            <h2
              id="titulo-que-es"
              className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              ¿Qué es el <span className="font-black text-svea">Estudio de Carga de Combustible?</span>
            </h2>
          }
        />

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita un Estudio de Carga de Combustible?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUIENES.map(({ texto, icono: Icono }) => (
              <li
                key={texto}
                className="flex items-center gap-3 rounded-xl border border-border bg-hoja p-4 transition-colors duration-200 hover:border-black/30"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-svea">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-black">{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default EccQueEs;
