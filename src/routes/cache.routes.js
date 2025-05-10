const express = require('express');
const cache = require('../utils/cache');

const router = express.Router();

router.get('/clear', (req, res) => {
  cache.flushAll();
  res.json({ mensaje: 'Caché limpiado correctamente' });
});

module.exports = router;
