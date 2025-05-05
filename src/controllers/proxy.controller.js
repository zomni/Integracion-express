const axios = require('axios');
const JAVA_API = 'http://localhost:8080';

const reenviarPeticion = async (req, res) => {
  const url = `${JAVA_API}${req.url}`;

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { ...req.headers, host: undefined }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error en el proxy:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error en el gateway a Java',
      detalle: error.response?.data || {}
    });
  }
};

module.exports = { reenviarPeticion };
