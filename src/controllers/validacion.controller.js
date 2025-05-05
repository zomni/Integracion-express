const { validarEmail } = require('../services/validacion.service');

const validarCorreo = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Debe proporcionar un correo electrónico' });

  try {
    const resultado = await validarEmail(email);
    res.json({ email, ...resultado });
  } catch (error) {
    console.error('Error al validar email:', error.message);
    res.status(500).json({ error: 'No se pudo validar el correo' });
  }
};

const { validarGeolocalizacion } = require('../services/validacion.service');

const validarIP = async (req, res) => {
  const { ip } = req.body;

  if (!ip) return res.status(400).json({ error: 'Debe proporcionar una dirección IP' });

  try {
    const resultado = await validarGeolocalizacion(ip);
    res.json({ ip, ...resultado });
  } catch (error) {
    console.error('Error al obtener geolocalización:', error.message);
    res.status(500).json({ error: 'No se pudo obtener la geolocalización' });
  }
};

const { validarTelefono } = require('../services/validacion.service');

const validarNumeroTelefono = async (req, res) => {
  const { numero } = req.body;

  if (!numero) {
    return res.status(400).json({ error: 'Debe proporcionar un número telefónico' });
  }

  try {
    const resultado = await validarTelefono(numero);
    res.json({ numero, ...resultado });
  } catch (error) {
    console.error('Error al validar teléfono:', error.message);
    res.status(500).json({ error: 'No se pudo validar el número' });
  }
};


const axios = require('axios');
const { RECAPTCHA_SECRET_KEY } = process.env;

const validarRecaptcha = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ error: 'Token reCAPTCHA faltante' });
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );

    const { success, score, action } = response.data;

    if (!success) {
      return res.status(403).json({ error: 'reCAPTCHA inválido' });
    }

    res.json({ mensaje: 'reCAPTCHA válido', score, action });
  } catch (error) {
    console.error('Error validando reCAPTCHA:', error.message);
    res.status(500).json({ error: 'Error validando reCAPTCHA' });
  }
};

module.exports = { validarCorreo,
    validarIP,
    validarNumeroTelefono,
    validarRecaptcha
 };
