const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.post('/order', controller.createOrder);
router.get('/order/:numeroPedido', controller.getOrderByNumber);
router.get('/order/list', controller.listOrders);
router.put('/order/:numeroPedido', controller.updateOrder);
router.delete('/order/:numeroPedido', controller.deleteOrder);

module.exports = router;