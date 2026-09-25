/**
 * La línea de privacidad bajo el botón de envío de TODOS los formularios
 * (25-sep, Ley 21.719: informar «de manera oportuna», art. 3 f).
 *
 * Es informativa, NO un consentimiento: la base para responder una
 * cotización pedida es el art. 13 c) («medidas precontractuales adoptadas a
 * solicitud del titular»). Por eso no hay casilla ni campo nuevo: la huella
 * de los formularios (scripts/verificar.mjs) no cambia.
 *
 * El mismo texto va en LandingFormulario.astro (las landings de Ads).
 */
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const AVISO_FORMULARIO = 'Usaremos tus datos para responder tu solicitud. Más información en nuestra';

export function AvisoFormulario() {
  return (
    <p className="aviso-form m-0 pt-1 text-center text-[12.5px] leading-snug text-black/55">
      {AVISO_FORMULARIO}{' '}
      <a href={`${BASE}/politica-de-privacidad/`} className="text-black/70 underline underline-offset-2 hover:text-black">
        política de privacidad
      </a>
      .
    </p>
  );
}

export default AvisoFormulario;
