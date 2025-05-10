// src/middlewares/cache.middleware.js
const cache = require('../utils/cache'); // usa el cache central
const rutaTTL = {
  '/java-api/usuario': 60,
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

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const ttl = rutaTTL[key] || 60;

  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.status(200).json({
      cache: true,
      data: cachedResponse
    });
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, body, ttl);
    return originalJson({
      cache: false,
      data: body
    });
  };

  next();
};

module.exports = {
  cacheMiddleware
};
