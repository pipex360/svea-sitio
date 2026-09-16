'use client';

/**
 * «Contáctanos» y el formulario de la portada.
 *
 * LISTA ROJA. El formulario es el mismo que envía hoy el WordPress a
 * Web3Forms, y el flujo de n8n lee el remitente y el asunto del correo que
 * llega: si cambia un `name`, un campo oculto, el `access_key` o el
 * `redirect`, los leads desaparecen sin dar error. Por eso aquí:
 *
 * - `id="form-home"`, `action` y `method` son los del original.
 * - Los cinco campos ocultos van con el mismo `name` y el mismo `value`,
 *   incluido el `subject` con su `id="dynamic-subject-home"` y el `redirect`
 *   absoluto (https://sveaconsultores.cl/gracias/), tal cual lo envía hoy.
 * - Los seis campos visibles conservan `name`, `type`, `required` y las
 *   siete opciones del <select> con sus `value` exactos.
 * - El asunto se arma al enviar con el mismo algoritmo que el <script> del
 *   WordPress: «Servicio - Nombre | Empresa - fecha hora» en es-CL.
 *
 * Sólo cambia la ropa: etiquetas visibles sobre cada campo (antes eran sólo
 * placeholders), el botón de la casa y la tarjeta del contact-card.
 *
 * `copia`: en la copia de trabajo el formulario no envía —action="#" y el
 * envío se cancela—, igual que hace el generador con los formularios del
 * WordPress. El asunto se calcula igual, para poder probarlo.
 *
 * `scripts/verificar.mjs` compara los campos de este formulario con los
 * del original en cada corrida: si algo de la lista roja cambia, no pasa.
 */

import { ClockIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
const CORREO = 'contacto@sveaconsultores.cl';

const SERVICIOS = [
  ['Calificación Técnica Industrial', 'Calificación Técnica Industrial (CTI)'],
  ['Estudio de Carga de Combustible', 'Estudio de Carga de Combustible (ECC)'],
  ['Plan de Emergencia Industrial', 'Plan de Emergencia y Evacuación Industrial'],
  ['Plan de Emergencia Condominios', 'Plan de Emergencia y Evacuación Condominios'],
  ['Manejo de Sustancias y Residuos Peligrosos', 'Manejo de Sustancias y Residuos Peligrosos'],
  ['Transporte de Residuos', 'Autorización Transporte de Residuos'],
  ['Otro', 'Otro / Consulta general'],
] as const;

const campoSelect =
  'flex h-11 w-full appearance-none rounded-md border border-input bg-white px-3 py-2 pr-9 text-sm text-black ' +
  'focus-visible:border-svea focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-svea/25 ' +
  'invalid:text-black/40';

export function Contacto({ copia = false }: { copia?: boolean }) {
  const asuntoRef = useRef<HTMLInputElement>(null);

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // idéntico al <script> del WordPress
    const nombre = ((form.querySelector('input[name="Nombre"]') as HTMLInputElement)?.value || '').trim() || 'Sin nombre';
    const empresa = ((form.querySelector('input[name="Empresa"]') as HTMLInputElement)?.value || '').trim();
    const servicio = ((form.querySelector('select[name="Servicio"]') as HTMLSelectElement)?.value || '').trim() || 'Consulta';
    const ahora = new Date();
    const fecha =
      ahora.toLocaleDateString('es-CL') +
      ' ' +
      ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const asunto = servicio + ' - ' + nombre + (empresa ? ' | ' + empresa : '') + ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="contacto" aria-labelledby="titulo-contacto">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          eyebrow="Último paso"
          title="Contáctanos"
          titleId="titulo-contacto"
          description="Da el siguiente paso en tu proyecto. Envíanos tus datos y nos comunicaremos contigo en menos de 24 horas con tu cotización personalizada."
          contactInfo={[
            { icon: MessageCircleIcon, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta', value: 'Cotización en menos de 24 horas' },
          ]}
        >
          <form
            id="form-home"
            action={copia ? '#' : 'https://api.web3forms.com/submit'}
            method={copia ? undefined : 'POST'}
            data-copia={copia ? '1' : undefined}
            onSubmit={alEnviar}
            className="w-full space-y-3"
          >
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold text-black">Envíanos un mensaje</h3>
              <p className="text-xs text-black/55">Te enviaremos tu cotización en menos de 24 horas</p>
            </div>

            {/* LISTA ROJA: campos ocultos, tal cual el original */}
            <input type="hidden" name="access_key" value="076a0f9a-9911-48f6-880e-dd9d44c3063b" />
            <input
              ref={asuntoRef}
              type="hidden"
              name="subject"
              id="dynamic-subject-home"
              defaultValue="Nueva consulta desde Home - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            {/* absoluto, como en el original: el generador reescribe los enlaces del
                WordPress para la copia, pero este valor viaja en el POST y no se toca */}
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contacto-nombre">Nombre</Label>
                <Input id="contacto-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contacto-telefono">Teléfono</Label>
                <Input id="contacto-telefono" type="tel" name="Teléfono" required placeholder="Teléfono" autoComplete="tel" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contacto-email">Email</Label>
                <Input id="contacto-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contacto-empresa">Empresa</Label>
                <Input id="contacto-empresa" type="text" name="Empresa" required placeholder="Empresa" autoComplete="organization" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contacto-servicio">Servicio</Label>
              <span className="relative block">
                <select id="contacto-servicio" name="Servicio" required defaultValue="" className={campoSelect}>
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
                  {SERVICIOS.map(([valor, texto]) => (
                    <option key={valor} value={valor}>
                      {texto}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black/50"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contacto-mensaje">Mensaje</Label>
              <Textarea id="contacto-mensaje" name="Mensaje" placeholder="Mensaje (opcional)" rows={3} className="resize-none" />
            </div>

            <button type="submit" className="btn-flecha ancha">
              <span>Enviar Consulta</span>
              <span className="circulo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </form>
        </ContactCard>
      </Reveal>
    </section>
  );
}

export default Contacto;
