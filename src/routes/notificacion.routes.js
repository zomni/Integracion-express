// src/routes/notificacion.routes.js
const express = require('express');
const router = express.Router();
const {
  enviarConfirmacion,
  enviarPromocion,
  enviarRecordatorio,
  enviarGenerico,
  obtenerHistorial,
  descargarHistorial,
  borrarHistorial
} = require('../controllers/notificacion.controller');

// POST /notificacion/confirmar - Confirmación de pedido
router.post('/confirmar', enviarConfirmacion);
// POST /notificacion/promocion - Enviar promoción
router.post('/promocion', enviarPromocion);
// POST /notificacion/recordatorio - Enviar recordatorio
router.post('/recordatorio', enviarRecordatorio);
// POST /notificacion/enviar - Enviar mensaje genérico
router.post('/enviar', enviarGenerico);
// GET /notificacion/historial - Obtener historial de mail
router.get('/historial', obtenerHistorial);
// GET /notificacion/descargar - Descargar historial de mail
router.get('/historial/descargar', descargarHistorial);

router.delete('/historial/borrar', borrarHistorial);


module.exports = router;
