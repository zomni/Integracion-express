const express = require('express');
const router = express.Router();
const { getTasaDolar } = require('../controllers/divisa.controller');

router.get('/', getTasaDolar);

module.exports = router;
