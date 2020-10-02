const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/UserModel');

exports.getAllUsers = async (req,res) => {
        const allUsers = await User.find();
        res.status(200).json({
                users : {
                        allUsers        
                }   
        });
};
exports.newUser = async (req,res) => {
        try {
        const allUsers = await User.find();
        let check = false;
        let emailCheck = false;
        for(const user of allUsers) {
                if(user.username == req.body.username){       
                        console.log('User already exists');
                        check = true;
                }
                if(user.email == req.body.email){       
                        console.log('Email already in use');
                        emailCheck = true;
                }
                if(check == true || emailCheck == true){
                        break;
                }
        }; 
        if(check == false && emailCheck == false){       
                const newUser = User.create({
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        username : req.body.username,
                        password : req.body.password,
                        email : req.body.email,
                        college : req.body.college
                });
                res.status(201).send({
                        data: 'created'
                });   
        }else if(check == true && emailCheck == false){ 
                res.status(400).json({
                        status : "failed",
                        error : "Username already exists"
                });
        }else if(emailCheck == true && check == false){ 
                res.status(400).json({
                        status : "failed",
                        error : "Email already in use"
                });
        }else if(check == true && emailCheck == true){ 
                res.status(400).json({
                        status : "failed",
                        errors : {
                                        userError : "Username already exists",
                                        emailError : "Email already in use"
                                }
                });
        }
        }catch(err){
                res.status(400).json({
                       status : "failed",
                       message : err.message
                });
        }
}

