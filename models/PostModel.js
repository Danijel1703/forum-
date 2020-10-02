const express = require('express');
const mongoose = require('mongoose');
const { model } = require('./UserModel');

const PostSchema = new mongoose.Schema({
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        }, 
        author : {
            type : String,
            required : true
        }
});

mongoose.model('Post',PostSchema);
module.exports = mongoose.model('Post');