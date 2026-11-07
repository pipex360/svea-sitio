/**
 * /datos/cti-chile-agregado.csv · el CSV agregado de «Datos CTI» (región × año; sin datos individuales).
 * El archivo vive en src/data/cti-chile-agregado.csv y lo reemplaza cada mes convertir_a_sitio.py.
 */
import csv from '../../data/cti-chile-agregado.csv?raw';

export const GET = () => new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
