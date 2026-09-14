'use client';

/**
 * «Lo que nos diferencia» — la sexta sección de la home, montada sobre el
 * about-section de 21st.dev.
 *
 * Los textos son los del sitio actual, palabra por palabra: el copete, el
 * titular, el párrafo y las tres ventajas con sus descripciones.
 *
 * Lo que se toma del componente original es su manera de aparecer: el titular
 * sube palabra por palabra con `VerticalCutReveal`, y el resto entra
 * escalonado y desenfocándose hacia nítido con `TimelineContent`. Lo demás de
 * aquel bloque —la foto recortada con un clip-path, los cuatro iconos de
 * redes sociales, las estadísticas de una copywriter y su firma— no existe
 * aquí, así que no se copió.
 *
 * Dos de sus tres dependencias no venían en el paquete. `TimelineContent`
 * está escrito a partir de cómo se usaba; `VerticalCutReveal` sí venía, y va
 * adaptado a motion/react.
 *
 * Los retrasos del original son de 0,4 s por elemento: con seis elementos eso
 * son dos segundos y medio hasta que aparece el último. Aquí van a 0,12.
 */

import { ClipboardCheck, MailCheck, MessageCircle } from 'lucide-react';
import * as React from 'react';

import { TimelineContent } from '@/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';

const VENTAJAS = [
  {
    icon: MailCheck,
    title: 'Cotización en menos de 24 horas',
    body: 'Recibe tu propuesta detallada por email automáticamente.',
  },
  {
    icon: MessageCircle,
    title: 'Seguimiento por WhatsApp',
    body: 'Te mantenemos informado del avance de tu trámite en tiempo real.',
  },
  {
    icon: ClipboardCheck,
    title: 'Gestión Completa ante la Autoridad',
    body: 'Nos encargamos de todo el proceso, desde el informe hasta la aprobación final.',
  },
];

const entrada = {
  hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export function AboutSection({ base = '' }: { base?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enVista, setEnVista] = React.useState(false);

  // el titular arranca cuando la sección asoma, no al cargar la página
  React.useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEnVista(true);
          observador.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-6xl">
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        {/* Izquierda: el argumento */}
        <div className="md:col-span-2">
          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={ref}
            customVariants={entrada}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Lo que nos diferencia
          </TimelineContent>

          <h2 className="mb-6 text-3xl font-medium leading-[1.1] tracking-tight text-black md:text-[2.75rem]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.06}
              staggerFrom="first"
              reverse
              arranca={enVista}
              transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            >
              Cotización Automática y Seguimiento Digital
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={ref}
            customVariants={entrada}
            className="text-base leading-relaxed text-black/70"
          >
            Somos la única consultora ambiental en Chile con cotización automática en menos de 24
            horas y seguimiento digital de tu trámite. Sin llamadas de seguimiento, sin
            incertidumbre.
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={ref}
            customVariants={entrada}
            className="mt-8"
          >
            <a
              href={`${base}/#form-home`}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-black px-7 text-sm font-semibold text-white no-underline transition-[gap,background-color] duration-300 ease-out hover:gap-4 hover:bg-black/85"
            >
              Solicitar cotización
              <span aria-hidden="true">→</span>
            </a>
          </TimelineContent>
        </div>

        {/* Derecha: las tres ventajas */}
        <div className="flex flex-col gap-4 md:col-span-3">
          {VENTAJAS.map((v, i) => (
            <TimelineContent
              key={v.title}
              as="div"
              animationNum={i + 3}
              timelineRef={ref}
              customVariants={entrada}
              className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-colors duration-200 hover:border-black/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-black/5 text-black">
                <v.icon className="size-[18px]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold tracking-tight text-black">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-black/65">{v.body}</p>
              </div>
            </TimelineContent>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
