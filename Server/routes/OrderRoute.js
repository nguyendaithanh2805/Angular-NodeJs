const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
router.get('/admin/orders', orderController.getAllOrders);
router.get('/admin/carts/:id', orderController.getOrderById);
router.post('/carts', orderController.addOrder);
router.put('/admin/carts/:id', orderController.updateOrder);
router.delete('/admin/carts/:id', orderController.deleteOrder);

module.exports = router;