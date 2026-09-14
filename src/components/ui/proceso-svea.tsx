/**
 * «¿Cómo Trabajamos?» — los cinco pasos, sobre el stepper de 21st.dev.
 *
 * Los títulos y las descripciones son los del sitio actual, palabra por
 * palabra, incluida la línea de abajo con los dos plazos.
 *
 * Tres decisiones sobre cómo se usa el componente:
 *
 * 1. Va en modo presentación: `asChild` en el disparador lo convierte en un
 *    <div>, sin botón ni clic. Estos cinco pasos son un proceso que se lee,
 *    no un formulario que se recorre; si hubiera que pulsar para ver cada
 *    descripción, el texto quedaría escondido para quien lee y para Google.
 * 2. Por lo mismo ningún paso está «activo» ni «completado»: los cinco
 *    círculos van iguales, en negro. Marcar los primeros como completados
 *    daría a entender un avance que aquí no existe.
 * 3. En pantalla ancha el círculo va arriba y el texto debajo, con la línea
 *    uniendo los círculos a su altura. En el teléfono la fila se convierte en
 *    columna, el círculo se pone a la izquierda del texto y las líneas
 *    desaparecen: cinco columnas de setenta píxeles no se leen.
 *
 * El salto a columna no se puede hacer con clases `max-md:`. El componente
 * decide la dirección con variantes `data-[orientation=horizontal]`, que
 * pesan lo mismo que una variante de tamaño, así que gana la que Tailwind
 * escriba después en la hoja —y gana la fila—. Por eso las cuatro clases
 * `proceso-*` de abajo: sus reglas viven en tailwind.css y ahí sí mandan.
 */

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';

const PASOS = [
  { step: 1, title: 'Cotización', description: 'Recibe tu cotización en menos de 24 horas' },
  { step: 2, title: 'Diagnóstico', description: 'Evaluamos tu caso y requerimientos específicos' },
  {
    step: 3,
    title: 'Desarrollo',
    description: 'Elaboramos la documentación técnica en 5-10 días hábiles',
  },
  { step: 4, title: 'Gestión', description: 'Tramitamos ante la autoridad competente' },
  { step: 5, title: 'Entrega', description: 'Recibes tu documentación aprobada' },
];

export function ProcesoSvea() {
  return (
    <Stepper defaultValue={0} className="proceso-cols w-full">
      {PASOS.map(({ step, title, description }) => (
        <StepperItem
          key={step}
          step={step}
          className="proceso-paso items-start [&:not(:last-child)]:flex-1"
        >
          <StepperTrigger asChild className="proceso-disparador flex flex-col items-start gap-4 pr-6">
            <StepperIndicator className="size-10 bg-black text-sm font-semibold text-white" />
            <div>
              <StepperTitle className="text-base font-bold tracking-tight text-black">
                {title}
              </StepperTitle>
              <StepperDescription className="proceso-texto mt-1 max-w-[22ch] text-sm leading-relaxed text-black/60">
                {description}
              </StepperDescription>
            </div>
          </StepperTrigger>

          {step < PASOS.length && (
            /* la línea se alinea con el centro del círculo: 40 px de alto,
               menos los 2 px de la propia línea, partido por dos */
            <StepperSeparator className="proceso-linea mt-[19px] bg-black/12" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
}

export default ProcesoSvea;
