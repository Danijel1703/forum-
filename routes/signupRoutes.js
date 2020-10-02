const express = require('express');
const mongoose = require('mongoose');
const SignupController = require('../controllers/SignupController');
const router = express.Router();

router.route('/').post(SignupController.newUser);
module.exports = router;