const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');

router.post('/login', loginController.login);
router.post('/register', userController.addUser);

module.exports = router;