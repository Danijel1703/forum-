const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/UserModel');
const ValidationController = require('./ValidationController');

const newUser = async (req,res) => {
        try {
        const {error} = ValidationController.registerValidation(req.body);
        if(error){
                res.status(400).send(err.message);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const emailExists = await User.findOne({email : req.body.email});
        const usernameExists = await User.findOne({username : req.body.username});
        if(emailExists){
                res.status(400).send('Email already in use.');
        }else if(usernameExists){
                res.status(400).send('Username already in use.');
        }else{
                const newUser = await User.create({
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        username : req.body.username,
                        password : hashedPassword,
                        email : req.body.email,
                        college : req.body.college
                });
                res.status(200).send('Registration successful.');
        }               
        } catch (err) {
               res.status(400).send(err.message);
        }
}

module.exports.newUser = newUser;