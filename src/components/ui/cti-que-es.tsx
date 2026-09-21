'use client';

/**
 * «¿Qué es la CTI?» y «¿Quién necesita una CTI?», que en el WordPress eran
 * dos secciones seguidas y aquí van en una: la definición a la izquierda con
 * su foto a la derecha, y debajo los ocho tipos de empresa.
 *
 * Son el mismo tema —qué es esto y a quién le aplica—, y juntarlas ahorra un
 * encabezado y un salto de sección sin quitar una palabra: los cuatro
 * párrafos y los ocho tipos están completos y con el mismo texto.
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

import { Reveal } from '@/components/ui/reveal';

const PARRAFOS = [
  'La Calificación Técnica Industrial (CTI) es un informe fundamental emitido por la SEREMI de Salud, cuyo objetivo es certificar que una industria, empresa o establecimiento cumple con los requisitos normativos, técnicos y territoriales necesarios para operar legalmente dentro de una comuna.',
  'Este documento es clave para demostrar que la actividad se encuentra correctamente emplazada, de acuerdo con el uso de suelo establecido por el Plan Regulador Comunal, y que su funcionamiento no representa riesgos sanitarios o ambientales para la comunidad.',
  'En SVEA Consultores nos encargamos de evaluar detalladamente las características de tu infraestructura, levantamos toda la información requerida y preparamos el expediente técnico completo que exige la SEREMI de Salud. Además, gestionamos directamente la tramitación del informe, representándote ante la autoridad sanitaria y facilitando la regularización de tu actividad.',
  'Ya sea que estés comenzando un proyecto o necesites regularizar una instalación existente, te ayudamos a cumplir con la normativa de forma segura, ágil y con respaldo profesional. También gestionamos la calificación como actividad inofensiva ante la SEREMI de Salud (Circular B32/04).',
];

const QUIENES = [
  { texto: 'Fábricas e industrias', icono: FactoryIcon },
  { texto: 'Bodegas y centros de distribución', icono: WarehouseIcon },
  { texto: 'Talleres mecánicos e industriales', icono: WrenchIcon },
  { texto: 'Empresas con modificaciones', icono: BuildingIcon },
  { texto: 'Locales comerciales regulados', icono: StoreIcon },
  { texto: 'Centros de almacenamiento', icono: PackageIcon },
  { texto: 'Cambios de giro o ampliaciones', icono: RefreshCwIcon },
  { texto: 'Actividades inofensivas (B32/04)', icono: LeafIcon },
];

export function CtiQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2
              id="titulo-que-es"
              className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              ¿Qué es la <span className="font-black text-svea">Calificación Técnica Industrial?</span>
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-black/75 md:text-lg">
              {PARRAFOS.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <img
              src={`${base}/img/cti/chemical-plant.webp`}
              width={1200}
              height={801}
              loading="lazy"
              alt="Calificación técnica industrial - planta química evaluada por SVEA Consultores"
              className="w-full rounded-2xl border border-border object-cover shadow-[0_18px_40px_-24px_rgba(0,0,0,0.3)]"
            />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita una Calificación Técnica Industrial?
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

export default CtiQueEs;
