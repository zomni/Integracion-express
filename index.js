const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware base
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Dirección del backend Java (ajustable desde .env si lo deseas)
const JAVA_API = 'http://localhost:8080';

// Rutas locales
const contactoRoutes = require('./src/routes/contacto.routes');
const divisaRoutes = require('./src/routes/divisa.routes');
const notificacionRoutes = require('./src/routes/notificacion.routes');
const validacionRoutes = require('./src/routes/validacion.routes');
const proxyRoutes = require('./src/routes/proxy.routes');

// Middleware de caché
const { cacheMiddleware } = require('./src/middlewares/cache.middleware');
const cacheRoutes = require('./src/routes/cache.routes');

// Endpoint para limpiar la caché desde Postman
app.use('/cache', cacheRoutes);

// Rutas que se beneficiarán de caché
const rutasConCache = [
  '/java-api/usuario/ListaUsuarios',
  '/java-api/producto',
  '/java-api/categoria',
  '/java-api/marca',
  '/java-api/sucursal',
  '/java-api/region',
  '/java-api/ciudad',
  '/java-api/comuna',
  '/java-api/tipoentrega',
  '/java-api/metodopago',
  '/java-api/rol'
];

// Aplicar caché solo a rutas GET seleccionadas
rutasConCache.forEach((ruta) => {
  app.use(ruta, cacheMiddleware);
});

// Rutas principales
app.use('/contacto', contactoRoutes);
app.use('/divisa', divisaRoutes);
app.use('/notificacion', notificacionRoutes);
app.use('/validacion', validacionRoutes);
app.use('/java-api', proxyRoutes); // Gateway hacia Java

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
