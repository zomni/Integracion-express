const express = require('express');
const router = express.Router();
const webpayPlus = require('../config/transbank');

// Iniciar transacción
router.post('/crear', async (req, res) => {
  let { monto, ordenCompra, sesionId } = req.body;

  try {
    ordenCompra = String(ordenCompra);
    sesionId = String(sesionId);
    monto = parseInt(monto);

    if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: 'Monto inválido' });
    }

    // Redireccionará a Angular tras finalizar el pago
    const returnUrl = `http://localhost:4200/pago/${ordenCompra.replace('ORD', '')}?metodo=transbank`;

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

// Nueva ruta GET: redirige a Angular
router.get('/confirmar.html', async (req, res) => {
  const { token_ws } = req.query;

  if (!token_ws) {
    return res.status(400).send('Token inválido');
  }

  try {
    // Confirmamos con Transbank
    const response = await webpayPlus.commit(token_ws);
    const ordenCompra = response.buy_order;

    // Extraer el número de pedido desde la orden
    const pedidoId = ordenCompra.replace('ORD', '');

    // Redireccionar al componente Angular con el token
    return res.redirect(
      `http://localhost:4200/pago/${pedidoId}?metodo=transbank&token_ws=${token_ws}`
    );
  } catch (error) {
    console.error('Error al confirmar transacción:', error);
    return res.status(500).send('Error al confirmar transacción');
  }
});

// API opcional para que Angular pueda consultar el estado con token_ws
router.get('/estado', async (req, res) => {
  const { token_ws } = req.query;

  if (!token_ws) {
    return res.status(400).json({ error: 'Token faltante' });
  }

  try {
    const response = await webpayPlus.commit(token_ws);
    res.status(200).json({
      estado: 'Exitoso',
      datos: response
    });
  } catch (error) {
    res.status(500).json({ estado: 'Fallido', error: 'Error al confirmar transacción' });
  }
});

module.exports = router;
