'use client';

/**
 * «¿Qué es un Plan de Emergencia y Evacuación Industrial?», «¿Quién necesita
 * un Plan de Emergencia y Evacuación?» y «¿Qué tipos de emergencias cubre?»,
 * con el mismo formato que la CTI y el ECC (cti-que-es.tsx, ecc-que-es.tsx):
 * la definición con la foto fija al lado y debajo los ocho tipos de
 * instalación y las seis emergencias. Texto idéntico al WordPress.
 */
import {
  ActivityIcon,
  Building2Icon,
  CloudLightningIcon,
  DropletsIcon,
  FactoryIcon,
  FlameIcon,
  HardHatIcon,
  ShieldAlertIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon,
  WarehouseIcon,
  WrenchIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el plan,
 *  con la simulación de incendio; los dos últimos sobre lo que incluye y para
 *  qué sirve, con la señal de salida de emergencia (las dos fotos y sus alt
 *  son las del WordPress). */
const bloques = (): BloqueScroll[] => {
  const simulacion = {
    foto: 'simulacro-incendio-extintor-plan-de-emergencia',
    alt: 'Simulacro de incendio con extintor en una capacitación del plan de emergencia y evacuación',
  };
  const salida = {
    foto: 'senal-salida-emergencia-evacuacion',
    alt: 'Señal de salida de emergencia en una instalación industrial con plan de evacuación',
  };
  return [
    {
      texto:
        'El Plan de Emergencia y Evacuación Industrial es un documento técnico que establece los procedimientos, protocolos y acciones necesarias para proteger la vida de las personas y la integridad de las instalaciones ante situaciones de riesgo.',
      ...simulacion,
    },
    {
      texto:
        'Este plan se desarrolla a partir de un análisis detallado de riesgos específicos de cada instalación, identificando amenazas como incendios, terremotos, derrames de sustancias peligrosas, accidentes industriales y otras emergencias potenciales.',
      ...simulacion,
    },
    {
      texto:
        'Incluye la definición de rutas de evacuación, puntos de reunión, asignación de roles y responsabilidades, sistemas de comunicación y medidas de protección que garantizan una evacuación rápida, organizada y segura.',
      ...salida,
    },
    {
      texto:
        'Su correcta implementación es fundamental para cumplir con la normativa vigente, prevenir sanciones, proteger a los trabajadores y asegurar la continuidad operativa de la empresa.',
      ...salida,
    },
  ];
};

const QUIENES = [
  { texto: 'Fábricas e industrias', icono: FactoryIcon },
  { texto: 'Bodegas y almacenes', icono: WarehouseIcon },
  { texto: 'Edificios de oficinas', icono: Building2Icon },
  { texto: 'Centros comerciales', icono: StoreIcon },
  { texto: 'Centros logísticos', icono: TruckIcon },
  { texto: 'Instalaciones con inflamables', icono: FlameIcon },
  { texto: 'Talleres industriales', icono: WrenchIcon },
  { texto: 'Lugares con alta concurrencia', icono: UsersIcon },
];

const EMERGENCIAS = [
  { texto: 'Incendios', icono: FlameIcon },
  { texto: 'Terremotos', icono: ActivityIcon },
  { texto: 'Derrames de sustancias peligrosas', icono: DropletsIcon },
  { texto: 'Amenazas externas', icono: ShieldAlertIcon },
  { texto: 'Accidentes industriales', icono: HardHatIcon },
  { texto: 'Emergencias climáticas', icono: CloudLightningIcon },
];

const ficha =
  'flex items-center gap-3 rounded-xl border border-border bg-hoja p-4 transition-colors duration-200 hover:border-black/30';

export function PeQueEs({ base = '' }: { base?: string }) {
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
              ¿Qué es un <span className="font-black text-svea">Plan de Emergencia y Evacuación Industrial?</span>
            </h2>
          }
        />

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita un Plan de Emergencia y Evacuación?
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
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Qué tipos de emergencias cubre?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EMERGENCIAS.map(({ texto, icono: Icono }) => (
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

export default PeQueEs;
