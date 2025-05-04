const mailerService = require('../services/mailer.service');

const enviarContacto = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const info = await mailerService.enviarCorreoContacto({ nombre, email, mensaje });

    res.status(200).json({ mensaje: 'Mensaje enviado con éxito', detalle: info.messageId });
  } catch (error) {
    console.error('Error al enviar contacto:', error.message);
    res.status(500).json({ error: 'No se pudo enviar el mensaje' });
  }
};

module.exports = { enviarContacto };