const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/orders', orderController.addOrder);
router.get('/orders/:id', orderController.getOrderById);

module.exports = router;