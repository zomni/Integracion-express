const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const generarConfirmacion = require('../templates/confirmacion');
const generarPromocion = require('../templates/promocion');
const generarRecordatorio = require('../templates/recordatorio');
const generarGenerico = require('../templates/generico');

const historialPath = path.resolve('./historial.json');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srzomni@gmail.com',
    pass: 'doxm gugw qbmf muge'
  }
});

const guardarHistorial = (info) => {
  const historico = fs.existsSync(historialPath)
    ? JSON.parse(fs.readFileSync(historialPath))
    : [];

  historico.push({ fecha: new Date().toISOString(), ...info });

  fs.writeFileSync(historialPath, JSON.stringify(historico, null, 2));
};

// FUNCIONES DE ENVÍO
const enviarConfirmacionPedido = async ({ destinatario, nombreCliente, numeroPedido }) => {
  const html = generarConfirmacion(nombreCliente, numeroPedido);
  const info = await transporter.sendMail({
    from: 'srzomni@gmail.com',
    to: destinatario,
    subject: 'Confirmación de pedido',
    html
  });
  guardarHistorial({ tipo: 'confirmacion', destinatario, nombreCliente, numeroPedido });
  return info;
};

const enviarPromocion = async ({ destinatario, titulo, contenido }) => {
  const html = generarPromocion(titulo, contenido);
  const info = await transporter.sendMail({
    from: 'srzomni@gmail.com',
    to: destinatario,
    subject: titulo,
    html
  });
  guardarHistorial({ tipo: 'promocion', destinatario, titulo });
  return info;
};

const enviarRecordatorio = async ({ destinatario, asunto, contenido }) => {
  const html = generarRecordatorio(asunto, contenido);
  const info = await transporter.sendMail({
    from: 'srzomni@gmail.com',
    to: destinatario,
    subject: asunto,
    html
  });
  guardarHistorial({ tipo: 'recordatorio', destinatario, asunto });
  return info;
};

const enviarCorreoGenerico = async ({ destinatario, asunto, mensaje }) => {
  const html = generarGenerico(asunto, mensaje);
  const info = await transporter.sendMail({
    from: 'srzomni@gmail.com',
    to: destinatario,
    subject: asunto,
    html
  });
  guardarHistorial({ tipo: 'generico', destinatario, asunto });
  return info;
};

// Enviar mensaje desde formulario de contacto
const enviarCorreoContacto = async ({ nombre, email, mensaje }) => {
  const mailOptions = {
    from: `"${nombre}" <${email}>`,
    to: 'srzomni@gmail.com',
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje:\n${mensaje}`
  };

  const info = await transporter.sendMail(mailOptions);
  guardarHistorial({ tipo: 'contacto', nombre, email, mensaje });
  return info;
};


module.exports = {
  enviarConfirmacionPedido,
  enviarPromocion,
  enviarRecordatorio,
  enviarCorreoGenerico,
  enviarCorreoContacto
};
