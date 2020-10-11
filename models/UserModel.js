const express = require('express');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema ({

        firstname : {
                type : String,
                min : 6,
                required : true
        },
        lastname : {
                type : String,
                required : true
        },
        username : {
                type : String,
                min : 6,
                required : true
        },
        password : {
                type : String,
                min : 6,
                required : true
        },
        email : {
                type : String,
                required : true
        },
        college : {
                type : String,
                required : true
        },
        role : {
                type : String,
                default : 'user'
        },
        posts : [{
                post : {
                        author : {
                                type : String      
                        },
                        content : {
                                type : String,
                                default : 'none'
                        }       
                }        
        }],
        comments : [{
                comment : {
                        author : {
                                type : String      
                        },
                        content : {
                                type : String,
                                required : true,
                                default : 'none'
                        }       
                }        
        }]

});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');