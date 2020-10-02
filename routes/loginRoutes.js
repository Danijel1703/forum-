const express = require('express');
const router = express.Router();
const LoginController = require('./../controllers/LoginController');
const { route } = require('./signupRoutes');
router.route('/').post(LoginController.authentication);
module.exports = router;