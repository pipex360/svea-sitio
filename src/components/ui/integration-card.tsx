'use client';

/**
 * «¿Cómo Trabajamos?» — esquema de nodos: SVEA al centro y los cinco pasos
 * alrededor, con pulsos recorriendo las líneas.
 *
 * Adaptado del integration-card de 21st.dev. Cinco cambios:
 *
 * 1. Sin @base-ui/react. Ese paquete entra sólo por el Button, y el botón de
 *    aquí es un enlace. Tampoco se copia su bloque de variantes: son ciento
 *    veinte líneas de clases para un `<a>`.
 * 2. Los nodos son los cinco pasos del proceso, no logos de herramientas, y
 *    al centro va el logo de SVEA.
 * 3. El esquema es decorativo: va `aria-hidden` y sólo se muestra a partir de
 *    `md`. Los cinco pasos con su descripción viven siempre debajo, en una
 *    lista que es la que leen Google y los lectores de pantalla. Si el
 *    contenido viviera dentro del dibujo, en el teléfono no habría nada.
 * 4. Los pulsos arrancan con un retraso fijo por nodo, no `Math.random()`.
 *    Con un valor al azar, el servidor y el navegador dibujan cosas distintas
 *    y React rehace el nodo en la hidratación.
 * 5. Con `prefers-reduced-motion` los pulsos y el latido del centro se
 *    detienen: quedan las líneas y los nodos, quietos.
 *
 * El centrado va en un estilo en línea y no con `-translate-x-1/2`. Motion
 * escribe `transform` en el elemento para animar la entrada y la utilidad de
 * Tailwind se pierde: el logo y los nodos quedaban corridos media caja —67 px
 * medidos—. La caja que posiciona y la que se anima son ahora dos: la de
 * fuera coloca, la de dentro se mueve.
 */

import { BadgeCheck, FileText, Landmark, PencilRuler, Search } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useId } from 'react';

import { cn } from '@/lib/utils';

type Paso = {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  icono: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
};

/** El centro del lienzo de 564 × 410 está en 282, 205. */
const PASOS: Paso[] = [
  {
    id: 'cotizacion',
    numero: '01',
    titulo: 'Cotización',
    descripcion: 'Recibe tu cotización en menos de 24 horas',
    icono: FileText,
    x: 108,
    y: 86,
    path: 'M 262 205 V 101 Q 262 86 247 86 H 108',
    delay: 0,
  },
  {
    id: 'diagnostico',
    numero: '02',
    titulo: 'Diagnóstico',
    descripcion: 'Evaluamos tu caso y requerimientos específicos',
    icono: Search,
    x: 108,
    y: 324,
    path: 'M 262 205 V 309 Q 262 324 247 324 H 108',
    delay: 0.8,
  },
  {
    id: 'desarrollo',
    numero: '03',
    titulo: 'Desarrollo',
    descripcion: 'Elaboramos la documentación técnica en 5-10 días hábiles',
    icono: PencilRuler,
    x: 282,
    y: 372,
    path: 'M 282 232 V 372',
    delay: 1.6,
  },
  {
    id: 'gestion',
    numero: '04',
    titulo: 'Gestión',
    descripcion: 'Tramitamos ante la autoridad competente',
    icono: Landmark,
    x: 456,
    y: 324,
    path: 'M 302 205 V 309 Q 302 324 317 324 H 456',
    delay: 2.4,
  },
  {
    id: 'entrega',
    numero: '05',
    titulo: 'Entrega',
    descripcion: 'Recibes tu documentación aprobada',
    icono: BadgeCheck,
    x: 456,
    y: 86,
    path: 'M 302 205 V 101 Q 302 86 317 86 H 456',
    delay: 3.2,
  },
];

const Linea = ({ d, id, delay, quieto }: { d: string; id: string; delay: number; quieto: boolean }) => (
  <>
    <path d={d} stroke="currentColor" strokeWidth="1" fill="none" className="text-border" />
    {!quieto && (
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay }}
      />
    )}
    <defs>
      <linearGradient id={id} gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="#0e7a3c" stopOpacity="0.7" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </>
);

export function Esquema({ base = '' }: { base?: string }) {
  const contenedorId = useId();
  const quieto = useReducedMotion() ?? false;

  return (
    <div aria-hidden="true" className="relative aspect-[564/410] w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PASOS.map((paso) => (
          <Linea
            key={paso.id}
            d={paso.path}
            id={`${contenedorId}-${paso.id}`}
            delay={paso.delay}
            quieto={quieto}
          />
        ))}
      </svg>

      {/* SVEA, al centro */}
      <div
        className="absolute z-20 flex items-center justify-center rounded-2xl border border-border bg-white p-2 shadow-xl"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="rounded-xl border border-border px-4 py-3">
          <img
            src={`${base}/img/logo-svea.webp`}
            alt=""
            width={404}
            height={137}
            className="block h-7 w-auto"
          />
        </div>
        {!quieto && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-svea/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </div>

      {/* Los cinco pasos */}
      {PASOS.map((paso) => {
        const Icono = paso.icono;
        const ultimo = paso.id === 'entrega';
        return (
          <div
            key={paso.id}
            className="absolute z-10"
            style={{
              left: `${(paso.x / 564) * 100}%`,
              top: `${(paso.y / 410) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: quieto ? 0 : PASOS.indexOf(paso) * 0.12 }}
              className="flex flex-col items-center gap-2"
            >
            <span
              className={cn(
                'flex size-12 items-center justify-center rounded-xl border shadow-sm lg:size-14',
                ultimo
                  ? 'border-svea bg-svea text-white'
                  : 'border-border bg-white text-black',
              )}
            >
              <Icono className="size-5 lg:size-6" />
            </span>
            <span className="whitespace-nowrap text-center">
              <span className="block font-mono text-[10px] font-semibold text-black/40">
                {paso.numero}
              </span>
              <span className="block text-sm font-bold tracking-tight text-black">
                {paso.titulo}
              </span>
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** El marco del esquema: trama de puntos y veladura, como el original. */
export function MarcoEsquema({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-black/[0.02] p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 from-5% via-transparent to-white/70 to-95%"
      />
      <div className="relative z-10 flex w-full items-center justify-center">{children}</div>
    </div>
  );
}

export { PASOS };
export default Esquema;
