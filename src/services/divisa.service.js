const axios = require('axios');
require('dotenv').config();

let tasaCambio = null;
let ultimaActualizacion = null;
const TIEMPO_CACHE_MS = 1000 * 60 * 60; // 1 hora

const formatearFecha = (fecha) => fecha.toISOString().split('T')[0];

const obtenerTasaDolar = async () => {
  const ahora = new Date();

  // Usar caché si está dentro del tiempo permitido
  if (tasaCambio && (ahora - ultimaActualizacion < TIEMPO_CACHE_MS)) {
    return { valor: tasaCambio, origen: 'cache' };
  }

  // Intentar buscar la tasa retrocediendo hasta 15 días
  for (let i = 0; i < 15; i++) {
    const fechaConsulta = new Date();
    fechaConsulta.setDate(ahora.getDate() - i);
    const fechaStr = formatearFecha(fechaConsulta);

    const url = `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=${process.env.BC_USER}&pass=${process.env.BC_PASS}&function=GetSeries&timeseries=F073.TCO.PRE.Z.D&firstdate=${fechaStr}&lastdate=${fechaStr}`;

    console.log(`Consultando Banco Central para fecha: ${fechaStr}`);
    try {
      const response = await axios.get(url);
      console.log(`Respuesta cruda:`, JSON.stringify(response.data, null, 2));

      const serie = response.data?.Series?.Obs;

      if (serie?.length && serie[0].value) {
        tasaCambio = parseFloat(serie[0].value);
        ultimaActualizacion = ahora;
        return { valor: tasaCambio, origen: `api (${fechaStr})` };
      }
    } catch (err) {
      console.error(`Error al consultar ${fechaStr}: ${err.message}`);
    }
  }

  // Si no se encontró ninguna tasa
  throw new Error('No se encontraron tasas disponibles en los últimos días (probablemente por feriados o mantenimiento del servicio).');
};

module.exports = { obtenerTasaDolar };
