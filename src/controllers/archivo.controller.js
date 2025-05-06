const axios = require('axios');

const subirArchivoYNotificarJava = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  const { clienteId, tipo } = req.body; // puedes mandar más info si quieres

  try {
    // Cambia la URL según tu endpoint real en Java
    const response = await axios.post('http://localhost:8080/comprobante/guardar', {
      clienteId,
      urlComprobante: url,
      tipo: tipo || 'FACTURA' // o 'PRODUCTO', etc.
    });

    res.status(200).json({
      mensaje: 'Archivo subido y enviado al backend Java',
      url,
      respuestaJava: response.data
    });
  } catch (error) {
    console.error('Error al notificar a Java:', error.message);
    res.status(500).json({
      error: 'El archivo se subió pero no se notificó a Java',
      url
    });
  }
};

module.exports = { subirArchivoYNotificarJava };
