'use client';

/**
 * «Sigue por aquí», con las tarjetas con foto de fondo de la CTI y el ECC
 * (TarjetaFoto). Todos los enlaces y textos del original se conservan: los
 * que eran varios destinos en una tarjeta van como píldoras dentro de ella.
 */

import { BookOpenIcon, ShieldAlertIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

const GUIAS = [
  { texto: 'Guía: autorización de transporte de residuos peligrosos (RESPEL) y no peligrosos', ruta: '/autorizacion-transporte-residuos-chile/' },
  { texto: 'Guía: transporte de residuos no peligrosos, paso a paso', ruta: '/autorizacion-transporte-residuos-no-peligrosos/' },
];

const ENLACES = [
  { texto: 'Manejo de Residuos Peligrosos', ruta: '/manejo-de-residuos-peligrosos/' },
  { texto: 'Calificación Técnica Industrial', ruta: '/calificacion-tecnica-industrial/' },
  { texto: 'Plan de Emergencia Industrial', ruta: '/planes-de-emergencia-y-evacuacion/' },
];

export function TrSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <TarjetaFoto
              base={base}
              foto="operario-bodega-residuos-peligrosos"
              alt="Operario en una bodega que genera residuos peligrosos"
              icono={ShieldAlertIcon}
              pildora="Servicios complementarios"
              titulo="¿Generas residuos peligrosos en tu instalación?"
              verificado
              acciones={ENLACES.map(({ texto, ruta }) => ({ texto, href: `${base}${ruta}` }))}
              arriba="pt-14"
            >
              Si tu empresa genera residuos peligrosos, también necesitas un{' '}
              <strong className="font-semibold text-black">Plan de Manejo de Residuos Peligrosos</strong> conforme
              al D.S. 43 y D.S. 148. Además, podemos ayudarte con la{' '}
              <strong className="font-semibold text-black">Calificación Técnica Industrial</strong> y{' '}
              <strong className="font-semibold text-black">Planes de Emergencia</strong>.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              base={base}
              foto="tambores-azules-residuos-peligrosos-almacenamiento"
              alt="Tambores de residuos peligrosos listos para su transporte autorizado"
              icono={BookOpenIcon}
              pildora="Guía completa en nuestro blog"
              titulo="Guías para entender el trámite"
              acciones={GUIAS.map(({ texto, ruta }) => ({ texto, href: `${base}${ruta}` }))}
              arriba="pt-40"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default TrSiguiente;
