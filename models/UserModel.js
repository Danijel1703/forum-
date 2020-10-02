const express = require('express');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema ({

        firstname : {
                type : String,
                required : true
        },
        lastname : {
                type : String,
                required : true
        },
        username : {
                type : String,
                required : true
        },
        password : {
                type : String,
                required : true
        },
        email : {
                type : String,
                required : true
        },
        college : {
                type : String,
                required : true
        }

});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');