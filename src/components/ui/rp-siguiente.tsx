'use client';

/**
 * «Sigue por aquí», con las tarjetas con foto de fondo de la CTI y el ECC
 * (TarjetaFoto). Todos los enlaces y textos del original se conservan: los
 * que eran varios destinos en una tarjeta van como píldoras dentro de ella.
 */

import { BookOpenIcon, TruckIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

const COMPLEMENTARIOS = [
  { texto: 'Transporte de Residuos', ruta: '/autorizacion-de-transporte-de-residuos/' },
  { texto: 'Calificación Técnica Industrial', ruta: '/calificacion-tecnica-industrial/' },
  { texto: 'Plan de Emergencia Industrial', ruta: '/planes-de-emergencia-y-evacuacion/' },
];

export function RpSiguiente({ base = '' }: { base?: string }) {
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
              foto="camion-tolva-carga-planta-residuos"
              alt="Camión cargando residuos en una planta para su traslado a destino autorizado"
              icono={TruckIcon}
              pildora="Servicios complementarios"
              titulo="¿Necesitas también transportar residuos peligrosos?"
              verificado
              acciones={COMPLEMENTARIOS.map(({ texto, ruta }) => ({ texto, href: `${base}${ruta}` }))}
              arriba="pt-14"
            >
              Si tu empresa genera residuos que deben ser trasladados a un destino autorizado,
              necesitas la Autorización de Transporte de Residuos. También podemos ayudarte con
              Calificación Técnica Industrial y Planes de Emergencia.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              href={`${base}/manejo-de-residuos-peligrosos-chile/`}
              base={base}
              foto="tambores-bodega-residuos-peligrosos"
              alt="Tambores de residuos peligrosos almacenados en bodega"
              icono={BookOpenIcon}
              pildora="Guía completa"
              titulo="Manejo de residuos peligrosos en Chile"
              boton="Leer guía"
              arriba="pt-40"
            >
              Para conocer en detalle la normativa, obligaciones de declaración SIDREP, sanciones
              y todo lo que tu empresa necesita saber, revisa nuestra guía completa sobre manejo de
              residuos peligrosos en Chile.
            </TarjetaFoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default RpSiguiente;
