'use client';

/**
 * «Solicita tu Cotización CTI», el formulario de esta página.
 *
 * LISTA ROJA, igual que el de la portada. El flujo de n8n lee el remitente y
 * el asunto del correo que llega desde Web3Forms: si cambia un `name`, un
 * campo oculto, el `access_key` o el `redirect`, los leads desaparecen sin
 * dar error. Por eso aquí:
 *
 * - `id="form-cti"`, `action` y `method` son los del original.
 * - Los seis campos ocultos van con el mismo `name` y el mismo `value`,
 *   incluidos el `subject` con su `id="dynamic-subject-cti"` y el `Servicio`
 *   con «Calificación Técnica Industrial», que es lo que clasifica el lead.
 * - Los cinco campos visibles conservan `name`, `type`, `required` y su
 *   `placeholder`.
 * - El asunto se arma al enviar con el mismo algoritmo que el <script> del
 *   WordPress: «Cotización CTI - Nombre | Empresa - fecha hora» en es-CL.
 *
 * Sólo cambia la ropa: la misma tarjeta de «Contáctanos» de la portada
 * —datos de contacto a la izquierda, formulario a la derecha—, etiquetas
 * visibles sobre cada campo —antes eran sólo placeholders— y el botón de la
 * casa. Va al final de la página, justo antes del pie, como en la portada.
 *
 * `scripts/verificar.mjs` compara estos campos con los del original en cada
 * corrida: si algo de la lista roja cambia, no pasa.
 */

import { ClockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
const CORREO = 'contacto@sveaconsultores.cl';

export function CtiFormulario({ copia = false }: { copia?: boolean }) {
  const asuntoRef = useRef<HTMLInputElement>(null);

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // idéntico al <script> del WordPress
    const nombre = ((form.querySelector('input[name="Nombre"]') as HTMLInputElement)?.value || '').trim() || 'Sin nombre';
    const empresa = ((form.querySelector('input[name="Empresa"]') as HTMLInputElement)?.value || '').trim();
    const ahora = new Date();
    const fecha =
      ahora.toLocaleDateString('es-CL') +
      ' ' +
      ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const asunto = 'Cotización CTI - ' + nombre + (empresa ? ' | ' + empresa : '') + ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="formulario-cti" aria-labelledby="titulo-form-cti">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          title="Solicita tu Cotización CTI"
          titleId="titulo-form-cti"
          description="Te enviaremos tu cotización en menos de 24 horas. Cuéntanos de tu instalación y te respondemos con el plazo y el valor de tu Calificación Técnica Industrial."
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta en 24h', value: 'Cotización automática por email' },
          ]}
        >
          <form
            id="form-cti"
            action={copia ? '#' : 'https://api.web3forms.com/submit'}
            method={copia ? undefined : 'POST'}
            data-copia={copia ? '1' : undefined}
            onSubmit={alEnviar}
            className="w-full space-y-3"
          >
            {/* LISTA ROJA: campos ocultos, tal cual el original */}
            <input type="hidden" name="access_key" value="076a0f9a-9911-48f6-880e-dd9d44c3063b" />
            <input
              ref={asuntoRef}
              type="hidden"
              name="subject"
              id="dynamic-subject-cti"
              defaultValue="Nueva cotización CTI - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="hidden" name="Servicio" value="Calificación Técnica Industrial" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cti-nombre">Nombre</Label>
              <Input id="cti-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cti-telefono">Teléfono</Label>
              <Input id="cti-telefono" type="tel" name="Teléfono" required placeholder="Teléfono (+56 9 XXXX XXXX)" autoComplete="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cti-email">Email</Label>
              <Input id="cti-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cti-empresa">Empresa</Label>
              <Input id="cti-empresa" type="text" name="Empresa" required placeholder="Nombre de tu empresa" autoComplete="organization" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cti-mensaje">Mensaje</Label>
              <Textarea id="cti-mensaje" name="Mensaje" placeholder="Mensaje (opcional)" rows={3} className="resize-none" />
            </div>

            <button type="submit" className="btn-flecha ancha">
              <span>Solicitar Cotización CTI</span>
              <span className="circulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>

            <p className="flex items-center justify-center gap-5 pt-2 text-xs text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
                Datos seguros
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="size-3.5" aria-hidden="true" />
                Respuesta en 24h
              </span>
            </p>
          </form>
        </ContactCard>
      </Reveal>
    </section>
  );
}

export default CtiFormulario;
