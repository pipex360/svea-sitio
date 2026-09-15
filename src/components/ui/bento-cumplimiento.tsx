'use client';

/**
 * «Cumplimiento Ambiental Sin Complicaciones» — la cuarta sección de la home,
 * montada sobre la rejilla bento de 21st.dev.
 *
 * Los textos y los rótulos son los del sitio actual, palabra por palabra.
 *
 * Las cifras del 100% y de las 24 hrs salen de los `data-target` del HTML de
 * WordPress. La de trámites no: el sitio decía 100+ mientras el hero decía
 * +500 empresas atendidas, que no puede ser —cada empresa contrata al menos
 * un trámite—. La cifra queda en 250, que es la que prometen los avisos de
 * Google Ads: así el aviso y la página dicen lo mismo. Las tres del sitio (empresas
 * del hero, empresas del carrusel y trámites de aquí) parten de ese número.
 *
 * La única fusión: el sitio actual repetía el 100% dos veces —una como «Tasa
 * de Aprobación» y otra como «100% Cumplimiento · En trámites realizados»
 * dentro de Innovación Constante—. Aquí es una sola cifra que conserva los
 * dos rótulos, para no afirmar lo mismo dos veces en la misma pantalla.
 *
 * Los contadores suben cuando la cifra entra en pantalla, como en el sitio
 * actual, y se quedan quietos si el sistema pide menos movimiento.
 *
 * El cierre («¿Listo para comenzar su proyecto?») ya no vive aquí: salió de
 * la rejilla para ocupar su propia franja a todo el ancho, en Cta69.
 */

import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Velaris } from '@/components/ui/velaris';
import { BentoGridShowcase } from '@/components/ui/bento-product-features';
import { cn } from '@/lib/utils';

/** Cifra que sube desde cero la primera vez que se ve. */
function Cifra({ meta, sufijo = '' }: { meta: number; sufijo?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.5 });
  const valor = useMotionValue(0);
  const reducido = useReducedMotion();
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!enVista) return;
    if (reducido) {
      setN(meta);
      return;
    }
    const control = animate(valor, meta, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return control.stop;
  }, [enVista, meta, reducido, valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {sufijo}
    </span>
  );
}

/* Al pasar el cursor la tarjeta se levanta cuatro píxeles y proyecta sombra:
   se separa del papel en vez de encenderse. El borde se oscurece a la vez,
   para que el gesto también se lea sin color. Si el sistema pide menos
   movimiento, queda sólo la sombra y el borde. */
const marco = cn(
  'h-full border-border bg-white shadow-none',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

/**
 * Compromiso y Garantía: la columna alta de la izquierda, y la única tarjeta
 * con color de la sección.
 *
 * Las cinco tarjetas pesaban igual y la sección se veía apagada: faltaba una
 * que anclara. Ésta lleva una malla de verdes bosque —la paleta del Static
 * Mesh Gradient de paper-design, hecha con tres degradados radiales en CSS
 * en vez de su shader WebGL— y los vistos en verde menta. Las cifras de al
 * lado siguen en blanco y negro: la tarjeta las enmarca, no compite.
 *
 * El fondo va como clase utilitaria (`bg-[#081c15]`) y no en línea: el marco
 * trae `bg-white` con !important, y un estilo en línea pierde contra eso.
 */
const Compromiso = () => (
  <Card
    className={cn(marco, 'relative flex flex-col overflow-hidden border-[#0b3d25] bg-[#081c15] hover:border-[#1f5c3d]')}
    style={{
      backgroundImage: `
        radial-gradient(ellipse 70% 55% at 15% 10%, rgba(45,106,79,.85) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 95% 85%, rgba(149,213,178,.35) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 70% 30%, rgba(255,243,176,.12) 0%, transparent 60%)
      `,
    }}
  >
    <CardContent className="relative z-10 flex h-full flex-col p-8">
      <h3 className="mb-3 text-xl font-bold tracking-tight text-white">Compromiso y Garantía</h3>
      <p className="text-sm leading-relaxed text-white/80">
        Nos especializamos en la satisfacción del cliente. No solo entregamos documentos;
        aseguramos la viabilidad y el cumplimiento normativo de su proyecto industrial.
      </p>
      <ul className="mt-auto grid gap-2.5 pt-8">
        {['Calidad Técnica', 'Eficiencia en Tiempos', 'Profesionalismo', 'Transparencia Total'].map(
          (item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.08] px-3 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.14]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-[#95d5b2]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {item}
            </li>
          ),
        )}
      </ul>
    </CardContent>
  </Card>
);

/** Una cifra con su rótulo. */
const Dato = ({
  meta,
  sufijo,
  rotulo,
  pie,
  grande = false,
  puntos = false,
}: {
  meta: number;
  sufijo: string;
  rotulo: string;
  pie?: string;
  grande?: boolean;
  puntos?: boolean;
}) => (
  <Card className={cn(marco, 'relative overflow-hidden')}>
    {puntos && (
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
    )}
    <CardContent className="relative z-10 flex h-full flex-col justify-end p-8">
      <p
        className={cn(
          'font-bold leading-none tracking-tight text-black',
          grande ? 'text-6xl' : 'text-5xl',
        )}
      >
        <Cifra meta={meta} sufijo={sufijo} />
      </p>
      <p className="mt-3 text-sm font-medium text-black">{rotulo}</p>
      {pie && <p className="mt-0.5 text-xs text-black/50">{pie}</p>}
    </CardContent>
  </Card>
);

/**
 * Innovación Constante, sobre el degradado vivo de Velaris.
 *
 * El shader va detrás y el texto encima, con un velo que lo sostiene: el
 * degradado se mueve y sin el velo el contraste cambiaría todo el rato.
 * Comparte paleta con «Compromiso y Garantía», así que las dos tarjetas
 * oscuras de la sección se leen como una familia y no como dos decisiones.
 */
const Innovacion = () => (
  <Card className={cn(marco, 'relative overflow-hidden border-[#0b3d25] hover:border-[#1f5c3d]')}>
    <Velaris className="absolute inset-0" height="100%" />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-[#04120d]/85 via-[#04120d]/45 to-transparent"
    />
    <CardContent className="relative z-10 flex h-full flex-col justify-between p-8">
      <div>
        <h3 className="mb-2 text-base font-bold tracking-tight text-white">Innovación Constante</h3>
        <p className="text-sm leading-relaxed text-white/80">
          Adaptamos metodologías modernas para agilizar trámites y reducir riesgos operativos.
        </p>
      </div>
      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="text-2xl font-bold leading-none tracking-tight text-white">
          5-10 <span className="text-sm font-medium text-white/70">días hábiles</span>
        </p>
        <p className="mt-1 text-xs text-white/60">Informe técnico listo para revisión</p>
      </div>
    </CardContent>
  </Card>
);

export function CumplimientoBento() {
  return (
    <BentoGridShowcase
      className="mx-auto max-w-7xl"
      integration={<Compromiso />}
      trackers={<Dato meta={250} sufijo="+" rotulo="Trámites Gestionados" />}
      statistic={
        <Dato
          meta={100}
          sufijo="%"
          rotulo="Tasa de Aprobación"
          pie="En trámites realizados"
          grande
          puntos
        />
      }
      focus={<Dato meta={24} sufijo=" hrs" rotulo="Tiempo de Cotización" />}
      productivity={<Innovacion />}
    />
  );
}

export default CumplimientoBento;
