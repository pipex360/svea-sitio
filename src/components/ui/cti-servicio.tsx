'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu CTI?», que en el
 * WordPress eran dos secciones seguidas y aquí van en una: las seis cosas
 * que hacemos en una rejilla bento y, debajo, los cinco pasos del trámite
 * con su copete original «Proceso CTI paso a paso».
 *
 * La rejilla es el bento-grid-01 de 21st.dev adaptado:
 *
 * 1. Cada tarjeta lleva una animación pequeña que cuenta lo que dice el
 *    texto —el plano que se escanea, el informe que se escribe, el
 *    expediente que llega a la SEREMI, las observaciones que se subsanan,
 *    las etapas hasta la resolución, el reloj de las 24 horas— en vez de
 *    las del original (tipografía, CDN, candados), que no hablaban de esto.
 * 2. Colores de la casa: el verde oscuro del cierre (#0d3518) y el verde
 *    claro de SVEA para lo que se mueve, en vez del zinc del original.
 * 3. Sin `framer-motion`: `motion` es la misma biblioteca y ya viaja.
 * 4. Nada nace en `opacity:0`: la entrada la hace Reveal, así Google lee
 *    las seis tarjetas enteras en el HTML del servidor.
 * 5. Las animaciones sólo corren mientras la tarjeta está en pantalla, y
 *    con `prefers-reduced-motion` se quedan quietas en su estado final.
 *    Todas mueven `transform` u `opacity`: nada que repinte la pantalla.
 * 6. Las tarjetas no son enlaces (el original les pone `cursor-pointer`).
 *
 * Ni un título ni una descripción cambian de texto.
 */

import {
  BadgeCheckIcon,
  CheckIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  HandshakeIcon,
  LandmarkIcon,
  SearchIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const SUAVE = [0.16, 1, 0.3, 1] as const;

/** Cuenta de 0 a n-1 cada `ms`, sólo mientras `activo`. */
function useCiclo(n: number, ms: number, activo: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!activo) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, activo]);
  return i;
}

/* ---------- 1. Evaluación: una lupa recorre el plano ---------- */
function Plano({ activo }: { activo: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-56 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-white/25" aria-hidden="true">
        <defs>
          <pattern id="cuadricula-cti" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#cuadricula-cti)" />
        <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/60">
          <rect x="14" y="16" width="72" height="68" />
          <path d="M14 48H50V84M50 48V16M68 48H86M50 66H68V84" />
          <path d="M30 84v-6M76 16v6" />
        </g>
      </svg>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-svea-claro/25 to-transparent"
        animate={activo ? { y: ['-40px', '230px'] } : { y: '90px' }}
        transition={activo ? { duration: 3.2, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute grid size-11 place-items-center rounded-full border border-svea-claro/50 bg-[#0d3518]/80 text-svea-claro"
        style={{ left: 'calc(50% - 22px)', top: 'calc(50% - 22px)' }}
        animate={activo ? { x: [-48, 40, 30, -40, -48], y: [-40, -30, 42, 36, -40] } : { x: 0, y: 0 }}
        transition={activo ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      >
        <SearchIcon className="size-5" />
      </motion.span>
    </div>
  );
}

/* ---------- 2. Informe: las líneas se escriben ---------- */
function Informe({ activo }: { activo: boolean }) {
  const anchos = [1, 0.8, 0.92, 0.6];
  const paso = useCiclo(anchos.length + 2, 600, activo);
  const hechas = activo ? paso : anchos.length;
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
        <FileTextIcon className="size-6" aria-hidden="true" />
      </span>
      <div className="w-full max-w-[150px] space-y-2" aria-hidden="true">
        {anchos.map((a, i) => (
          <div key={i} className="h-2 overflow-hidden rounded-full bg-white/10" style={{ width: `${a * 100}%` }}>
            <motion.div
              className="h-full origin-left rounded-full bg-svea-claro"
              initial={false}
              animate={{ scaleX: i < hechas ? 1 : 0 }}
              transition={{ duration: 0.5, ease: SUAVE }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3. SEREMI: el expediente llega, en ondas ---------- */
function Seremi({ activo }: { activo: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center" aria-hidden="true">
      {activo &&
        [0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute size-16 rounded-full border-2 border-svea-claro/40"
            initial={{ scale: 0.6, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          />
        ))}
      <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-white/10 text-white">
        <LandmarkIcon className="size-8" />
      </span>
    </div>
  );
}

/* ---------- 4. Adecuaciones: las observaciones se subsanan ---------- */
function Observaciones({ activo }: { activo: boolean }) {
  const n = 3;
  const paso = useCiclo(n + 2, 900, activo);
  const hechas = activo ? Math.min(paso, n) : n;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <ul className="w-full max-w-[190px] space-y-1.5" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => {
          const ok = i < hechas;
          return (
            <li key={i} className="flex items-center gap-2.5">
              <motion.span
                className="grid size-5 shrink-0 place-items-center rounded-md border"
                initial={false}
                animate={{
                  backgroundColor: ok ? 'rgba(107,191,59,1)' : 'rgba(255,255,255,0)',
                  borderColor: ok ? 'rgba(107,191,59,1)' : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.25 }}
              >
                <motion.span initial={false} animate={{ scale: ok ? 1 : 0 }} transition={{ duration: 0.25, ease: SUAVE }}>
                  <CheckIcon className="size-3.5 text-[#0d3518]" strokeWidth={3} />
                </motion.span>
              </motion.span>
              <span className="h-1.5 flex-1 rounded-full bg-white/15" />
            </li>
          );
        })}
      </ul>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
        {hechas}/{n} observaciones resueltas
      </span>
    </div>
  );
}

/* ---------- 5. Acompañamiento: etapa por etapa hasta la resolución ---------- */
const ETAPAS = ['Ingreso', 'Revisión', 'Resolución'];
function Etapas({ activo }: { activo: boolean }) {
  const paso = useCiclo(ETAPAS.length + 2, 900, activo);
  const hechas = activo ? Math.min(paso, ETAPAS.length) : ETAPAS.length;
  return (
    <div className="flex h-full items-center justify-center" aria-hidden="true">
      {ETAPAS.map((e, i) => {
        const ok = i < hechas;
        return (
          <div key={e} className="flex items-center">
            {i > 0 && (
              <span className="mx-1 h-0.5 w-8 overflow-hidden rounded-full bg-white/10 sm:w-14">
                <motion.span
                  className="block h-full origin-left bg-svea-claro"
                  initial={false}
                  animate={{ scaleX: ok ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: SUAVE }}
                />
              </span>
            )}
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className={cn(
                  'grid size-11 place-items-center rounded-xl transition-colors duration-300',
                  ok ? 'bg-svea-claro text-[#0d3518]' : 'bg-white/5 text-white/40',
                )}
                initial={false}
                animate={{ scale: ok && i === hechas - 1 ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {i === ETAPAS.length - 1 ? <BadgeCheckIcon className="size-5" /> : <CheckIcon className="size-5" />}
              </motion.span>
              <span className={cn('text-xs', ok ? 'text-white' : 'text-white/40')}>{e}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 6. Cotización: el reloj de las 24 horas ---------- */
function Reloj({ activo }: { activo: boolean }) {
  return (
    <div className="flex h-full items-center justify-center gap-5" aria-hidden="true">
      <div className="relative size-20 rounded-full border-2 border-white/20">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1 h-1.5 w-px -translate-x-1/2 bg-white/30"
            style={{ transformOrigin: '50% 36px', transform: `translateX(-50%) rotate(${i * 30}deg)` }}
          />
        ))}
        <motion.span
          className="absolute bottom-1/2 left-1/2 h-7 w-0.5 -ml-px origin-bottom rounded-full bg-svea-claro"
          animate={activo ? { rotate: 360 } : { rotate: 0 }}
          transition={activo ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        />
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          &lt;24<span className="text-svea-claro">h</span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">sin compromiso</span>
      </div>
    </div>
  );
}

const INCLUYE = [
  {
    titulo: 'Evaluación Técnica de la Infraestructura',
    descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
    icono: SearchIcon,
    animacion: Plano,
    celda: 'md:col-span-2 md:row-span-2',
  },
  {
    titulo: 'Elaboración del Informe CTI',
    descripcion: 'Informe técnico completo listo en 3-5 días hábiles',
    icono: FileTextIcon,
    animacion: Informe,
    celda: 'md:col-span-2',
  },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
    icono: LandmarkIcon,
    animacion: Seremi,
    celda: 'md:col-span-2 md:row-span-2',
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
    icono: ShieldCheckIcon,
    animacion: Observaciones,
    celda: 'md:col-span-2',
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
    icono: HandshakeIcon,
    animacion: Etapas,
    celda: 'md:col-span-3',
  },
  // 25-sep: la sexta tarjeta cierra la rejilla
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
    icono: ClipboardCheckIcon,
    animacion: Reloj,
    celda: 'md:col-span-3',
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Antecedentes', descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación', icono: SearchIcon },
  { titulo: 'Informe CTI', descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles', icono: FileTextIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente ante la SEREMI de Salud', icono: LandmarkIcon },
  { titulo: 'Resolución', descripcion: 'Recibes tu resolución aprobada para tramitar tu patente', icono: BadgeCheckIcon },
];

function Tarjeta({
  titulo,
  descripcion,
  icono: Icono,
  animacion: Animacion,
  celda,
  delay,
}: (typeof INCLUYE)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const enPantalla = useInView(ref, { margin: '0px 0px -10% 0px' });
  const quieto = useReducedMotion() ?? false;
  const activo = enPantalla && !quieto;

  return (
    <Reveal as="li" delay={delay} className={cn('min-h-[260px] md:min-h-0', celda)}>
      <motion.div
        ref={ref}
        whileHover={quieto ? undefined : { y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group/tarjeta flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-200 hover:border-svea-claro/40 hover:bg-white/[0.07] md:p-7"
      >
        <div className="flex min-h-[110px] flex-1 items-center justify-center [&>*]:w-full">
          <Animacion activo={activo} />
        </div>
        <div className="mt-5">
          <h3 className="flex items-start gap-2 text-lg font-bold tracking-tight text-white">
            <Icono className="mt-0.5 size-5 shrink-0 text-svea-claro" aria-hidden="true" />
            {titulo}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/65">{descripcion}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function CtiServicio() {
  return (
    <section className="bg-[#0d3518] px-6 py-20 md:py-24" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-white/20" />
          Proceso CTI paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-white/20" />
        </p>
        <h2
          id="titulo-servicio"
          className="text-balance text-3xl font-medium tracking-tight text-white md:text-5xl"
        >
          ¿Qué incluye nuestro <span className="font-black text-svea-claro">servicio de CTI?</span>
        </h2>
      </Reveal>

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[minmax(250px,auto)] md:grid-cols-6">
        {INCLUYE.map((item, i) => (
          <Tarjeta key={item.titulo} {...item} delay={i * 0.08} />
        ))}
      </ul>

      <Reveal className="mx-auto mt-16 max-w-6xl">
        <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-white md:text-2xl">
          ¿Cómo obtienes tu Calificación Técnica Industrial?
        </h3>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {PASOS.map(({ titulo, descripcion, icono: Icono }, i) => (
            <li key={titulo} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-svea-claro">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-semibold text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="text-base font-bold tracking-tight text-white">{titulo}</h4>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{descripcion}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export default CtiServicio;
