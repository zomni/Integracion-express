const axios = require('axios');

const subirArchivoYNotificarJava = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  const { clienteId, tipo, pedidoId } = req.body;

  if (!pedidoId) {
    return res.status(400).json({ error: 'Falta el pedidoId en el formulario' });
  }

  try {
    const response = await axios.post('http://localhost:8080/pedido/comprobante/guardar', {
      pedidoId: Number(pedidoId),
      comprobanteUrl: url   // ✅ Este es el campo correcto según tu DTO
    });

    res.status(200).json({
      mensaje: 'Archivo subido y enviado al backend Java',
      url,
      respuestaJava: response.data
    });
  } catch (error) {
    console.error('Error al notificar a Java:', error.message);
    const mensajeJava = error.response?.data || error.message;

    res.status(500).json({
      error: 'El archivo se subió pero no se notificó a Java',
      mensajeJava,
      url
    });
  }
};

module.exports = { subirArchivoYNotificarJava };
