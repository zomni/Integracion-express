const axios = require('axios');

let tasaCambio = null;
let ultimaActualizacion = null;
const TIEMPO_CACHE_MS = 1000 * 60 * 60;

const formatearFecha = (fecha) => fecha.toISOString().split('T')[0];

const obtenerTasaDolar = async () => {
  const ahora = new Date();

  if (tasaCambio && (ahora - ultimaActualizacion < TIEMPO_CACHE_MS)) {
    return { valor: tasaCambio, origen: 'cache' };
  }

  for (let i = 0; i < 7; i++) {
    const fechaConsulta = new Date();
    fechaConsulta.setDate(ahora.getDate() - i);
    const fechaStr = formatearFecha(fechaConsulta);

    const url = `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=guest&pass=guest&function=GetSeries&timeseries=318&from=${fechaStr}&to=${fechaStr}&format=json`;

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

  throw new Error('No se pudo obtener la tasa desde el Banco Central en los últimos días');
};

module.exports = { obtenerTasaDolar };
