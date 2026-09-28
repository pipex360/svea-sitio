/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu CTI?», que en el
 * WordPress eran dos secciones seguidas y aquí van en una.
 *
 * Lo que incluye va como lista numerada con filetes, a dos columnas, sin
 * tarjetas ni iconos. Los cinco pasos del trámite van en una tabla de
 * verdad —etapa y qué hacemos—, que es como uno explica un trámite en un
 * papel. Sin JavaScript. Ni un título ni una descripción cambian de texto.
 */

const INCLUYE = [
  {
    titulo: 'Evaluación Técnica de la Infraestructura',
    descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
  },
  {
    titulo: 'Elaboración del Informe CTI',
    descripcion: 'Informe técnico completo listo en 3-5 días hábiles',
  },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
  },
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas' },
  { titulo: 'Antecedentes', descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación' },
  { titulo: 'Informe CTI', descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles' },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente ante la SEREMI de Salud' },
  { titulo: 'Resolución', descripcion: 'Recibes tu resolución aprobada para tramitar tu patente' },
];

export function CtiServicio() {
  return (
    <section className="bg-hoja px-6 py-20 md:py-28" id="servicio" aria-labelledby="titulo-servicio">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-svea">Proceso CTI paso a paso</p>
        <h2
          id="titulo-servicio"
          className="mt-3 max-w-3xl text-balance text-4xl leading-[1.08] text-black md:text-6xl"
        >
          ¿Qué incluye nuestro servicio de CTI?
        </h2>

        <ol className="mt-12 border-t border-black md:grid md:grid-cols-2 md:gap-x-12">
          {INCLUYE.map(({ titulo, descripcion }, i) => (
            <li key={titulo} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-black/15 py-6">
              <span aria-hidden="true" className="serif pt-0.5 text-2xl leading-none text-black/35">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-black">{titulo}</h3>
                <p className="mt-1.5 text-base leading-7 text-black/75">{descripcion}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h3 className="serif text-2xl leading-tight text-black md:text-3xl">
              ¿Cómo obtienes tu Calificación Técnica Industrial?
            </h3>
            <a href="#formulario-cti" className="btn-flecha mt-8">
              <span>Cotiza tu CTI ahora</span>
            </a>
          </div>
          <table className="mt-8 w-full border-collapse text-left md:col-span-8 md:mt-0">
            <thead>
              <tr className="border-b border-black text-xs uppercase tracking-[0.08em] text-black/55">
                <th scope="col" className="py-3 pr-4 font-semibold">Etapa</th>
                <th scope="col" className="py-3 font-semibold">Qué hacemos</th>
              </tr>
            </thead>
            <tbody>
              {PASOS.map(({ titulo, descripcion }, i) => (
                <tr key={titulo} className="border-b border-black/15 align-top">
                  <th scope="row" className="whitespace-nowrap py-4 pr-6 font-semibold text-black">
                    {i + 1}. {titulo}
                  </th>
                  <td className="py-4 leading-7 text-black/75">{descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default CtiServicio;
