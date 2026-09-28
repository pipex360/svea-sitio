'use client';

/**
 * «¿Cómo Trabajamos?», con la forma de la sección «Issues» de arup.com: fondo
 * negro, el titular y el botón a un lado, y los cinco pasos como franjas de
 * color, cada una con su foto recortada en un cuarto de elipse a la derecha.
 *
 * Rompe a propósito con el resto de la portada (fondo claro, tarjetas
 * blancas con icono): aquí mandan el color y las fotos.
 *
 * - Los títulos de los pasos van en serif (Newsreader 500, un archivo de
 *   24 KB, sólo en esta sección), como en la referencia.
 * - Las fotos salen del sistema de fotos del sitio (<picture> AVIF/WebP,
 *   carga diferida). El recorte es `border-top-left-radius: 100%`: CSS, sin
 *   JavaScript ni máscaras.
 * - Los cinco títulos y descripciones son los de siempre (PASOS de
 *   integration-card), y también el cierre «Informe técnico listo en 3-5
 *   días hábiles · Cotización en menos de 24 horas».
 * - Entrada con Reveal: el HTML llega con todo visible.
 */

import { Foto } from '@/components/ui/foto';
import { PASOS } from '@/components/ui/integration-card';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/** Color de fondo, color del texto y foto de cada paso, en el orden de PASOS. */
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
    foto: 'revision-expediente-observaciones-seremi',
    alt: 'Revisión de la documentación técnica del expediente',
  },
  gestion: {
    fondo: 'bg-[#d08a2e]',
    claro: true,
    foto: 'inspeccion-planta-fiscalizacion-seremi',
    alt: 'Visita de la autoridad a una planta durante la tramitación',
  },
  entrega: {
    fondo: 'bg-[#e9efe6]',
    claro: true,
    foto: 'operarios-grua-horquilla-bodega-calificacion-tecnica',
    alt: 'Operarios trabajando en una bodega con su documentación aprobada',
  },
};

export function Proceso({ base = '' }: { base?: string }) {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28" id="proceso" aria-labelledby="titulo-proceso">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="text-sm font-medium text-white/60">Proceso simple y transparente</p>
          <h2
            id="titulo-proceso"
            className="serif-proceso mt-3 text-5xl leading-[1.02] text-white md:text-7xl lg:text-6xl"
          >
            ¿Cómo Trabajamos?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
            Desde la cotización hasta la resolución aprobada, gestionamos todo el proceso para que tú
            te concentres en tu negocio.
          </p>
          <a
            href={`${base}/#form-home`}
            className="mt-8 inline-flex h-14 items-center rounded-full border border-white/50 px-8 text-lg text-white no-underline transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
          >
            Solicitar cotización
          </a>
          <p className="mt-8 text-sm leading-6 text-white/60">
            Informe técnico listo en 3-5 días hábiles
            <br />
            Cotización en menos de 24 horas
          </p>
        </Reveal>

        <ol className="space-y-5 lg:col-span-8">
          {PASOS.map((paso, i) => {
            const f = FRANJAS[paso.id];
            const tinta = f.claro ? 'text-black' : 'text-white';
            return (
              <Reveal
                as="li"
                key={paso.id}
                delay={i * 0.06}
                className={cn(
                  'group/franja relative isolate flex min-h-[230px] overflow-hidden rounded-2xl sm:min-h-[260px]',
                  f.fondo,
                )}
              >
                <div className={cn('relative z-10 flex w-[62%] flex-col p-7 sm:w-[60%] sm:p-9', tinta)}>
                  <p className={cn('text-sm font-medium', f.claro ? 'text-black/70' : 'text-white/80')}>
                    Paso {paso.numero}
                  </p>
                  <h3 className="serif-proceso mt-4 text-3xl leading-[1.05] sm:text-[2.6rem]">{paso.titulo}</h3>
                  <p className={cn('mt-3 text-base leading-relaxed', f.claro ? 'text-black/75' : 'text-white/85')}>
                    {paso.descripcion}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 right-0 h-[88%] w-[42%] overflow-hidden rounded-tl-[100%] sm:w-[38%]"
                >
                  <Foto
                    nombre={f.foto}
                    alt={f.alt}
                    tamano="(min-width: 1024px) 300px, 40vw"
                    base={base}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/franja:scale-105 motion-reduce:transition-none"
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

export default Proceso;
