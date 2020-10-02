const express = require('express');
const mongoose = require('mongoose');
const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const DB = process.env.DB_NAME.replace('<password>',process.env.DB_PASSWORD);

mongoose.connect(DB,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
    })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(() => {
        console.log('error');
    });

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Listening from port 8000...')
});
