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

import { Reveal } from '@/components/ui/reveal';
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

/** Los cuatro párrafos del original: los dos primeros sobre qué es y la
 *  normativa, con la bodega de residuos; los dos últimos sobre los riesgos y
 *  el servicio, con los contenedores IBC (las dos fotos del WordPress). */
const bloques = (base: string): BloqueScroll[] => {
  const bodega = {
    media: `${base}/img/rp/warehousing-hazardous-waste-storage.webp`,
    alt: 'Almacenamiento de residuos peligrosos bajo normativa - SVEA Consultores',
  };
  const contenedores = {
    media: `${base}/img/rp/gaseous-substances-container-row.webp`,
    alt: 'Contenedores IBC con sustancias químicas bajo normativa chilena - SVEA Consultores',
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

const QUIENES = [
  { texto: 'Fábricas e industrias', icono: FactoryIcon },
  { texto: 'Laboratorios', icono: FlaskConicalIcon },
  { texto: 'Talleres mecánicos', icono: WrenchIcon },
  { texto: 'Centros de salud', icono: HospitalIcon },
  { texto: 'Estaciones de servicio', icono: FuelIcon },
  { texto: 'Bodegas de químicos', icono: WarehouseIcon },
  { texto: 'Empresas de construcción', icono: HardHatIcon },
  { texto: 'Transportistas de RESPEL', icono: TruckIcon },
];

const TIPOS = [
  { texto: 'Inflamables (solventes, combustibles)', icono: FlameIcon },
  { texto: 'Tóxicos (metales pesados, pesticidas)', icono: SkullIcon },
  { texto: 'Corrosivos (ácidos, bases)', icono: TestTubeIcon },
  { texto: 'Reactivos (oxidantes, peróxidos)', icono: ZapIcon },
  { texto: 'Aceites usados e hidrocarburos', icono: DropletIcon },
  { texto: 'Residuos industriales mixtos', icono: LayersIcon },
];

const ficha =
  'flex items-center gap-3 rounded-xl border border-border bg-hoja p-4 transition-colors duration-200 hover:border-black/30';

export function RpQueEs({ base = '' }: { base?: string }) {
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
              ¿Qué es el <span className="font-black text-svea">Manejo de Residuos Peligrosos?</span>
            </h2>
          }
        />

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita gestionar sus residuos peligrosos?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUIENES.map(({ texto, icono: Icono }) => (
              <li key={texto} className={ficha}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-svea">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-black">{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Qué tipos de residuos peligrosos gestionamos?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIPOS.map(({ texto, icono: Icono }) => (
              <li key={texto} className={ficha}>
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

export default RpQueEs;
