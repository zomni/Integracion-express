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

  const fs = require('fs');
  const path = require('path');
  const historialPath = path.resolve('./historial.json');
  
  const obtenerHistorial = (req, res) => {
    try {
      if (!fs.existsSync(historialPath)) {
        return res.status(200).json({ historial: [], resumen: {} });
      }
  
      const data = JSON.parse(fs.readFileSync(historialPath, 'utf-8'));
      const { tipo, desde, hasta, resumen } = req.query;
  
      let filtrado = data;
  
      if (tipo) {
        filtrado = filtrado.filter(item => item.tipo === tipo);
      }
  
      if (desde) {
        const desdeDate = new Date(desde);
        filtrado = filtrado.filter(item => new Date(item.fecha) >= desdeDate);
      }
  
      if (hasta) {
        const hastaDate = new Date(hasta);
        filtrado = filtrado.filter(item => new Date(item.fecha) <= hastaDate);
      }
  
      if (resumen === 'true') {
        const resumenTipos = {};
        for (const item of filtrado) {
          resumenTipos[item.tipo] = (resumenTipos[item.tipo] || 0) + 1;
        }
  
        return res.status(200).json({
          historial: filtrado,
          resumen: resumenTipos
        });
      }
  
      res.status(200).json({ historial: filtrado });
    } catch (error) {
      console.error('Error al leer historial:', error.message);
      res.status(500).json({ error: 'No se pudo leer el historial' });
    }
  };  

  const descargarHistorial = (req, res) => {
    try {
      if (!fs.existsSync(historialPath)) {
        return res.status(404).json({ error: 'No hay historial disponible' });
      }
  
      res.download(historialPath, 'historial_correos.json');
    } catch (error) {
      console.error('Error al descargar historial:', error.message);
      res.status(500).json({ error: 'No se pudo descargar el historial' });
    }
  };

  const borrarHistorial = (req, res) => {
  const { clave } = req.body;

  // Clave maestra para autorización (puedes ponerla en .env si prefieres)
  const CLAVE_MAESTRA = 'borrar123';

  if (clave !== CLAVE_MAESTRA) {
    return res.status(403).json({ error: 'Clave incorrecta. No autorizado.' });
  }

  try {
    if (fs.existsSync(historialPath)) {
      fs.writeFileSync(historialPath, '[]');
      return res.status(200).json({ mensaje: 'Historial borrado correctamente' });
    } else {
      return res.status(404).json({ error: 'No existe historial para borrar' });
    }
  } catch (error) {
    console.error('Error al borrar historial:', error.message);
    return res.status(500).json({ error: 'No se pudo borrar el historial' });
  }
};

  
  module.exports = {
    enviarConfirmacion,
    enviarPromocion: enviarPromocionHandler,
    enviarRecordatorio: enviarRecordatorioHandler,
    enviarGenerico,
    obtenerHistorial,
    descargarHistorial,
    borrarHistorial
  };
  