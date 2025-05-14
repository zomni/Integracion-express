const express = require('express');
const router = express.Router();
const webpayPlus = require('../config/transbank');

// Iniciar transacción
router.post('/crear', async (req, res) => {
  let { monto, ordenCompra, sesionId } = req.body;

  try {
    // Forzamos los tipos correctos
    ordenCompra = String(ordenCompra);
    sesionId = String(sesionId);
    monto = parseInt(monto);

    if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: 'Monto inválido' });
    }

    const returnUrl = 'http://localhost:3000/webpay/confirmar.html';

    const response = await webpayPlus.create(
      ordenCompra,
      sesionId,
      monto,
      returnUrl
    );

    res.status(200).json({
      mensaje: 'Transacción creada correctamente',
      token: response.token,
      url: response.url,
      redirect: `${response.url}?token_ws=${response.token}`
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
});

// Confirmar transacción
router.post('/confirmar', async (req, res) => {
  const { token_ws } = req.body;

  try {
    const response = await webpayPlus.commit(token_ws);
    res.status(200).json({
      mensaje: 'Transacción confirmada',
      datos: response
    });
  } catch (error) {
    console.error('Error al confirmar transacción:', error);
    res.status(500).json({ error: 'Error al confirmar transacción' });
  }
});

module.exports = router;
