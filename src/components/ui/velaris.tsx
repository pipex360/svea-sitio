'use client';

/**
 * Velaris: degradado vivo hecho con un shader de ruido simplex sobre WebGL.
 *
 * Copiado de 21st.dev con cuatro cambios, todos sobre cuándo dibuja:
 *
 * 1. El bucle se detiene cuando la tarjeta no está en pantalla. El original
 *    pide un fotograma nuevo para siempre: seguiría gastando GPU y batería
 *    mientras el visitante lee el pie de página.
 * 2. Con `prefers-reduced-motion` dibuja un solo fotograma y para. El
 *    degradado queda, el movimiento no.
 * 3. Si el navegador no da contexto WebGL, el canvas se retira y queda el
 *    fondo de respaldo en CSS. El original deja un canvas vacío, que sobre
 *    una tarjeta de texto blanco significa texto blanco sobre nada.
 * 4. Al desmontar se liberan el programa, los shaders y el búfer, y se pide
 *    la pérdida del contexto. Un navegador admite unos pocos contextos WebGL
 *    a la vez; dejarlos abiertos los agota.
 *
 * La paleta por defecto es la del logo, la misma de «Compromiso y Garantía»,
 * para que las dos tarjetas oscuras de la sección se lean como una familia.
 */

import * as React from 'react';

import { cn } from '@/lib/utils';

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);

  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface VelarisProps {
  bg?: string;
  colors?: readonly string[];
  speed?: number;
  grain?: number;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

/** La paleta del logo, la misma que usa «Compromiso y Garantía». */
const COLORES_SVEA = ['#2d6a4f', '#0e7a3c', '#95d5b2', '#081c15'] as const;

function hexARgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export function Velaris({
  bg = '#081c15',
  colors = COLORES_SVEA,
  speed = 2.0,
  grain = 0.3,
  height = '100%',
  className,
  children,
}: VelarisProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const contenedorRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const contenedor = contenedorRef.current;
    if (!canvas || !contenedor) return;

    const gl = canvas.getContext('webgl');
    // sin WebGL el canvas estorba: queda el fondo de respaldo en CSS
    if (!gl) {
      canvas.style.display = 'none';
      return;
    }

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const crearShader = (tipo: number, src: string) => {
      const s = gl.createShader(tipo)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = crearShader(gl.VERTEX_SHADER, vertexShaderGLSL);
    const fs = crearShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL);
    const programa = gl.createProgram()!;
    gl.attachShader(programa, vs);
    gl.attachShader(programa, fs);
    gl.linkProgram(programa);
    gl.useProgram(programa);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(programa, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(programa, 'u_resolution'),
      time: gl.getUniformLocation(programa, 'u_time'),
      grain: gl.getUniformLocation(programa, 'u_grain'),
      colors: gl.getUniformLocation(programa, 'u_colors'),
      bg: gl.getUniformLocation(programa, 'u_bg'),
    };

    const paleta = new Float32Array(colors.slice(0, 4).flatMap(hexARgb));
    const fondo = hexARgb(bg);

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(1, Math.round(contenedor.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(contenedor.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const pintar = (t: number) => {
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, t * 0.001 * speed);
      gl.uniform1f(loc.grain, grain);
      gl.uniform3f(loc.bg, fondo[0], fondo[1], fondo[2]);
      gl.uniform3fv(loc.colors, paleta);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let cuadro = 0;
    let visible = false;

    const bucle = (t: number) => {
      pintar(t);
      cuadro = requestAnimationFrame(bucle);
    };

    medir();

    if (quieto) {
      // un fotograma y basta: el degradado queda, el movimiento no
      pintar(0);
    } else {
      const observador = new IntersectionObserver(([e]) => {
        if (e.isIntersecting === visible) return;
        visible = e.isIntersecting;
        if (visible) cuadro = requestAnimationFrame(bucle);
        else cancelAnimationFrame(cuadro);
      });
      observador.observe(contenedor);

      const observadorTamano = new ResizeObserver(medir);
      observadorTamano.observe(contenedor);

      return () => {
        cancelAnimationFrame(cuadro);
        observador.disconnect();
        observadorTamano.disconnect();
        gl.deleteProgram(programa);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    }

    const observadorTamano = new ResizeObserver(() => {
      medir();
      pintar(0);
    });
    observadorTamano.observe(contenedor);

    return () => {
      observadorTamano.disconnect();
      gl.deleteProgram(programa);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [bg, colors, speed, grain]);

  return (
    <div
      ref={contenedorRef}
      style={{ height, backgroundColor: bg }}
      className={cn('relative w-full overflow-hidden', className)}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

export default Velaris;
