const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', categoryController.addCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;