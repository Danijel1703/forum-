const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationController = require('./ValidationController');
const { required } = require('@hapi/joi');

const viewLogin = async (req,res) => {
    try {
        if(req.cookies['currentUser']){
            res.send('You are already logged in')
        }else {
            res.render('LoginView',{
                message : ""
            });
        }
    }catch (err) {

    }
}
const authentication = async (req,res) => {

        try {
            const {err} = ValidationController.loginValidation(req.body);
            if(err){
                res.status(400).json({
                    error : err.message
                });
            }
            const user = await User.findOne({username : req.body.username.trim()});
            if(!user){
                res.render('LoginView',{
                    message : 'User not found'
                })
            }
            const validPass = await bcrypt.compare(req.body.password,user.password);
            if(validPass){
                const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET);
                res.cookie('login-token',token);
                res.cookie('currentUser',user.username,{expires:new Date(Date.now()+7200000)}); 
                res.cookie('userRole',user.role,{expires:new Date(Date.now() + 7200000)});
                return res.redirect('home');
            }else if(!validPass){
                res.render('LoginView',{
                    message : "Invalid password"
                });                
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
}

const logout = (req,res) => {
    res.clearCookie('currentUser');
    res.clearCookie('userRole');
    res.send('You have been logged out.');
}

module.exports.authentication = authentication;
module.exports.logout = logout;
module.exports.viewLogin = viewLogin;