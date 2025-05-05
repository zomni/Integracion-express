const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Dirección del backend Java (puede ajustarse vía .env si quieres)
const JAVA_API = 'http://localhost:8080';

// Rutas locales de Express
const contactoRoutes = require('./src/routes/contacto.routes');
const divisaRoutes = require('./src/routes/divisa.routes');
const notificacionRoutes = require('./src/routes/notificacion.routes');
const validacionRoutes = require('./src/routes/validacion.routes');
const proxyRoutes = require('./src/routes/proxy.routes');

app.use('/contacto', contactoRoutes);
app.use('/divisa', divisaRoutes);
app.use('/notificacion', notificacionRoutes);
app.use('/validacion', validacionRoutes);
app.use('/java-api', proxyRoutes); // Gateway hacia Java

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
