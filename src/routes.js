const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta que consulta todos los usuarios del backend Java
router.get('/usuarios-java', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/usuario');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios del backend Java' });
  }
});

module.exports = router;
