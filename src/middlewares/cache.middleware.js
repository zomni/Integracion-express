const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 60 segundos

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.status(200).json({
      cache: true,
      data: cachedResponse
    });
  }

  // Captura la respuesta original
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, body);
    return originalJson({
      cache: false,
      data: body
    });
  };

  next();
};

const clearCache = () => {
  cache.flushAll();
};

module.exports = {
  cacheMiddleware,
  clearCache
};
