const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
router.post('/orders', orderController.addOrder);
router.get('/admin/orders', orderController.getAllOrders);
router.get('/admin/orders/:id', orderController.getOrderById);
router.put('/admin/orders/:id', orderController.updateOrder);
router.delete('/admin/orders/:id', orderController.deleteOrder);

module.exports = router;