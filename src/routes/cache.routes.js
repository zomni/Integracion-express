const express = require('express');
const { clearCache } = require('../middlewares/cache.middleware');

const router = express.Router();

router.get('/clear', (req, res) => {
  clearCache();
  res.json({ mensaje: 'Caché limpiado correctamente' });
});

module.exports = router;
