const {
    enviarConfirmacionPedido,
    enviarPromocion,
    enviarRecordatorio,
    enviarCorreoGenerico
  } = require('../services/mailer.service');
  
  const enviarConfirmacion = async (req, res) => {
    try {
      const { destinatario, nombreCliente, numeroPedido } = req.body;
  
      if (!destinatario || !nombreCliente || !numeroPedido) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
  
      const info = await enviarConfirmacionPedido({ destinatario, nombreCliente, numeroPedido });
  
      res.status(200).json({ mensaje: 'Correo de confirmación enviado', id: info.messageId });
    } catch (error) {
      console.error('Error al enviar confirmación:', error.message);
      res.status(500).json({ error: 'No se pudo enviar la confirmación' });
    }
  };
  
  const enviarPromocionHandler = async (req, res) => {
    try {
      const { destinatario, titulo, contenido } = req.body;
  
      if (!destinatario || !titulo || !contenido) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
  
      const info = await enviarPromocion({ destinatario, titulo, contenido });
  
      res.status(200).json({ mensaje: 'Correo de promoción enviado', id: info.messageId });
    } catch (error) {
      console.error('Error al enviar promoción:', error.message);
      res.status(500).json({ error: 'No se pudo enviar la promoción' });
    }
  };
  
  const enviarRecordatorioHandler = async (req, res) => {
    try {
      const { destinatario, asunto, contenido } = req.body;
  
      if (!destinatario || !asunto || !contenido) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
  
      const info = await enviarRecordatorio({ destinatario, asunto, contenido });
  
      res.status(200).json({ mensaje: 'Recordatorio enviado', id: info.messageId });
    } catch (error) {
      console.error('Error al enviar recordatorio:', error.message);
      res.status(500).json({ error: 'No se pudo enviar el recordatorio' });
    }
  };
  
  const enviarGenerico = async (req, res) => {
    try {
      const { destinatario, asunto, mensaje } = req.body;
  
      if (!destinatario || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
  
      const info = await enviarCorreoGenerico({ destinatario, asunto, mensaje });
  
      res.status(200).json({ mensaje: 'Correo enviado', id: info.messageId });
    } catch (error) {
      console.error('Error al enviar correo genérico:', error.message);
      res.status(500).json({ error: 'No se pudo enviar el correo' });
    }
  };
  
  module.exports = {
    enviarConfirmacion,
    enviarPromocion: enviarPromocionHandler,
    enviarRecordatorio: enviarRecordatorioHandler,
    enviarGenerico
  };
  