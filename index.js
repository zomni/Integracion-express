const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dirección del backend Java
const JAVA_API = 'http://localhost:8080/';

// Rutas locales de Express
const contactoRoutes = require('./src/routes/contacto.routes');
app.use('/contacto', contactoRoutes);

// Rutas Java

// GET - Obtener todos los usuarios
app.get('/usuario', async (req, res) => {
  try {
    const response = await axios.get(JAVA_API.concat('usuario'));
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al obtener usuarios' });
  }
});

app.get('/sucursal', async (req, res) => {
  try {
    const response = await axios.get(JAVA_API.concat('sucursal'));
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST - Crear un nuevo usuario
app.post('/usuario', async (req, res) => {
  try {
    const response = await axios.post(JAVA_API.concat('usuario'), req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Error inesperado' });
  }
});

// PUT - Editar un usuario por ID
app.put('/usuario/:id', async (req, res) => {
  try {
    const response = await axios.put(`${JAVA_API.concat('usuario')}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al actualizar usuario' });
  }
});

// DELETE - Eliminar usuario por ID
app.delete('/usuario/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${JAVA_API.concat('usuario')}/${req.params.id}`);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al eliminar usuario' });
  }
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
