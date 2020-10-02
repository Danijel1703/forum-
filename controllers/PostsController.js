const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./../models/PostModel');
const { json } = require('body-parser');
const { update } = require('./../models/PostModel');
exports.getAllPosts = async (req,res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json({
            posts : {
                allPosts
            }
        });
    }catch(err){
        
    }
}
exports.newPost = async (req,res) => {
            
        try {
            const postAuthor = req.cookies.user;
            const newPost = await Post.create({
                title : req.body.title,
                content : req.body.content,
                author : postAuthor
                });
                res.status(200).json({
                    status : "successful"
                });
            
        }catch (err){
            res.status(400).json({
                status : "failed",  
                message : "Please log in first!"
            });
        }
    
}
exports.deletePost = async (req,res) => {
        try {
            let deleted = false;
            const allPosts = await Post.find();
            const id = req.params.id;
            for(const post of allPosts){
                if(post.id == id){
                    if(post.author == req.cookies.user){
                        await Post.deleteOne(post);
                        res.json({
                            status : "deleted"
                        });
                        deleted = true;
                    }else {
                        res.json({
                            status : "Failed, you are not the author"
                        });
                    }
                    break;
                }else{
                    deleted = false;
                }
            }
            if(deleted == false){
                    res.json({
                        status : "failed, invalid id"
                    });
                }
            
        }catch (err){
            
        }
}

exports.updatePost = async (req,res) => {
        try {
            const allPosts = await Post.find();
            let updated = false;
            const id = req.params.id;
            for(const post of allPosts){
                if(post.id == id){
                    if(post.author == req.cookies.user){
                        await Post.updateOne(req.body);
                        updated = true;
                        res.json({
                            status : "update completed"
                        });
                        break;
                        }else{
                        res.json({
                            status : "failed, you are not the author"
                        });
                    }
                }else{
                    updated = false;
                }
            }
            if(updated == false){
                res.json({
                    status : "failed, invalid id"
                });
            }
        }catch (err){
            
        }
}