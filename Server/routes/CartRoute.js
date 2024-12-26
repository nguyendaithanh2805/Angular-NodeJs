const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/carts/:id', cartController.getCartByUserId);
router.post('/carts', cartController.addCart);
router.delete('/carts/:id', cartController.deleteCart);

module.exports = router;