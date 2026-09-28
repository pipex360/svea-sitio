/**
 * Interruptor del aviso de cookies (Consent Mode v2).
 *
 * APAGADO por defecto: con `false` no se pinta el aviso, no se agrega el
 * `gtag('consent', …)` y la medición queda igual que antes del 25-sep.
 *
 * Se enciende de dos formas (ver LANZAMIENTO.md § 6):
 *   · cambiando `ENCENDIDO` a `true` aquí, o
 *   · construyendo con la variable de entorno `SVEA_AVISO_COOKIES=1`
 *     (también en el panel del hosting), sin tocar el código.
 */
const ENCENDIDO = false;

// sólo se usa al construir (desde los .astro): la variable se lee de
// import.meta.env y, si Vite no la expone en un .ts, de process.env
const VARIABLE = import.meta.env.SVEA_AVISO_COOKIES ?? (typeof process !== 'undefined' ? process.env.SVEA_AVISO_COOKIES : undefined);

// Astro convierte «1» en número: se compara como texto
export const AVISO_COOKIES: boolean = ENCENDIDO || String(VARIABLE) === '1';

/** la llave de localStorage con la elección: 'aceptadas' | 'rechazadas' */
export const LLAVE_COOKIES = 'svea_cookies';
