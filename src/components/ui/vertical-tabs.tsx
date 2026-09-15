'use client';

/**
 * «¿Cómo Trabajamos?» — los cinco pasos como pestañas verticales con foto.
 *
 * Adaptado del componente de 21st.dev. Seis cambios:
 *
 * 1. Las dos flechas usan lucide-react, que el proyecto ya trae, en vez de
 *    @hugeicons/react y @hugeicons/core-free-icons. Son dos iconos: no
 *    justifican dos paquetes nuevos.
 * 2. Cinco pasos en vez de tres, con los textos del sitio actual palabra por
 *    palabra.
 * 3. Las descripciones no se desmontan al cambiar de paso. El original las
 *    monta y desmonta con AnimatePresence, así que las cuatro que no están
 *    activas desaparecen del HTML y Google no las ve. Aquí viven siempre y
 *    sólo se les anima el alto.
 * 4. Con `prefers-reduced-motion` no hay avance solo ni deslizamiento: las
 *    fotos se cambian a mano y aparecen sin moverse. Un carrusel que avanza
 *    cada cinco segundos es justo lo que esa preferencia existe para evitar.
 * 5. El avance automático se detiene cuando la sección no está en pantalla.
 * 6. Las pestañas llevan `aria-current` y la lista se anuncia como tal.
 *
 * Las fotos son las que entregó SVEA, una por paso, convertidas a WebP de
 * 1600 px: los originales pesaban 3,2 MB cada uno y quedaron entre 88 y
 * 130 KB. La del paso activo carga de inmediato; las otras cuatro esperan.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const PASOS = [
  {
    id: '01',
    title: 'Cotización',
    description: 'Recibe tu cotización en menos de 24 horas',
    foto: '/img/proceso/01-cotizacion.webp',
    alt: 'Profesional recibiendo la cotización por correo en su computador',
  },
  {
    id: '02',
    title: 'Diagnóstico',
    description: 'Evaluamos tu caso y requerimientos específicos',
    foto: '/img/proceso/02-diagnostico.webp',
    alt: 'Dos profesionales de SVEA revisando los planos y requisitos de un proyecto',
  },
  {
    id: '03',
    title: 'Desarrollo',
    description: 'Elaboramos la documentación técnica en 5-10 días hábiles',
    foto: '/img/proceso/03-desarrollo.webp',
    alt: 'Profesional de SVEA elaborando la documentación técnica sobre los planos',
  },
  {
    id: '04',
    title: 'Gestión',
    description: 'Tramitamos ante la autoridad competente',
    foto: '/img/proceso/04-gestion.webp',
    alt: 'Entrega del expediente en la ventanilla de la autoridad',
  },
  {
    id: '05',
    title: 'Entrega',
    description: 'Recibes tu documentación aprobada',
    foto: '/img/proceso/05-entrega.webp',
    alt: 'Entrega de la carpeta con la documentación aprobada al cliente',
  },
];

const DURACION = 5000;

export function VerticalTabs({ base = '' }: { base?: string }) {
  const [activo, setActivo] = React.useState(0);
  const [sentido, setSentido] = React.useState(0);
  const [pausado, setPausado] = React.useState(false);
  const [enVista, setEnVista] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);
  const reducido = useReducedMotion();

  const siguiente = React.useCallback(() => {
    setSentido(1);
    setActivo((p) => (p + 1) % PASOS.length);
  }, []);

  const anterior = React.useCallback(() => {
    setSentido(-1);
    setActivo((p) => (p - 1 + PASOS.length) % PASOS.length);
  }, []);

  function elegir(i: number) {
    if (i === activo) return;
    setSentido(i > activo ? 1 : -1);
    setActivo(i);
    setPausado(false);
  }

  // el avance automático sólo corre mientras la sección se ve
  React.useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), {
      threshold: 0.25,
    });
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  React.useEffect(() => {
    if (pausado || reducido || !enVista) return;
    const reloj = setInterval(siguiente, DURACION);
    return () => clearInterval(reloj);
  }, [activo, pausado, reducido, enVista, siguiente]);

  const variantes = {
    entra: (s: number) => ({ y: s > 0 ? '-100%' : '100%', opacity: 0 }),
    centro: { zIndex: 1, y: 0, opacity: 1 },
    sale: (s: number) => ({ zIndex: 0, y: s > 0 ? '100%' : '-100%', opacity: 0 }),
  };

  const variantesQuietas = {
    entra: { opacity: 0 },
    centro: { zIndex: 1, opacity: 1 },
    sale: { zIndex: 0, opacity: 0 },
  };

  return (
    <section ref={ref} className="w-full bg-white py-8 md:py-16 lg:py-24" id="proceso" aria-labelledby="titulo-proceso">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* El encabezado va centrado y sobre las dos columnas, como en el resto
            de la home. El original lo mete en la columna izquierda, encima de
            las pestañas: aquí sería la única sección con el titular a un lado. */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Proceso simple y transparente
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h2
            id="titulo-proceso"
            className="mb-4 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
          >
            ¿Cómo <span className="font-black text-svea">Trabajamos?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-black/75 md:text-lg">
            Desde la cotización hasta la resolución aprobada, gestionamos todo el proceso para que
            tú te concentres en tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Izquierda: los cinco pasos */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5">
            <ol className="flex flex-col space-y-0">
              {PASOS.map((paso, i) => {
                const esActivo = activo === i;
                return (
                  <li key={paso.id} className="contents">
                    <button
                      type="button"
                      onClick={() => elegir(i)}
                      aria-current={esActivo ? 'step' : undefined}
                      className={cn(
                        'group relative flex items-start gap-4 border-t border-border py-6 text-left transition-all duration-500 first:border-0 md:py-8',
                        esActivo ? 'text-black' : 'text-black/45 hover:text-black',
                      )}
                    >
                      {/* la barra de avance: se llena en los cinco segundos */}
                      <div className="absolute bottom-0 left-[-16px] top-0 w-[2px] bg-border md:left-[-24px]">
                        {esActivo && !reducido && (
                          <motion.div
                            key={`avance-${i}-${pausado}-${enVista}`}
                            className="absolute left-0 top-0 w-full origin-top bg-svea"
                            initial={{ height: '0%' }}
                            animate={pausado || !enVista ? { height: '0%' } : { height: '100%' }}
                            transition={{ duration: DURACION / 1000, ease: 'linear' }}
                          />
                        )}
                        {esActivo && reducido && (
                          <div className="absolute left-0 top-0 h-full w-full bg-svea" />
                        )}
                      </div>

                      <span className="mt-1 text-[9px] font-medium tabular-nums opacity-50 md:text-[10px]">
                        /{paso.id}
                      </span>

                      {/* min-w-0: sin esto el hijo flexible no puede encogerse por debajo del
                          ancho natural de su contenido y la columna desborda 81 px en
                          el teléfono */}
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="text-2xl font-normal tracking-tight transition-colors duration-500 md:text-3xl lg:text-4xl">
                          {paso.title}
                        </span>

                        {/* la descripción no se desmonta: sólo se le anima el alto,
                            para que los cinco textos vivan siempre en el HTML */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: esActivo ? 'auto' : 0,
                            opacity: esActivo ? 1 : 0,
                          }}
                          transition={{ duration: reducido ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-sm text-balance pb-2 text-sm font-normal leading-relaxed text-black/60 md:text-base">
                            {paso.description}
                          </p>
                        </motion.div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

          </div>

          {/* Derecha: la foto del paso */}
          {/* centrada, no al fondo como el original: con cinco pasos la columna
              de la izquierda es mucho más alta que con tres, y la foto pegada
              abajo dejaba un vacío arriba */}
          <div className="order-1 flex h-full flex-col justify-center lg:order-2 lg:col-span-7">
            <div
              className="relative"
              onMouseEnter={() => setPausado(true)}
              onMouseLeave={() => setPausado(false)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-black/[0.03] md:aspect-[4/3] md:rounded-[2.5rem] lg:aspect-[16/11]">
                <AnimatePresence initial={false} custom={sentido} mode="popLayout">
                  <motion.div
                    key={activo}
                    custom={sentido}
                    variants={reducido ? variantesQuietas : variantes}
                    initial="entra"
                    animate="centro"
                    exit="sale"
                    transition={{
                      y: { type: 'spring', stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                    onClick={siguiente}
                  >
                    <img
                      src={`${base}${PASOS[activo].foto}`}
                      alt={PASOS[activo].alt}
                      width={1600}
                      height={900}
                      className="m-0 block h-full w-full p-0 object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* las cuatro que no se ven se descargan igual, en silencio:
                    así el cambio de paso no parpadea la primera vez */}
                <div aria-hidden="true" className="hidden">
                  {PASOS.map((p, i) =>
                    i === activo ? null : (
                      <img key={p.id} src={`${base}${p.foto}`} alt="" loading="lazy" />
                    ),
                  )}
                </div>

                <div className="absolute bottom-6 right-6 z-20 flex gap-2 md:bottom-8 md:right-8 md:gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      anterior();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/85 text-black backdrop-blur-md transition-all hover:bg-white active:scale-90 md:h-12 md:w-12"
                    aria-label="Paso anterior"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      siguiente();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/85 text-black backdrop-blur-md transition-all hover:bg-white active:scale-90 md:h-12 md:w-12"
                    aria-label="Paso siguiente"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* las dos promesas van centradas bajo las dos columnas: pegadas a la
            izquierda quedaban huérfanas al fondo de la lista */}
        <p className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-bold text-black">
          <span>Informe técnico listo en 5-10 días hábiles</span>
          <span aria-hidden="true" className="font-normal text-black/25">
            ·
          </span>
          <span>Cotización en menos de 24 horas</span>
        </p>
      </div>
    </section>
  );
}

export default VerticalTabs;
