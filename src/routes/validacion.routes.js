const express = require('express');
const router = express.Router();
const { validarCorreo, validarIP, validarNumeroTelefono, validarRecaptcha } = require('../controllers/validacion.controller');

router.post('/email', validarCorreo);
router.post('/ip', validarIP);
router.post('/telefono', validarNumeroTelefono);
router.post('/recaptcha', validarRecaptcha);

module.exports = router;
