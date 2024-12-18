const express = require('express');
const router = express.Router();
const menuController = require('../controllers/MenuController');

router.get('/menus', menuController.getAllProducts);
module.exports = router;