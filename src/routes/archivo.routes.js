const express = require('express');
const multer = require('multer');
const { subirArchivoYNotificarJava } = require('../controllers/archivo.controller');

const router = express.Router();

// Configuración para almacenar los archivos localmente
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const nombreUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

// Nueva ruta: recibe imagen y datos del cliente
router.post('/', upload.single('archivo'), subirArchivoYNotificarJava);

module.exports = router;
