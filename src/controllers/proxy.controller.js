const axios = require('axios');
const NodeCache = require('node-cache');
const JAVA_API = 'http://localhost:8080';
const cache = require('../utils/cache');

// TTL personalizado por ruta
const rutaTTL = {
  '/java-api/usuario/:id': 60,
  '/java-api/producto': 120,
  '/java-api/categoria': 180,
  '/java-api/marca': 180,
  '/java-api/sucursal': 300,
  '/java-api/region': 300,
  '/java-api/ciudad': 300,
  '/java-api/comuna': 300,
  '/java-api/tipoentrega': 300,
  '/java-api/metodopago': 300,
  '/java-api/rol': 300
};

// Función para calcular TTL según la ruta con comodines
const obtenerTTL = (url) => {
  for (const [ruta, ttl] of Object.entries(rutaTTL)) {
    const base = ruta.replace(/:[^/]+/g, '[^/]+'); // convierte :id en regex
    const regex = new RegExp(`^${base}$`);
    if (regex.test(url)) return ttl;
  }
  return 60; // TTL por defecto
};

const reenviarPeticion = async (req, res) => {
  const key = req.originalUrl;
  const url = `${JAVA_API}${req.url}`;

  // Solo caché para GET
  if (req.method === 'GET') {
    const cached = cache.get(key);
    if (cached) {
      return res.status(200).json({ cache: true, data: cached });
    }
  }

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { ...req.headers, host: undefined }
    });

    if (req.method === 'GET') {
      const ttl = obtenerTTL(req.originalUrl);
      cache.set(key, response.data, ttl);
      return res.status(response.status).json({ cache: false, data: response.data });
    }

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error en el proxy:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error en el gateway a Java',
      detalle: error.response?.data || {}
    });
  }
};

const limpiarCache = (req, res) => {
  cache.flushAll();
  res.json({ mensaje: 'Caché limpiado correctamente' });
};

module.exports = { reenviarPeticion, limpiarCache };
