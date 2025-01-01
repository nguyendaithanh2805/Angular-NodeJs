const express = require('express');
const router = express.Router();
const menuController = require('../controllers/MenuController');

router.get('/menus', menuController.getAllProducts);
router.get('/menus/:id', menuController.getProductById);
module.exports = router;