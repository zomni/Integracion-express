const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');

// ========== CATEGORIA ==========
router.get('/categoria', proxyController.reenviarPeticion);
router.get('/categoria/:id', proxyController.reenviarPeticion);
router.post('/categoria', proxyController.reenviarPeticion);
router.put('/categoria/:id', proxyController.reenviarPeticion);
router.delete('/categoria/:id', proxyController.reenviarPeticion);

// ========== CIUDAD ==========
router.get('/ciudad', proxyController.reenviarPeticion);
router.get('/ciudad/:id', proxyController.reenviarPeticion);
router.post('/ciudad', proxyController.reenviarPeticion);
router.delete('/ciudad/:id', proxyController.reenviarPeticion);

// ========== CLIENTES ==========
router.get('/cliente', proxyController.reenviarPeticion);
router.post('/cliente', proxyController.reenviarPeticion);
router.patch('/cliente/cambiopassword/:id', proxyController.reenviarPeticion);

// ========== COMUNA ==========
router.get('/comuna', proxyController.reenviarPeticion);
router.get('/comuna/:id', proxyController.reenviarPeticion);
router.post('/comuna', proxyController.reenviarPeticion);
router.delete('/comuna/:id', proxyController.reenviarPeticion);

// ========== DESPACHO ==========
router.get('/despacho', proxyController.reenviarPeticion);
router.get('/despacho/:id', proxyController.reenviarPeticion);
router.post('/despacho', proxyController.reenviarPeticion);
router.delete('/despacho/:id', proxyController.reenviarPeticion);
router.patch('/despacho/actualizardespacho/:id', proxyController.reenviarPeticion);

// ========== DETALLE PEDIDO ==========
router.get('/detallepedido', proxyController.reenviarPeticion);
router.get('/detallepedido/:id', proxyController.reenviarPeticion);
router.post('/detallepedido', proxyController.reenviarPeticion);
router.delete('/detallepedido/:id', proxyController.reenviarPeticion);

// ========== ESTADO DESPACHO ==========
router.get('/estadodespacho', proxyController.reenviarPeticion);
router.get('/estadodespacho/:id', proxyController.reenviarPeticion);
router.post('/estadodespacho', proxyController.reenviarPeticion);
router.delete('/estadodespacho/:id', proxyController.reenviarPeticion);

// ========== ESTADO PAGO ==========
router.get('/estadopago', proxyController.reenviarPeticion);
router.get('/estadopago/:id', proxyController.reenviarPeticion);
router.post('/estadopago', proxyController.reenviarPeticion);
router.delete('/estadopago/:id', proxyController.reenviarPeticion);

// ========== ESTADO PEDIDO ==========
router.get('/estadopedido', proxyController.reenviarPeticion);
router.get('/estadopedido/:id', proxyController.reenviarPeticion);
router.post('/estadopedido', proxyController.reenviarPeticion);
router.delete('/estadopedido/:id', proxyController.reenviarPeticion);

// ========== HISTORIAL ESTADO ==========
router.get('/historialestado', proxyController.reenviarPeticion);
router.get('/historialestado/:id', proxyController.reenviarPeticion);
router.post('/historialestado', proxyController.reenviarPeticion);
router.delete('/historialestado/:id', proxyController.reenviarPeticion);

// ========== HISTORIAL PRECIO ==========
router.get('/historialprecio', proxyController.reenviarPeticion);
router.get('/historialprecio/:id', proxyController.reenviarPeticion);
router.post('/historialprecio', proxyController.reenviarPeticion);
router.delete('/historialprecio/:id', proxyController.reenviarPeticion);

// ========== INVENTARIO ==========
router.get('/inventario', proxyController.reenviarPeticion);
router.get('/inventario/:id', proxyController.reenviarPeticion);
router.get('/inventario/sucursal/:sucursalId', proxyController.reenviarPeticion);
router.post('/inventario', proxyController.reenviarPeticion);
router.delete('/inventario/:id', proxyController.reenviarPeticion);
router.patch('/inventario/actualizarInventario/:id', proxyController.reenviarPeticion);

// ========== MARCA ==========
router.get('/marca', proxyController.reenviarPeticion);
router.get('/marca/:id', proxyController.reenviarPeticion);
router.post('/marca', proxyController.reenviarPeticion);
router.delete('/marca/:id', proxyController.reenviarPeticion);

// ========== METODO PAGO ==========
router.get('/metodopago', proxyController.reenviarPeticion);
router.get('/metodopago/:id', proxyController.reenviarPeticion);
router.post('/metodopago', proxyController.reenviarPeticion);
router.delete('/metodopago/:id', proxyController.reenviarPeticion);

// ========== MOVIMIENTO INVENTARIO ==========
router.get('/movimientoinventario', proxyController.reenviarPeticion);
router.get('/movimientoinventario/:id', proxyController.reenviarPeticion);
router.post('/movimientoinventario', proxyController.reenviarPeticion);
router.delete('/movimientoinventario/:id', proxyController.reenviarPeticion);

// ========== PAGO ==========
router.get('/pago', proxyController.reenviarPeticion);
router.get('/pago/:id', proxyController.reenviarPeticion);
router.post('/pago', proxyController.reenviarPeticion);
router.delete('/pago/:id', proxyController.reenviarPeticion);
router.patch('/pago/actualizarEstado/:id', proxyController.reenviarPeticion);

// ========== PEDIDO ==========
router.get('/pedido', proxyController.reenviarPeticion);
router.get('/pedido/:id', proxyController.reenviarPeticion);
router.post('/pedido', proxyController.reenviarPeticion);
router.delete('/pedido/:id', proxyController.reenviarPeticion);
router.post('/pedido/comprobante/guardar', proxyController.reenviarPeticion);
router.patch('/pedido/cambiarEstado/:id', proxyController.reenviarPeticion);

// ========== PRODUCTO ==========
router.get('/producto', proxyController.reenviarPeticion);
router.get('/producto/:id', proxyController.reenviarPeticion);
router.post('/producto', proxyController.reenviarPeticion);
router.delete('/producto/:id', proxyController.reenviarPeticion);
router.patch('/producto/actualizarproducto/:id', proxyController.reenviarPeticion);

// ========== REGION ==========
router.get('/region', proxyController.reenviarPeticion);
router.get('/region/:id', proxyController.reenviarPeticion);
router.post('/region', proxyController.reenviarPeticion);
router.delete('/region/:id', proxyController.reenviarPeticion);

// ========== ROL ==========
router.get('/rol', proxyController.reenviarPeticion);
router.get('/rol/:id', proxyController.reenviarPeticion);
router.post('/rol', proxyController.reenviarPeticion);
router.delete('/rol/:id', proxyController.reenviarPeticion);

// ========== SUCURSAL ==========
router.get('/sucursal', proxyController.reenviarPeticion);
router.get('/sucursal/:id', proxyController.reenviarPeticion);
router.post('/sucursal', proxyController.reenviarPeticion);
router.delete('/sucursal/:id', proxyController.reenviarPeticion);

// ========== TIPO ENTREGA ==========
router.get('/tipoentrega', proxyController.reenviarPeticion);

router.get('/tipoentrega/:id', proxyController.reenviarPeticion);
router.post('/tipoentrega', proxyController.reenviarPeticion);
router.delete('/tipoentrega/:id', proxyController.reenviarPeticion);

// ========== TIPO MOVIMIENTO ==========
router.get('/tipomov', proxyController.reenviarPeticion);
router.get('/tipomov/:id', proxyController.reenviarPeticion);
router.post('/tipomov', proxyController.reenviarPeticion);
router.delete('/tipomov/:id', proxyController.reenviarPeticion);

// ========== USUARIO ==========
router.get('/usuario', proxyController.reenviarPeticion);
router.get('/usuario/:id', proxyController.reenviarPeticion);
router.get('/usuario/usuarioporsucursal/:id', proxyController.reenviarPeticion)
router.get('/usuario//usuarioporrol/:id', proxyController.reenviarPeticion);
router.post('/usuario', proxyController.reenviarPeticion);
router.post('/usuario/login', proxyController.reenviarPeticion);
router.patch('/usuario/actualizarusuario/:id', proxyController.reenviarPeticion);
router.patch('/usuario/cambiopassword/:id', proxyController.reenviarPeticion);

// ========== REPORTE ==========
router.get('/reporte/ventas', proxyController.reenviarPeticion);
router.get('/reporte/pagos', proxyController.reenviarPeticion);
router.get('/reporte/productos-mas-vendidos', proxyController.reenviarPeticion);
router.get('/reporte/dashboard', proxyController.reenviarPeticion);

module.exports = router;
