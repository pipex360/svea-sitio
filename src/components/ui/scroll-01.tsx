'use client';

/**
 * Scroll 01: un texto largo con la foto fija al lado, que va cambiando a
 * medida que se lee.
 *
 * Adaptado del scroll-01 de 21st.dev con cinco cambios:
 *
 * 1. **El texto nunca se apaga.** El original lleva cada bloque de 0 a 1 y de
 *    vuelta a 0 con el scroll: el primero arranca visible y el último termina
 *    invisible, y quien se detenga a mitad de camino deja párrafos en
 *    opacidad baja. Aquí la opacidad sólo sube —de 0,35 a 1— y se queda
 *    arriba: lo leído no se vuelve a apagar. Es la misma lección del hero,
 *    que se quedaba en blanco.
 * 2. Varios párrafos pueden compartir foto. Esta página tiene cuatro
 *    párrafos y dos fotos, así que la foto cambia una vez, a la mitad. Qué
 *    foto toca sale del avance de la columna de texto, no de un párrafo
 *    cruzando el centro: esa ventana se salta con la rueda.
 * 3. El texto va alineado a la izquierda, no centrado: son párrafos de
 *    cuatro y cinco líneas, no titulares.
 * 4. En el teléfono no se repite una foto por párrafo —serían cuatro
 *    imágenes para dos archivos—: van los párrafos seguidos y cada foto
 *    aparece una vez, donde le toca.
 * 5. Con `prefers-reduced-motion` no hay fundido ni desplazamiento: todo se
 *    ve entero desde el principio y la foto igual cambia, sin transición.
 *
 * El texto completo está siempre en el HTML, así que Google y quien no
 * ejecute JavaScript lo leen entero.
 */

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Children, Fragment, createElement, isValidElement, useRef, useState, type ReactNode } from 'react';

import { Foto } from '@/components/ui/foto';

/**
 * El encabezado se pinta dos veces (teléfono y escritorio) y en cada ancho
 * una de las dos copias está en display:none. Para que el HTML no traiga dos
 * <h2> con el mismo id, la copia de escritorio cambia cada <h2> por un <p>
 * con la misma clase, sin id y con role="heading" aria-level="2": quien use
 * un lector de pantalla en escritorio sigue encontrando el título (la copia
 * del teléfono no está en el árbol de accesibilidad), y el documento tiene
 * un solo H2 y un solo id.
 */
function sinDuplicar(nodo: ReactNode): ReactNode {
  return Children.map(nodo, (hijo) => {
    if (!isValidElement(hijo)) return hijo;
    const props = hijo.props as { id?: string; children?: ReactNode; [k: string]: unknown };
    const hijos = props.children === undefined ? undefined : sinDuplicar(props.children);
    if (hijo.type === Fragment) return <Fragment key={hijo.key ?? undefined}>{hijos}</Fragment>;
    if (typeof hijo.type !== 'string') return hijo;
    const { id: _id, children: _c, ...resto } = props;
    const esTitulo = /^h[1-6]$/.test(hijo.type);
    return createElement(
      esTitulo ? 'p' : hijo.type,
      { ...resto, key: hijo.key ?? undefined, ...(esTitulo ? { role: 'heading', 'aria-level': Number(hijo.type[1]) } : {}) },
      hijos,
    );
  });
}

export type BloqueScroll = {
  /** el párrafo */
  texto: string;
  /** la foto que acompaña a este párrafo: nombre en mejoras/fotos (ver src/lib/fotos.ts) */
  foto: string;
  alt: string;
};

function Bloque({ bloque, quieto }: { bloque: BloqueScroll; quieto: boolean }) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 15%'] });

  // sólo sube: lo que ya se leyó se queda legible
  const opacidad = useTransform(scrollYProgress, [0, 0.4], [0.35, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [16, 0]);

  return (
    <motion.p
      ref={ref}
      style={quieto ? undefined : { opacity: opacidad, y }}
      className="text-base leading-relaxed text-black/75 md:text-lg"
    >
      {bloque.texto}
    </motion.p>
  );
}

export function Scroll01({
  bloques,
  encabezado,
  base = '',
}: {
  bloques: BloqueScroll[];
  encabezado?: React.ReactNode;
  /** la ruta base del sitio, para las fotos */
  base?: string;
}) {
  const columna = useRef<HTMLDivElement | null>(null);
  const [activo, setActivo] = useState(0);
  const quieto = useReducedMotion() ?? false;

  // una entrada por foto distinta: la que se repite no se carga dos veces
  const fotos = bloques.filter((b, i) => bloques.findIndex((o) => o.foto === b.foto) === i);
  const fotoDe = (i: number) => fotos.findIndex((f) => f.foto === bloques[i]?.foto);

  /**
   * Qué foto toca se saca del avance de la columna de texto, repartido en
   * tantos tramos como fotos haya: primera mitad del texto, primera foto.
   *
   * Antes lo decidía cada párrafo al pasar por el centro de la pantalla, con
   * una ventana estrecha de scroll. Con la rueda o un dedo rápido esa ventana
   * se salta entera y la foto se quedaba pegada —medido: acertaba 1 de 12
   * veces—. Atado al avance no hay ventana que perder.
   */
  const { scrollYProgress } = useScroll({ target: columna, offset: ['start 65%', 'end 45%'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(fotos.length - 1, Math.max(0, Math.floor(v * fotos.length)));
    setActivo((previo) => (previo === i ? previo : i));
  });

  return (
    <>
      {/* teléfono: los párrafos seguidos y cada foto una sola vez */}
      <div className="md:hidden">
        {encabezado}
        <div className="space-y-4">
          {bloques.map((b, i) => (
            <div key={b.texto.slice(0, 30)}>
              <p className="text-base leading-relaxed text-black/75">{b.texto}</p>
              {fotoDe(i) !== fotoDe(i + 1) && (
                <Foto
                  nombre={b.foto}
                  alt={b.alt}
                  tamano="mitad"
                  base={base}
                  className="mt-6 w-full rounded-2xl border border-border object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* escritorio: la foto fija a la izquierda, el texto a la derecha */}
      <div className="hidden gap-10 md:grid md:grid-cols-2 lg:gap-14">
        <div className="sticky top-24 h-[70vh] self-start overflow-hidden rounded-2xl border border-border">
          {fotos.map((f, i) => (
            <motion.div
              key={f.foto}
              className="absolute inset-0"
              initial={{ opacity: i === 0 ? 1 : 0 }}
              animate={{ opacity: activo === i ? 1 : 0 }}
              transition={{ duration: quieto ? 0 : 0.35, ease: 'linear' }}
            >
              <Foto
                nombre={f.foto}
                alt={f.alt}
                tamano="mitad"
                base={base}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="py-[7vh]">
          {sinDuplicar(encabezado)}
          {/* Los párrafos van separados por una fracción de pantalla: es lo
              que le da sitio al efecto. Con la separación normal los cuatro
              caben a la vez, varios quedan «en el centro» al mismo tiempo y
              la foto cambiaba antes de que tocara. */}
          <div ref={columna} className="space-y-[11vh]">
            {bloques.map((b) => (
              <Bloque key={b.texto.slice(0, 30)} bloque={b} quieto={quieto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Scroll01;
