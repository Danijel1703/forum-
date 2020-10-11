const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');
const router = require('./routes/router')
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine','ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/',router);

module.exports = app;
