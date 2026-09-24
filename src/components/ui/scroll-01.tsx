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
import { useRef, useState } from 'react';

export type BloqueScroll = {
  /** el párrafo */
  texto: string;
  /** la foto que acompaña a este párrafo */
  media: string;
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
}: {
  bloques: BloqueScroll[];
  encabezado?: React.ReactNode;
}) {
  const columna = useRef<HTMLDivElement | null>(null);
  const [activo, setActivo] = useState(0);
  const quieto = useReducedMotion() ?? false;

  // una entrada por archivo distinto: la foto que se repite no se carga dos veces
  const fotos = bloques.filter((b, i) => bloques.findIndex((o) => o.media === b.media) === i);
  const fotoDe = (i: number) => fotos.findIndex((f) => f.media === bloques[i]?.media);

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
                <img
                  src={b.media}
                  alt={b.alt}
                  width={1200}
                  height={801}
                  loading="lazy"
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
            <motion.img
              key={f.media}
              src={f.media}
              alt={f.alt}
              width={1200}
              height={801}
              loading={i === 0 ? undefined : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: i === 0 ? 1 : 0 }}
              animate={{ opacity: activo === i ? 1 : 0 }}
              transition={{ duration: quieto ? 0 : 0.35, ease: 'linear' }}
            />
          ))}
        </div>

        <div className="py-[7vh]">
          {encabezado}
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
