const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/UserModel');
const session = require('express-session');
const { use } = require('../routes/postsRoutes');
exports.getAllUsers = async (req,res) => {
    
    const allUsers = await User.find();
    res.status(200).json({
        users: {
            allUsers
        }
    });

}

exports.authentication = async (req,res) => {

        try{

            const allUsers = await User.find();
            const username = req.body.username;
            const password = req.body.password;
            let logged = false;
            for(const user of allUsers){
                
                if(username == user.username && password == user.password)
                {
                    logged = true;
                    res.cookie('user',user.username).send();
                    break;
                }

            };
            if(logged == true)
            {                   
                res.json({
                    status : "Login successful",
                    active: cookie.user.username
                });
                res.send(cookie.user.username);
            }else{
                res.json({
                    status : "Login failed invalid username or password"
                })
            }

        }catch(err){
            
        }
}
