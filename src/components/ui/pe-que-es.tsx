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

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el plan,
 *  con el gabinete de extintor y red húmeda; los dos últimos sobre lo que incluye y para
 *  qué sirve, con la señal de salida. */
const bloques = (): BloqueScroll[] => {
  const simulacion = {
    foto: 'gabinete-extintor-red-humeda-plan-emergencia',
    alt: 'Gabinete con señales de extintor y red húmeda, equipamiento que exige el plan de emergencia y evacuación',
  };
  const salida = {
    foto: 'senal-salida-evacuacion-plan-emergencia',
    alt: 'Letrero de salida sobre un pasillo, vía de evacuación señalizada según el plan de emergencia y evacuación',
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
        'Incluye la definición de rutas de evacuación, puntos de reunión, asignación de roles y responsabilidades, sistemas de comunicación y medidas de protección orientadas a una evacuación rápida, organizada y segura.',
      ...salida,
    },
    {
      texto:
        'Su correcta implementación es fundamental para cumplir con la normativa vigente, prevenir sanciones, proteger a los trabajadores y asegurar la continuidad operativa de la empresa.',
      ...salida,
    },
  ];
};

const QUIENES: Ficha[] = [
  { nombre: 'Fábricas e industrias', icono: FactoryIcon },
  { nombre: 'Bodegas y almacenes', icono: WarehouseIcon },
  { nombre: 'Edificios de oficinas', icono: Building2Icon },
  { nombre: 'Centros comerciales', icono: StoreIcon },
  { nombre: 'Centros logísticos', icono: TruckIcon },
  { nombre: 'Instalaciones con inflamables', icono: FlameIcon },
  { nombre: 'Talleres industriales', icono: WrenchIcon },
  { nombre: 'Lugares con alta concurrencia', icono: UsersIcon },
];

const EMERGENCIAS: Ficha[] = [
  { nombre: 'Incendios', icono: FlameIcon },
  { nombre: 'Terremotos', icono: ActivityIcon },
  { nombre: 'Derrames de sustancias peligrosas', icono: DropletsIcon },
  { nombre: 'Amenazas externas', icono: ShieldAlertIcon },
  { nombre: 'Accidentes industriales', icono: HardHatIcon },
  { nombre: 'Emergencias climáticas', icono: CloudLightningIcon },
];


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

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3 lg:grid-cols-4"
          titulo={
            <>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Quién necesita un Plan de Emergencia y Evacuación?
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
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Qué tipos de emergencias cubre?
          </h3>
            </>
          }
          fichas={EMERGENCIAS}
        />
      </div>
    </section>
  );
}

export default PeQueEs;
