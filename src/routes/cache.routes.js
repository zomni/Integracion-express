const express = require('express');
const cache = require('../utils/cache');

const router = express.Router();

router.get('/clear', (req, res) => {
  cache.flushAll();
  res.json({ mensaje: 'Caché limpiado correctamente' });
});

router.post('/clear/ruta', (req, res) => {
  const { ruta } = req.body;

  if (!ruta) {
    return res.status(400).json({ error: 'Falta el campo "ruta"' });
  }

  const eliminado = cache.del(ruta);
  res.json({
    mensaje: `Caché de la ruta "${ruta}" limpiado`,
    resultado: eliminado
  });
});

module.exports = router;
