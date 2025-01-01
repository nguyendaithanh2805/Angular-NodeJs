const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.patch('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders', orderController.getAllOrders);
module.exports = router;