// src/services/mailer.service.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srzomni@gmail.com',
    pass: 'doxm gugw qbmf muge' // contraseña de aplicación de Gmail
  }
});

// Enviar mensaje desde formulario de contacto
const enviarCorreoContacto = async ({ nombre, email, mensaje }) => {
  const mailOptions = {
    from: `"${nombre}" <${email}>`,
    to: 'srzomni@gmail.com',
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje:\n${mensaje}`
  };

  return await transporter.sendMail(mailOptions);
};

// Confirmación de pedido
const enviarConfirmacionPedido = async ({ destinatario, nombreCliente, numeroPedido }) => {
  const mailOptions = {
    from: 'Ferramas <srzomni@gmail.com>',
    to: destinatario,
    subject: 'Confirmación de tu pedido',
    text: `Hola ${nombreCliente}, tu pedido #${numeroPedido} ha sido confirmado. Gracias por comprar en Ferramas.`
  };

  return await transporter.sendMail(mailOptions);
};

// Envío de promoción
const enviarPromocion = async ({ destinatario, titulo, contenido }) => {
  const mailOptions = {
    from: 'Ferramas <srzomni@gmail.com>',
    to: destinatario,
    subject: titulo,
    text: contenido
  };

  return await transporter.sendMail(mailOptions);
};

// Recordatorio
const enviarRecordatorio = async ({ destinatario, asunto, contenido }) => {
  const mailOptions = {
    from: 'Ferramas <srzomni@gmail.com>',
    to: destinatario,
    subject: asunto,
    text: contenido
  };

  return await transporter.sendMail(mailOptions);
};

// Uso genérico
const enviarCorreoGenerico = async ({ destinatario, asunto, mensaje }) => {
  const mailOptions = {
    from: 'Ferramas <srzomni@gmail.com>',
    to: destinatario,
    subject: asunto,
    text: mensaje
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  enviarCorreoContacto,
  enviarConfirmacionPedido,
  enviarPromocion,
  enviarRecordatorio,
  enviarCorreoGenerico
};
