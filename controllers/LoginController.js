const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationController = require('./ValidationController');

const authentication = async (req,res) => {

        try {
            const {error} = ValidationController.loginValidation(req.body);
            if(error){
                res.status(400).json({
                    error : error.message
                });
            }
            const user = await User.findOne({username : req.body.username});
            if(!user){
                res.status(400).send('User not found.');
            }
            const validPass = await bcrypt.compare(req.body.password,user.password);
            if(validPass){
                const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET);
                res.cookie('login-token',token);
                res.cookie('currentUser',user.username);
                res.send(`Welcome ${user.username}`);
            }else if(!validPass){
                res.send('Password incorrect.');
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
}

const logout = (req,res) => {
    res.clearCookie('currentUser');
    res.send('You have been logged out.');
}

module.exports.authentication = authentication;
module.exports.logout = logout;