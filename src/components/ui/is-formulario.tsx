'use client';

/**
 * «Solicita tu Cotización» del Informe Sanitario. Mismo formato y mismas
 * reglas que ecc-formulario.tsx (LISTA ROJA: id, campos ocultos, nombres y
 * asunto idénticos al WordPress; los compara verificar.mjs).
 *
 * El asunto sigue el <script> del original, que es distinto al de las otras
 * páginas: «Cotización Informe Sanitario», el nombre y la empresa sólo si
 * vienen, y la fecha sin hora. (En el WordPress el script buscaba los ids
 * «is-nombre» e «is-empresa», que sus campos no tenían, así que el asunto se
 * quedaba en el valor por defecto; aquí los campos sí llevan esos ids.)
 */
import { ClockIcon, LockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';
import { CamposOrigen } from '@/components/ui/campos-origen';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20Informe%20Sanitario%20Favorable';
const CORREO = 'contacto@sveaconsultores.cl';

export function IsFormulario({ copia = false }: { copia?: boolean }) {
  const asuntoRef = useRef<HTMLInputElement>(null);

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // idéntico al <script> del WordPress
    const nombre = ((form.querySelector('input[name="Nombre"]') as HTMLInputElement)?.value || '').trim();
    const empresa = ((form.querySelector('input[name="Empresa"]') as HTMLInputElement)?.value || '').trim();
    const fecha = new Date().toLocaleDateString('es-CL');
    let asunto = 'Cotización Informe Sanitario';
    if (nombre) asunto += ' - ' + nombre;
    if (empresa) asunto += ' | ' + empresa;
    asunto += ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="formulario-is" aria-labelledby="titulo-form-is">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          title="Solicita tu Cotización"
          titleId="titulo-form-is"
          description="Te enviaremos tu cotización en menos de 24 horas. Gestionamos tu autorización sanitaria ante la SEREMI de Salud. Requisito obligatorio para obtener la patente municipal y operar legalmente en Chile."
          beneficios={["Obtén tu Informe Sanitario Favorable con gestión integral ante la SEREMI de Salud.", "Evaluación completa de tu establecimiento.", "Seguimiento hasta la resolución favorable.", "Cotización gratuita en menos de 24 horas."]}
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta en 24h', value: 'Cotización automática por email' },
          ]}
        >
          <form
            id="form-informe-sanitario"
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
              id="dynamic-subject-is"
              defaultValue="Nueva cotización Informe Sanitario - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="hidden" name="Servicio" value="Informe Sanitario Favorable / Autorización Sanitaria" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            {/* gclid y utm_*: los rellena la medición (MedicionSitio.astro) */}
            <CamposOrigen />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="is-nombre">Nombre</Label>
              <Input id="is-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="is-telefono">Teléfono</Label>
              <Input id="is-telefono" type="tel" name="Teléfono" required placeholder="Teléfono (+56 9 XXXX XXXX)" autoComplete="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="is-email">Email</Label>
              <Input id="is-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="is-empresa">Empresa</Label>
              <Input id="is-empresa" type="text" name="Empresa" required placeholder="Empresa / Razón social" autoComplete="organization" />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-svea/20 bg-svea/5 px-4 py-3">
              <LockIcon className="size-4 text-svea" aria-hidden="true" />
              <span className="text-sm font-medium text-black">Informe Sanitario Favorable</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="is-mensaje">Mensaje</Label>
              <Textarea id="is-mensaje" name="Mensaje" placeholder="Mensaje (opcional). Ej: tipo de establecimiento, superficie, actividad, etc." rows={3} className="resize-none" />
            </div>

            <button type="submit" className="btn-flecha ancha">
              <span>Solicitar Cotización</span>
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

export default IsFormulario;
