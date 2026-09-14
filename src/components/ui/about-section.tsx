'use client';

/**
 * «Lo que nos diferencia» — la sexta sección de la home, sobre el
 * about-section de 21st.dev, con su composición: el rótulo y las redes
 * flotando sobre la foto, la foto recortada con el clip-path y su muesca, la
 * fila de cifras que se mete en esa muesca, y abajo el titular con dos
 * columnas de texto y una tercera con la firma y el botón.
 *
 * Qué cambia respecto del original, y por qué:
 *
 * 1. Una sola red, no cuatro. SVEA tiene LinkedIn y nada más; poner iconos de
 *    Facebook, Instagram y YouTube que no llevan a ninguna parte es peor que
 *    no ponerlos.
 * 2. La foto es la de consultoría del propio sitio, no la del demo.
 * 3. Las cifras son las del sitio: +250 empresas, 5-10 días hábiles, 100% de
 *    aprobación y 24 hrs de cotización. Ninguna está inventada ni repetida.
 * 4. El acento es negro, no rojo, como el resto de la home.
 * 5. La segunda columna de texto son las tres ventajas del sitio actual. El
 *    demo lleva dos párrafos; aquí el segundo hueco lo ocupa esa lista, que
 *    es el contenido que esta sección tiene de verdad.
 * 6. Los retrasos bajan de 0,4 s por elemento a 0,12: con dieciséis elementos,
 *    los del original serían seis segundos hasta el último.
 * 7. El titular espera a que la sección asome. El original arranca al montar
 *    y además con `delay: 3`, así que aquí abajo no se vería nunca.
 *
 * Los textos son los del sitio actual, palabra por palabra.
 */

import { ArrowRight } from 'lucide-react';
import * as React from 'react';

import { TimelineContent } from '@/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';

const FOTO =
  'https://sveaconsultores.cl/wp-content/uploads/2025/03/group-of-business-advisor-showing-plan-of-investment-to-clients-in-the-consultancy-office.jpg';

const VENTAJAS = [
  {
    title: 'Cotización en menos de 24 horas',
    body: 'Recibe tu propuesta detallada por email automáticamente.',
  },
  {
    title: 'Seguimiento por WhatsApp',
    body: 'Te mantenemos informado del avance de tu trámite en tiempo real.',
  },
  {
    title: 'Gestión Completa ante la Autoridad',
    body: 'Nos encargamos de todo el proceso, desde el informe hasta la aprobación final.',
  },
];

export function AboutSection({ base = '' }: { base?: string }) {
  const refSeccion = React.useRef<HTMLElement>(null);
  const [enVista, setEnVista] = React.useState(false);

  React.useEffect(() => {
    const nodo = refSeccion.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEnVista(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const revealVariants = {
    hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.12, duration: 0.5 },
    }),
  };

  const scaleVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.12, duration: 0.5 },
    }),
  };

  return (
    <section ref={refSeccion} className="bg-[#f9f9f9] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Rótulo y red social, flotando sobre la foto */}
          <div className="absolute -top-3 z-10 mb-8 flex w-[85%] items-center justify-between sm:-top-2 md:top-0 lg:top-4">
            <div className="flex items-center gap-2 text-xl">
              <span aria-hidden="true" className="animate-spin text-black motion-reduce:animate-none">
                ✱
              </span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="text-sm font-medium uppercase tracking-[0.12em] text-black/60"
              >
                Lo que nos diferencia
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                href="https://www.linkedin.com/company/svea-consultores/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SVEA Consultores en LinkedIn"
                className="flex h-5 w-5 items-center justify-center rounded-lg border border-black/10 bg-black/[0.04] text-black transition-colors hover:border-black/30 sm:h-6 sm:w-6 md:h-8 md:w-8"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 md:size-4" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.4 9.5h5.16V21H2.4V9.5zM9.9 9.5h4.95v1.57h.07c.69-1.24 2.38-2.55 4.9-2.55 5.24 0 6.2 3.3 6.2 7.6V21h-5.16v-4.84c0-1.15-.02-2.64-1.65-2.64-1.66 0-1.91 1.26-1.91 2.56V21H9.9V9.5z" />
                </svg>
              </TimelineContent>
            </div>
          </div>

          {/* La foto, recortada con la muesca donde entran las cifras */}
          <TimelineContent
            as="figure"
            animationNum={2}
            timelineRef={refSeccion}
            customVariants={scaleVariants}
            className="group relative m-0"
          >
            <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40" role="img" aria-label="Equipo de SVEA Consultores revisando un proyecto">
              <defs>
                <clipPath id="svea-recorte" clipPathUnits="objectBoundingBox">
                  <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
                </clipPath>
              </defs>
              <image
                clipPath="url(#svea-recorte)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                href={FOTO}
              />
            </svg>
          </TimelineContent>

          {/* Las cifras: las dos de la izquierda bajo la foto, las otras dos en la muesca */}
          <div className="flex flex-wrap items-center justify-between py-3 text-sm lg:justify-start">
            <TimelineContent
              as="div"
              animationNum={3}
              timelineRef={refSeccion}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-black">+250</span>
                <span className="text-black/60">empresas atendidas</span>
                <span className="text-black/20">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-black">5-10</span>
                <span className="text-black/60">días hábiles</span>
              </div>
            </TimelineContent>

            <div className="bottom-16 right-0 flex flex-row-reverse flex-wrap items-baseline gap-x-4 gap-y-1 lg:absolute lg:flex-col lg:flex-nowrap lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 whitespace-nowrap text-lg sm:text-3xl lg:text-4xl"
              >
                <span className="font-semibold text-black">100%</span>
                <span className="uppercase text-black/60">aprobación</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 whitespace-nowrap text-xs sm:text-base"
              >
                <span className="font-bold text-black">24 hrs</span>
                <span className="text-black/60">de cotización</span>
                <span className="block text-black/20 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* El cuerpo */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-8 text-2xl font-semibold !leading-[110%] text-black sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse
                arranca={enVista}
                transition={{ type: 'spring', stiffness: 250, damping: 30, delay: 0.3 }}
              >
                Cotización Automática y Seguimiento Digital
              </VerticalCutReveal>
            </h2>

            <div className="grid gap-8 text-black/70 md:grid-cols-2">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="leading-relaxed">
                  Somos la única consultora ambiental en Chile con cotización automática en menos
                  de 24 horas y seguimiento digital de tu trámite. Sin llamadas de seguimiento, sin
                  incertidumbre.
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="flex flex-col gap-4 text-xs sm:text-sm"
              >
                {VENTAJAS.map((v) => (
                  <div key={v.title}>
                    <h3 className="font-bold tracking-tight text-black">{v.title}</h3>
                    <p className="mt-0.5 leading-relaxed text-black/60">{v.body}</p>
                  </div>
                ))}
              </TimelineContent>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={8}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="mb-2 text-2xl font-bold text-black"
              >
                SVEA CONSULTORES
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="mb-8 text-sm text-black/60"
              >
                Consultoría Ambiental | Cumplimiento Normativo
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="mb-4 font-medium text-black">Cotización en menos de 24 horas</p>
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={11}
                timelineRef={refSeccion}
                customVariants={revealVariants}
                href={`${base}/#form-home`}
                className="ml-auto flex w-fit items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3 font-semibold text-white no-underline shadow-lg shadow-neutral-900/25 transition-all duration-300 ease-in-out hover:gap-4 hover:bg-neutral-950"
              >
                SOLICITAR COTIZACIÓN <ArrowRight className="size-5" aria-hidden="true" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
