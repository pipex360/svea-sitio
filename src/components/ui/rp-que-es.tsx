'use client';

/**
 * «¿Qué es el Manejo de Residuos Peligrosos?», «¿Quién necesita gestionar sus
 * residuos peligrosos?» y «¿Qué tipos de residuos peligrosos gestionamos?»,
 * con el mismo formato que la CTI y el ECC (cti-que-es.tsx, ecc-que-es.tsx):
 * la definición con la foto fija al lado y debajo las listas. Texto idéntico
 * al WordPress. El quinto párrafo (el que enlaza a la guía del blog) vive en
 * rp-siguiente.tsx, en la tarjeta de la guía.
 */
import {
  AtomIcon,
  DropletIcon,
  FactoryIcon,
  FlameIcon,
  FlaskConicalIcon,
  FuelIcon,
  HardHatIcon,
  HospitalIcon,
  LayersIcon,
  SkullIcon,
  TestTubeIcon,
  TruckIcon,
  WarehouseIcon,
  WrenchIcon,
  ZapIcon,
} from 'lucide-react';

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original: los dos primeros sobre qué es y la
 *  normativa, con el operario en la bodega de residuos; los dos últimos sobre los riesgos y
 *  el servicio, con los contenedores IBC. */
const bloques = (): BloqueScroll[] => {
  const bodega = {
    foto: 'operario-bodega-residuos-peligrosos',
    alt: 'Operario con chaleco reflectante mueve tambores en una bodega de residuos peligrosos según el DS 148',
  };
  const contenedores = {
    foto: 'tambores-azules-residuos-peligrosos-almacenamiento',
    alt: 'Tambores metálicos azules apilados, vistos desde arriba: almacenamiento de residuos peligrosos bajo normativa',
  };
  return [
    {
      texto:
        'El Manejo de Residuos Peligrosos es el conjunto de procedimientos técnicos y normativos que regulan cómo una empresa debe almacenar, manipular, transportar y disponer sustancias que representan riesgos para la salud y el medio ambiente.',
      ...bodega,
    },
    {
      texto:
        'En Chile, los Decretos 43/2015 y 148/2003 del MINSAL establecen los requisitos legales obligatorios para toda empresa que genere o manipule residuos peligrosos, incluyendo materiales inflamables, tóxicos, corrosivos y reactivos.',
      ...bodega,
    },
    {
      texto:
        'Un manejo inadecuado puede generar sanciones, multas, clausuras y riesgos graves de contaminación, incendios o intoxicaciones en el lugar de trabajo.',
      ...contenedores,
    },
    {
      texto:
        'Nuestro servicio entrega un informe técnico completo con planes de manejo personalizados, procedimientos operativos y recomendaciones de mejora continua para asegurar tu cumplimiento normativo.',
      ...contenedores,
    },
  ];
};

const QUIENES: Ficha[] = [
  { nombre: 'Fábricas e industrias', icono: FactoryIcon },
  { nombre: 'Laboratorios', icono: FlaskConicalIcon },
  { nombre: 'Talleres mecánicos', icono: WrenchIcon },
  { nombre: 'Centros de salud', icono: HospitalIcon },
  { nombre: 'Estaciones de servicio', icono: FuelIcon },
  { nombre: 'Bodegas de químicos', icono: WarehouseIcon },
  { nombre: 'Empresas de construcción', icono: HardHatIcon },
  { nombre: 'Transportistas de RESPEL', icono: TruckIcon },
];

const TIPOS: Ficha[] = [
  { nombre: 'Inflamables (solventes, combustibles)', icono: FlameIcon },
  { nombre: 'Tóxicos (metales pesados, pesticidas)', icono: SkullIcon },
  { nombre: 'Corrosivos (ácidos, bases)', icono: TestTubeIcon },
  { nombre: 'Reactivos (oxidantes, peróxidos)', icono: ZapIcon },
  { nombre: 'Aceites usados e hidrocarburos', icono: DropletIcon },
  { nombre: 'Residuos industriales mixtos', icono: LayersIcon },
];


export function RpQueEs({ base = '' }: { base?: string }) {
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
              ¿Qué es el <span className="font-black text-svea">Manejo de Residuos Peligrosos?</span>
            </h2>
          }
        />

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3 lg:grid-cols-4"
          titulo={
            <>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Quién necesita gestionar sus residuos peligrosos?
          </h3>
            </>
          }
          fichas={QUIENES}
        />

        <ServiceGrid
          className="mt-16"
          columnas="sm:grid-cols-3"
          titulo={
            <>
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Qué tipos de residuos peligrosos gestionamos?
          </h3>
            </>
          }
          fichas={TIPOS}
        />
      </div>
    </section>
  );
}

export default RpQueEs;
