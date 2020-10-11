const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/UserModel');
const ValidationController = require('./ValidationController');

const viewSignup = async (req,res) => {
        try {
             if(req.cookies['currentUser']){
                     res.send('You are alreday logged in');
             }else {
             res.render('SignupView',{
                     message : ""
             });
        }   
        } catch (err) {
             res.send(err.message);
        }
}

const newUser = async (req,res) => {
        try {
        const {err} = ValidationController.registerValidation(req.body);
        if(err){
                res.status(400).send(err.message);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const emailExists = await User.findOne({email : req.body.email});
        const usernameExists = await User.findOne({username : req.body.username});
        if(emailExists){
                res.render('SignupView',{
                        message : "Email already in use"
                });
        }else if(usernameExists){
                res.render('SignupView',{
                        message : "Username already in use"
                });
        }else{
                const newUser = await User.create({
                        firstname : req.body.firstname.trim(),
                        lastname : req.body.lastname.trim(),
                        username : req.body.username.trim(),
                        password : hashedPassword,
                        email : req.body.email.trim(),
                        college : req.body.college.trim()
                });
                res.status(200).send('Registration successful.');
        }               
        } catch (err) {
               res.status(400).send(err.message);
        }
}

module.exports.newUser = newUser;
module.exports.viewSignup = viewSignup;