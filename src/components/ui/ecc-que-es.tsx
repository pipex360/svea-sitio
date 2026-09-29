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

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el
 *  estudio, con la bodega; los dos últimos sobre qué se evalúa y para qué
 *  sirve, con el centro logístico. */
const bloques = (): BloqueScroll[] => {
  const bodega = {
    foto: 'bodega-racks-mercaderia-carga-combustible',
    alt: 'Pasillo de bodega con racks cargados de cajas, baldes y tambores: la carga de fuego que evalúa el estudio de carga de combustible',
  };
  const logistica = {
    foto: 'bodega-cajas-estudio-carga-combustible',
    alt: 'Bodega llena de cajas en estanterías altas, objeto de un estudio de carga de combustible según la OGUC',
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

const QUIENES: Ficha[] = [
  { nombre: 'Fábricas e industrias', icono: FactoryIcon },
  { nombre: 'Bodegas de almacenamiento', icono: WarehouseIcon },
  { nombre: 'Talleres mecánicos', icono: WrenchIcon },
  { nombre: 'Centros comerciales', icono: StoreIcon },
  { nombre: 'Centros logísticos', icono: TruckIcon },
  { nombre: 'Empresas con modificaciones', icono: BuildingIcon },
  { nombre: 'Instalaciones con inflamables', icono: FlameIcon },
  { nombre: 'Ampliaciones o cambio de giro', icono: RefreshCwIcon },
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

        <ServiceGrid
          className="mt-20"
          titulo={
            <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
              ¿Quién necesita un Estudio de Carga de Combustible?
            </h3>
          }
          fichas={QUIENES}
        />
      </div>
    </section>
  );
}

export default EccQueEs;
