const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateproduct);
router.delete('/products/:id', productController.deleteproduct);

module.exports = router;