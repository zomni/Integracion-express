const { obtenerTasaDolar } = require('../services/divisa.service');

const getTasaDolar = async (req, res) => {
  try {
    const resultado = await obtenerTasaDolar();
    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener tasa de cambio:', error.message);
    res.status(500).json({ error: 'No se pudo obtener la tasa de cambio' });
  }
};

module.exports = { getTasaDolar };
