'use client';

/**
 * «Solicita tu Cotización» de Permisos Ambientales y SEIA (25-sep).
 *
 * Era la única página de servicio sin formulario: el botón mandaba al de la
 * portada. No hay original en el WordPress con qué compararlo, así que sigue
 * el patrón de los demás formularios de servicio y el del formulario de la
 * portada (form-home), que desde el 24-sep ya ofrece «Permisos ambientales y
 * SEIA» en su lista de servicios:
 *
 * - Web3Forms con el mismo `access_key` y el mismo `redirect` a /gracias/.
 * - `from_name` «SVEA Consultores Web», como la portada y los servicios.
 * - `Servicio` fijo en «Permisos ambientales y SEIA» (el mismo valor de la
 *   opción del form-home).
 * - El asunto se arma al enviar como el de la portada: «servicio - Nombre |
 *   Empresa - fecha hora» → «Permisos ambientales y SEIA - …». OJO: la lista
 *   de palabras que n8n reconoce en el asunto (verificar.mjs, PALABRAS_N8N)
 *   no tiene SEIA; llega igual que un lead de la portada con ese servicio.
 * - gclid y utm_* (CamposOrigen), como en todos.
 */
import { ClockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';
import { CamposOrigen } from '@/components/ui/campos-origen';
import { AvisoFormulario } from '@/components/ui/aviso-formulario';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
const CORREO = 'contacto@sveaconsultores.cl';

export function SeiaFormulario({ copia = false }: { copia?: boolean }) {
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
    const asunto = 'Permisos ambientales y SEIA - ' + nombre + (empresa ? ' | ' + empresa : '') + ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="formulario-seia" aria-labelledby="titulo-form-seia">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          title="Solicita tu Cotización"
          titleId="titulo-form-seia"
          description="Te enviaremos tu cotización en menos de 24 horas. Cuéntanos de tu proyecto y te respondemos con el plazo y el valor de la evaluación de pertinencia o del permiso ambiental."
          beneficios={["Revisamos tu proyecto y te decimos si debe ingresar al SEIA.", "Confeccionamos el informe de pertinencia y la documentación de los permisos ambientales.", "Hacemos el seguimiento de la tramitación ante el SEA.", "Cotización en menos de 24 horas, sin compromiso."]}
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta en 24h', value: 'Cotización en menos de 24 horas' },
          ]}
        >
          <form
            id="form-seia"
            action={copia ? '#' : 'https://api.web3forms.com/submit'}
            method={copia ? undefined : 'POST'}
            data-copia={copia ? '1' : undefined}
            onSubmit={alEnviar}
            className="w-full space-y-3"
          >
            {/* los campos ocultos del patrón de los formularios de servicio */}
            <input type="hidden" name="access_key" value="076a0f9a-9911-48f6-880e-dd9d44c3063b" />
            <input
              ref={asuntoRef}
              type="hidden"
              name="subject"
              id="dynamic-subject-seia"
              defaultValue="Nueva cotización Permisos ambientales y SEIA - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="hidden" name="Servicio" value="Permisos ambientales y SEIA" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            {/* gclid y utm_*: los rellena la medición (MedicionSitio.astro) */}
            <CamposOrigen />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seia-nombre">Nombre</Label>
              <Input id="seia-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seia-telefono">Teléfono</Label>
              <Input id="seia-telefono" type="tel" name="Teléfono" required placeholder="Teléfono (+56 9 XXXX XXXX)" autoComplete="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seia-email">Email</Label>
              <Input id="seia-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seia-empresa">Empresa</Label>
              <Input id="seia-empresa" type="text" name="Empresa" required placeholder="Nombre de tu empresa" autoComplete="organization" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="seia-mensaje">Mensaje</Label>
              <Textarea id="seia-mensaje" name="Mensaje" placeholder="Mensaje (opcional)" rows={3} className="resize-none" />
            </div>

            <button type="submit" className="btn-flecha ancha">
              <span>Solicitar cotización</span>
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
            <AvisoFormulario />
          </form>
        </ContactCard>
      </Reveal>
    </section>
  );
}

export default SeiaFormulario;
