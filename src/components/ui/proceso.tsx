'use client';

/**
 * «¿Cómo Trabajamos?», con la forma de la sección «Issues» de arup.com.
 *
 * Escritorio (lg+), medido sobre arup.com a 1440 px: fondo negro, 64 px
 * arriba y abajo, 32 px a los lados; el titular a la izquierda y las flechas
 * arriba a la derecha; las tarjetas de 600 px de alto y un tercio
 * del ancho (24 px entre ellas, esquinas de 12 px), con la foto dentro de un
 * círculo de 680 px que empieza a 220 px del borde de arriba y se sale por
 * abajo y por el lado. Como aquí son cinco pasos y no tres, la fila se
 * desliza de lado (con las flechas, el trackpad o el dedo) y encaja cada
 * tarjeta.
 *
 * Teléfono y tablet: la versión apilada, una franja por paso con la foto en
 * un cuarto de elipse a la derecha, como la de Arup en el teléfono.
 *
 * Rompe a propósito con el resto de la portada (fondo claro, tarjetas
 * blancas con icono): aquí mandan el color y las fotos.
 *
 * - Los títulos van en Manrope, la fuente de titulares del sitio.
 * - Las fotos salen del sistema de fotos del sitio (<picture> AVIF/WebP,
 *   carga diferida). El recorte es `border-top-left-radius: 100%`: CSS, sin
 *   JavaScript ni máscaras.
 * - Los cinco títulos y descripciones son los de siempre (PASOS de
 *   integration-card), y también el cierre «Informe técnico listo en 3-5
 *   días hábiles · Cotización en menos de 24 horas».
 * - Entrada con Reveal: el HTML llega con todo visible.
 */

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useRef } from 'react';

import { Foto } from '@/components/ui/foto';
import { PASOS } from '@/components/ui/integration-card';
import { Reveal } from '@/components/ui/reveal';
import { cn, rangosHtml } from '@/lib/utils';

/** Color de fondo, color del texto y foto de cada paso, en el orden de PASOS. */
/** Un paso con su franja: el texto, el color y la foto. */
export type PasoFranja = {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  fondo: string;
  claro: boolean;
  foto: string;
  alt: string;
};

/** Los cinco colores de las franjas, en orden; se comparten entre páginas. */
export const COLORES_FRANJA = [
  { fondo: 'bg-[#0e7a3c]', claro: false },
  { fondo: 'bg-[#6bbf3b]', claro: true },
  { fondo: 'bg-[#2b7a8c]', claro: false },
  { fondo: 'bg-[#d08a2e]', claro: true },
  { fondo: 'bg-[#e9efe6]', claro: true },
];

const FRANJAS: Record<string, { fondo: string; claro: boolean; foto: string; alt: string }> = {
  cotizacion: {
    fondo: 'bg-[#0e7a3c]',
    claro: false,
    foto: 'firma-solicitud-seremi-en-linea',
    alt: 'Firma de una solicitud en línea para la cotización del trámite',
  },
  diagnostico: {
    fondo: 'bg-[#6bbf3b]',
    claro: true,
    foto: 'inspeccion-bodega-calificacion-tecnica-industrial',
    alt: 'Inspección técnica de una bodega para evaluar sus requerimientos',
  },
  desarrollo: {
    fondo: 'bg-[#2b7a8c]',
    claro: false,
    foto: 'preparacion-descargos-sumario-sanitario',
    alt: 'Profesional elaborando la documentación técnica sobre su escritorio',
  },
  gestion: {
    fondo: 'bg-[#d08a2e]',
    claro: true,
    foto: 'revision-expediente-observaciones-seremi',
    alt: 'Revisión del expediente en el mesón de la autoridad durante la tramitación',
  },
  entrega: {
    fondo: 'bg-[#e9efe6]',
    claro: true,
    foto: 'tecnicos-casco-revision-calificacion-tecnica-industrial',
    alt: 'Dos técnicos con casco revisan en planta la documentación entregada',
  },
};

/** Dónde cae el círculo de la foto en escritorio: dos posiciones que se turnan, como en Arup. */
const CIRCULO = ['lg:left-[46px]', 'lg:-left-[78px]'];
/**
 * La foto no llena el círculo de 680 px: de él sólo se ve la parte que cae
 * dentro de la tarjeta (su ancho × 380 px). La foto se dibuja justo en esa
 * ventana, corrida lo contrario que el círculo, así se ve encuadrada entera
 * y no un rincón ampliado. El ancho de la tarjeta es un tercio del
 * contenedor (1376 px como mucho, 32 px de margen, 24 px entre tarjetas).
 */
const VENTANA = ['lg:left-[-46px]', 'lg:left-[78px]'];
const ANCHO_TARJETA = 'lg:w-[min(443px,calc((100vw-112px)/3))]';

export function PasoAPaso({
  base = '',
  id,
  copete,
  titulo,
  parrafo,
  linea,
  pasos,
}: {
  base?: string;
  /** el id de la sección; el del titular es `titulo-<id>` */
  id: string;
  copete: string;
  titulo: string;
  parrafo?: string;
  linea?: string;
  pasos: PasoFranja[];
}) {
  const fila = useRef<HTMLOListElement>(null);
  const mover = (lado: 1 | -1) => {
    const el = fila.current;
    if (!el) return;
    const tarjeta = el.querySelector('li');
    const paso = tarjeta ? tarjeta.getBoundingClientRect().width + 24 : el.clientWidth / 3;
    el.scrollBy({ left: lado * paso, behavior: 'smooth' });
  };

  return (
    <section className="bg-black px-6 py-20 text-white lg:px-8 lg:py-16" id={id} aria-labelledby={`titulo-${id}`}>
      <div className="mx-auto max-w-[1376px]">
        <Reveal className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-[793px]">
            <p className="text-sm font-medium text-white/60">{copete}</p>
            <h2
              id={`titulo-${id}`}
              className="mt-3 font-[Manrope,Inter,sans-serif] text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-white md:text-6xl lg:text-[68px] lg:leading-[1.1]"
            >
              {titulo}
            </h2>
            {parrafo && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{parrafo}</p>}
            {linea && (
              <p
                className="mt-4 text-sm leading-6 text-white/60"
                dangerouslySetInnerHTML={{ __html: rangosHtml(linea) }}
              />
            )}
          </div>
          <div className="hidden">
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Ver pasos anteriores"
              className="hidden size-11 place-items-center rounded-full border border-white/50 bg-transparent text-white transition-colors hover:border-white hover:bg-white hover:text-black lg:grid"
            >
              <ArrowLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Ver pasos siguientes"
              className="hidden size-11 place-items-center rounded-full border border-white/50 bg-transparent text-white transition-colors hover:border-white hover:bg-white hover:text-black lg:grid"
            >
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <ol
          ref={fila}
          className={cn(
            // 29-sep: en escritorio los cinco pasos a la vista (antes un carrusel
            // mostraba tres y escondía el 4 y el 5 detrás de las flechas)
            'mt-12 space-y-5 lg:mt-10 lg:grid lg:grid-cols-5 lg:gap-4 lg:space-y-0',
          )}
        >
          {pasos.map((paso, i) => {
            const f = paso;
            const tinta = f.claro ? 'text-black' : 'text-white';
            return (
              <Reveal
                as="li"
                key={paso.id}
                delay={i * 0.06}
                className={cn(
                  'group/franja relative isolate flex min-h-[230px] overflow-hidden rounded-2xl sm:min-h-[260px]',
                  'lg:h-[560px] lg:min-h-0 lg:rounded-xl',
                  f.fondo,
                )}
              >
                <div className={cn('relative z-10 flex w-[62%] flex-col p-7 sm:w-[60%] sm:p-9 lg:w-full lg:p-6', tinta)}>
                  <p className={cn('text-sm font-medium lg:text-base', f.claro ? 'text-black/70' : 'text-white')}>
                    Paso {paso.numero}
                  </p>
                  <h3 className="mt-4 font-[Manrope,Inter,sans-serif] text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.4rem] lg:mt-5 lg:text-[26px]">
                    {paso.titulo}
                  </h3>
                  <p className={cn('mt-3 text-base leading-relaxed lg:max-w-[340px]', f.claro ? 'text-black/75' : 'text-white')}>
                    <span dangerouslySetInnerHTML={{ __html: rangosHtml(paso.descripcion) }} />
                  </p>
                </div>
                <div
                  className={cn(
                    'absolute bottom-0 right-0 h-[88%] w-[42%] overflow-hidden rounded-tl-[100%] sm:w-[38%]',
                    'lg:bottom-auto lg:right-auto lg:top-[260px] lg:size-[680px] lg:rounded-full',
                    CIRCULO[i % 2],
                  )}
                >
                  <Foto
                    nombre={f.foto}
                    alt={f.alt}
                    tamano="(min-width: 1024px) 443px, 40vw"
                    base={base}
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-500 ease-out group-hover/franja:scale-105 motion-reduce:transition-none',
                      'lg:absolute lg:top-0 lg:h-[380px] lg:max-w-none',
                      ANCHO_TARJETA,
                      VENTANA[i % 2],
                    )}
                  />
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** «¿Cómo Trabajamos?» de la portada. */
export function Proceso({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="proceso"
      copete="Proceso simple y transparente"
      titulo="¿Cómo Trabajamos?"
      parrafo="Desde la cotización hasta la resolución de la autoridad, gestionamos todo el proceso para que tú te concentres en tu negocio."
      linea="Informe técnico listo en 3-5 días hábiles · Cotización en menos de 24 horas"
      pasos={PASOS.map((p) => ({ ...p, ...FRANJAS[p.id] }))}
    />
  );
}

export default Proceso;
