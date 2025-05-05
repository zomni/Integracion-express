// src/routes/notificacion.routes.js
const express = require('express');
const router = express.Router();
const {
  enviarConfirmacion,
  enviarPromocion,
  enviarRecordatorio,
  enviarGenerico
} = require('../controllers/notificacion.controller');

// POST /notificacion/confirmar - Confirmación de pedido
router.post('/confirmar', enviarConfirmacion);
// POST /notificacion/promocion - Enviar promoción
router.post('/promocion', enviarPromocion);
// POST /notificacion/recordatorio - Enviar recordatorio
router.post('/recordatorio', enviarRecordatorio);
// POST /notificacion/enviar - Enviar mensaje genérico
router.post('/enviar', enviarGenerico);

module.exports = router;
