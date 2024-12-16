const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/carts', cartController.getAllCarts);
router.get('/carts/:id', cartController.getCartByUserId);
router.post('/carts', cartController.addCart);
router.put('/carts/:id', cartController.updateCart);
router.delete('/carts/:id', cartController.deleteCart);

module.exports = router;