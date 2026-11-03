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

/** Cuatro párrafos: la definición y los trámites que lo piden, con la
 *  bodega; lo que entrega SVEA y en qué plazo, con el centro logístico. */
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
    // 3-nov (SEO tanda 1): los tres párrafos que seguían repetían la
    // definición de la guía /estudio-de-carga-combustible-chile/. Ahora dicen
    // para qué trámite se pide y qué entrega SVEA, con lo que el sitio ya dice
    // del servicio (pasos, «qué incluye», cifras del hero) y la guía
    // «Cuándo te piden el estudio de carga de combustible».
    {
      texto:
        'Se pide en trámites concretos: el permiso de edificación y la recepción de la obra en la Dirección de Obras Municipales (DOM), la calificación ante la SEREMI de Salud, la patente municipal y, a veces, el seguro del recinto.',
      ...bodega,
    },
    {
      texto:
        'En SVEA revisamos los planos y el inventario, calculamos la carga de combustible en Mcal/m² por sector según la OGUC y la NCh 1916, y te entregamos el informe técnico con planos, cálculos y conclusiones, listo para presentar ante la autoridad, con recomendaciones para bajar el riesgo.',
      ...logistica,
    },
    {
      texto:
        'El informe está en 3-5 días hábiles y las correcciones van incluidas en el servicio, sin costo. La cotización te llega en menos de 24 horas.',
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
