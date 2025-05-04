const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srzomni@gmail.com',       // tu correo de Gmail
    pass: 'doxm gugw qbmf muge'       // tu contraseña de aplicación de Gmail
  }
});

const enviarCorreoContacto = async ({ nombre, email, mensaje }) => {
  const mailOptions = {
    from: `"${nombre}" <${email}>`,
    to: 'srzomni@gmail.com',          // destino (puede ser el mismo u otro)
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje:\n${mensaje}`
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = { enviarCorreoContacto };
