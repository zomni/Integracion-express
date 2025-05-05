const axios = require('axios');
const { EMAIL_VALIDATION_API_KEY } = process.env;

const validarEmail = async (email) => {
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${EMAIL_VALIDATION_API_KEY}&email=${email}`;

  const response = await axios.get(url);
  const { deliverability, is_valid_format, is_mx_found, is_disposable_email } = response.data;

  return {
    formatoValido: is_valid_format.value,
    puedeRecibirCorreo: deliverability === 'DELIVERABLE',
    tieneMX: is_mx_found.value,
    esTemporal: is_disposable_email.value
  };
};

const validarGeolocalizacion = async (ip) => {
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.IP_GEOLOCATION_API_KEY}&ip_address=${ip}`;
    const response = await axios.get(url);
    const { city, region, country, timezone, connection } = response.data;
  
    return {
      ciudad: city,
      region,
      pais: country,
      zonaHoraria: timezone?.name,
      proveedor: connection?.isp_name
    };
  };

  const validarTelefono = async (numero) => {
    const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.PHONE_VALIDATION_API_KEY}&phone=${numero}`;
    const response = await axios.get(url);
    const data = response.data;
  
    return {
      valido: data.valid,
      formato: data.format?.international,
      pais: data.country?.name,
      compañia: data.carrier,
      tipo: data.type
    };
  };
  

module.exports = { validarEmail,
    validarGeolocalizacion,
    validarTelefono
 };
