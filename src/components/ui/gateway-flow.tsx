'use client';

/**
 * Gateway Flow: líneas punteadas que entran por los dos costados y convergen
 * al centro, con partículas recorriéndolas.
 *
 * Es el efecto del componente de 21st.dev, reescrito. El original monta un
 * `<iframe srcDoc>` con un documento HTML entero dentro, y ese documento se
 * descarga Tailwind por CDN —que compila CSS en el navegador—, GSAP,
 * ScrollTrigger, Iconify y Google Fonts: más de medio megabyte de terceros y
 * un contexto de navegación aparte para dibujar unas curvas en un canvas.
 * Este proyecto existe para arreglar un LCP de diez segundos, así que meter
 * eso en una tarjeta decorativa sería ir en contra de su propio motivo.
 *
 * El dibujo es el mismo: bezier desde cada borde al centro, trazo punteado y
 * un cuadrado blanco recorriendo cada curva. Sin dependencias.
 *
 * Tres cosas que el original no hace:
 *
 * 1. Se detiene cuando la tarjeta no está en pantalla. Si no, el bucle sigue
 *    gastando batería mientras el visitante lee el pie de página.
 * 2. Con `prefers-reduced-motion` dibuja un solo fotograma quieto: las líneas
 *    quedan, el movimiento no.
 * 3. Se ajusta al tamaño de la tarjeta, no al de la ventana, y respeta la
 *    densidad de píxeles de la pantalla.
 */

import * as React from 'react';

const LINEAS = 26;

export function GatewayFlow({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ancho = 0;
    let alto = 0;
    let cuadro = 0;
    let visible = true;

    const caminos = Array.from({ length: LINEAS }, (_, i) => ({
      izquierda: i % 2 === 0,
      y: 0,
      fraccion: i / LINEAS,
      t: Math.random(),
      velocidad: 0.0016 + Math.random() * 0.0022,
    }));

    function medir() {
      const dpr = window.devicePixelRatio || 1;
      const caja = canvas!.getBoundingClientRect();
      ancho = caja.width;
      alto = caja.height;
      canvas!.width = Math.round(ancho * dpr);
      canvas!.height = Math.round(alto * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const c of caminos) c.y = c.fraccion * alto * 1.4 - alto * 0.2;
    }

    function enCurva(t: number, p0: P, p1: P, p2: P, p3: P) {
      const u = 1 - t;
      return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
      };
    }

    function pintar() {
      ctx!.clearRect(0, 0, ancho, alto);
      const cx = ancho / 2;
      const cy = alto / 2;

      for (const c of caminos) {
        const p0 = { x: c.izquierda ? 0 : ancho, y: c.y };
        const p1 = { x: c.izquierda ? cx * 0.5 : ancho - cx * 0.5, y: c.y };
        const p2 = { x: c.izquierda ? cx * 0.8 : ancho - cx * 0.8, y: cy };
        const p3 = { x: cx, y: cy };

        ctx!.beginPath();
        ctx!.moveTo(p0.x, p0.y);
        ctx!.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx!.strokeStyle = 'rgba(255,255,255,.28)';
        ctx!.lineWidth = 1;
        ctx!.setLineDash([1, 4]);
        ctx!.stroke();
        ctx!.setLineDash([]);

        if (!quieto) {
          c.t += c.velocidad;
          if (c.t > 1) {
            c.t = 0;
            c.y += (Math.random() - 0.5) * 10;
          }
        }
        const p = enCurva(c.t, p0, p1, p2, p3);
        ctx!.fillStyle = 'rgba(255,255,255,.75)';
        ctx!.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      }

      if (!quieto && visible) cuadro = requestAnimationFrame(pintar);
    }

    medir();
    pintar();

    const observadorTamano = new ResizeObserver(() => {
      medir();
      if (quieto) pintar();
    });
    observadorTamano.observe(canvas);

    // el bucle sólo corre mientras la tarjeta se ve
    const observadorVista = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !quieto) {
        cancelAnimationFrame(cuadro);
        cuadro = requestAnimationFrame(pintar);
      }
    });
    observadorVista.observe(canvas);

    return () => {
      cancelAnimationFrame(cuadro);
      observadorTamano.disconnect();
      observadorVista.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

type P = { x: number; y: number };

export default GatewayFlow;
