const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const imageMiddleware = require('../middlewares/HandleImage');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', imageMiddleware.uploadImage, productController.addProduct);
router.put('/products/:id', imageMiddleware.uploadImage, productController.updateproduct);
router.delete('/products/:id', productController.deleteproduct);

module.exports = router;