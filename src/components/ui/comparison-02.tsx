// Comparison 2 from Hirael <https://hirael.com/blocks/comparison/comparison-02>
// MIT · Mohammad Shehadeh · https://github.com/MohammadShehadeh/hirael

/**
 * «Lo que nos diferencia» — tres columnas comparadas: hacerlo por cuenta
 * propia, contratar a otra consultora, o SVEA.
 *
 * El copete, el titular, el párrafo y las siete filas salen de lo que el
 * sitio ya afirma. Las dos filas donde la competencia queda en «no» son
 * justo las que el sitio reclama como propias: «Somos la única consultora
 * ambiental en Chile con cotización automática en menos de 24 horas y
 * seguimiento digital de tu trámite». En el resto la competencia aparece
 * como «A veces», no como «no»: decir que ninguna otra consultora de Chile
 * hace algo es una afirmación sobre terceros que nadie puede sostener.
 *
 * Cuatro cambios respecto del componente original:
 *
 * 1. El botón es un <a>, no el Button de shadcn. Ese Button arrastra
 *    @radix-ui/react-slot sólo para resolver su `asChild`, y aquí es un
 *    enlace.
 * 2. No se aplica su bloque CSS. Redefine --background, --foreground,
 *    --primary y doce fichas más: repintaría la web entera en tonos arena.
 * 3. El titular usa la tipografía de la casa, no `font-serif`, que aquí no
 *    existe, y va a la misma escala que los demás titulares de la portada
 *    (text-3xl / md:text-5xl, copete arriba y bajada de md:text-lg). El del
 *    original se quedaba en sm:text-4xl y esta sección se leía un punto más
 *    chica que las de al lado.
 * 4. La columna destacada va en el verde del logo, no en el color primario
 *    del tema.
 * 5. Los envoltorios de cada celda llevan `relative`. Los <span class="sr-only">
 *    que dicen «Sí» y «No» a los lectores de pantalla son `position:absolute`,
 *    y sin un ancestro posicionado dentro de la tabla su bloque contenedor
 *    queda fuera de la caja que recorta: no los alcanza el recorte, se plantan
 *    a seiscientos píxeles y estiran la página. En el teléfono desbordaba
 *    183 px. Con `relative` en el envoltorio, el recorte los alcanza.
 *
 * Se hidrata (`client:idle`) por dos cosas que sí necesitan JavaScript: el
 * revelado al bajar y la frase del encabezado, que se va leyendo con el
 * scroll (TextoScroll). El HTML del servidor trae la tabla y la frase
 * completas y visibles igual.
 */

import { Check, Minus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { TextoScroll } from '@/components/ui/texto-scroll';
import { cn } from '@/lib/utils';

type Celda = boolean | string;

interface Columna {
  name: string;
  summary: string;
  featured?: boolean;
}

const COLUMNAS: readonly Columna[] = [
  {
    name: 'Haciéndolo tú',
    summary: 'Control total, y cada hora del trámite es tuya',
  },
  {
    name: 'Otra consultora',
    summary: 'Te entregan el informe; el resto lo ves tú',
  },
  {
    name: 'SVEA Consultores',
    summary: 'Del diagnóstico al permiso aprobado, sin llamar a nadie',
    featured: true,
  },
];

const FILAS: readonly { label: string; cells: readonly [Celda, Celda, Celda] }[] = [
  { label: 'Cotización en menos de 24 horas', cells: [false, 'A veces', true] },
  { label: 'La propuesta llega por email, automáticamente', cells: [false, false, true] },
  { label: 'Seguimiento del trámite por WhatsApp', cells: [false, false, true] },
  { label: 'Elaboración de la documentación técnica', cells: [false, true, true] },
  { label: 'Informe técnico listo en', cells: ['Semanas', 'A veces', '5-10 días hábiles'] },
  { label: 'Gestión completa ante la autoridad', cells: [false, 'A veces', true] },
  { label: 'Sabes en qué va tu trámite sin preguntar', cells: [false, false, true] },
];

const Valor = ({ value, destacada }: { value: Celda; destacada?: boolean }) => {
  if (typeof value === 'string') {
    return (
      <span className={cn('text-sm', destacada ? 'font-medium text-black' : 'text-black/55')}>
        {value}
      </span>
    );
  }
  return value ? (
    <>
      <Check aria-hidden className={cn('size-4', destacada ? 'text-svea' : 'text-black')} />
      <span className="sr-only">Sí</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="size-4 text-black/25" />
      <span className="sr-only">No</span>
    </>
  );
};

export function Comparison02({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="titulo-diferencia">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Lo que nos diferencia
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h2
            id="titulo-diferencia"
            className="mb-4 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
          >
            Cotización Automática y <span className="font-black text-svea">Seguimiento Digital</span>
          </h2>
          <TextoScroll
            className="mx-auto max-w-2xl text-base leading-relaxed text-black/75 md:text-lg"
            texto="Somos la única consultora ambiental en Chile con cotización automática en menos de 24 horas y seguimiento digital de tu trámite. Sin llamadas de seguimiento, sin incertidumbre."
          />
        </Reveal>

        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-start">
            <caption className="sr-only">
              Comparación entre hacer el trámite por cuenta propia, con otra consultora o con SVEA
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/3 p-4 text-start align-bottom">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/50">
                    Cómo lo resuelves
                  </span>
                </th>
                {COLUMNAS.map((columna) => (
                  <th
                    key={columna.name}
                    scope="col"
                    className={cn(
                      'p-4 text-start align-bottom',
                      columna.featured && 'rounded-t-md border border-b-0 border-svea/30 bg-svea/[0.04]',
                    )}
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-medium text-black">{columna.name}</span>
                      {columna.featured && (
                        <Badge className="border-transparent bg-svea font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-svea">
                          Esta
                        </Badge>
                      )}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-black/55">
                      {columna.summary}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILAS.map((fila) => (
                <tr key={fila.label} className="border-t border-border">
                  <th scope="row" className="p-4 text-start text-sm font-normal text-black">
                    {fila.label}
                  </th>
                  {fila.cells.map((celda, i) => (
                    <td
                      key={COLUMNAS[i].name}
                      className={cn(
                        'p-4 align-middle',
                        COLUMNAS[i].featured && 'border-x border-svea/30 bg-svea/[0.04]',
                      )}
                    >
                      <span className="relative flex items-center">
                        <Valor value={celda} destacada={COLUMNAS[i].featured} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td />
                {COLUMNAS.map((columna) => (
                  <td
                    key={columna.name}
                    className={cn(
                      'p-4',
                      columna.featured &&
                        'rounded-b-md border-x border-b border-svea/30 bg-svea/[0.04]',
                    )}
                  >
                    {columna.featured && (
                      <a
                        href={`${base}/#form-home`}
                        className="inline-flex h-9 w-full items-center justify-center rounded-md bg-svea px-3 text-sm font-medium text-white no-underline transition-colors hover:bg-svea/90"
                      >
                        Solicitar cotización
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

export default Comparison02;
