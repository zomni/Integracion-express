const axios = require('axios');
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
  const method = req.method.toLowerCase();
  const quierePDF = req.headers.accept === 'application/pdf';

  // Solo caché para GET y si no es PDF
  if (method === 'get' && !quierePDF) {
    const cached = cache.get(key);
    if (cached) {
      return res.status(200).json({ cache: true, data: cached });
    }
  }

  try {
    const axiosConfig = {
      method,
      url,
      headers: { ...req.headers, host: undefined },
      responseType: quierePDF ? 'stream' : 'json',
      data: ['post', 'put', 'patch'].includes(method) ? req.body : undefined
    };

    const response = await axios(axiosConfig);

    if (quierePDF && response.status >= 200 && response.status < 300) {
      res.setHeader('Content-Type', 'application/pdf');
      return response.data.pipe(res);
    }

    // Guardar en caché solo si la respuesta fue exitosa
    if (method === 'get' && !quierePDF && response.status >= 200 && response.status < 300) {
      const ttl = obtenerTTL(req.originalUrl);
      cache.set(key, response.data, ttl);
    }

    return res.status(response.status).json({ cache: false, data: response.data });

  } catch (error) {
    const status = error.response?.status || 500;

    if (quierePDF) {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(status).send(`Error al generar el PDF: ${error.message}`);
    }

    const data = error.response?.data || { mensaje: error.message };
    console.error('Error en el proxy:', data);

    return res.status(status).json({
      error: 'Error en el gateway a Java',
      detalle: data
    });
  }
};

const limpiarCache = (req, res) => {
  cache.flushAll();
  res.json({ mensaje: 'Caché limpiado correctamente' });
};

module.exports = { reenviarPeticion, limpiarCache };
