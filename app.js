const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRoutes');
const signupRouter = require('./routes/signupRoutes');
const postsRouter = require('./routes/postsRoutes');
const { json } = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(session({secret: 'secret',saveUninitialized: false,resave: false}));
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/posts', postsRouter);
app.get('/logout',(req,res) => {
    res.clearCookie('user');
    req.session.destroy();
    res.status(200).send('Session destroyed');
}); 
module.exports = app;
