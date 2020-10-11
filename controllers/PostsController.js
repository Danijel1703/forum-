const express = require('express');
const mongoose = require('mongoose');
const Post = require('./../models/PostModel');
const { json } = require('body-parser');
const { update, findByIdAndDelete, findByIdAndUpdate } = require('./../models/PostModel');
const { viewHome } = require('./HomeController');


const viewPosts = async (req,res) => {
    try {
        const allPosts = await Post.find();
        res.render(('PostsView'),{
            allPosts : allPosts
        });
    }catch(err){
    }
}
const newPost = async (req,res) => {

        try {
            const newPost = await Post.create({
                title : req.body.title,
                content : req.body.content,
                author : req.cookies['currentUser']
                });
                res.status(200).send('Successful');
        }catch (err){
            res.status(400).send(err.message);
    }
    
}
const deletePost = async (req,res) => {
        try {
            const id = req.params.id;
            const postExists = await Post.findById(id);
            if(req.cookies['currentUser'] == postExists.author){
            const deletePost = await Post.findByIdAndDelete(id);
            res.status(400).send('Successful');
            }else{
                res.send('You are not the author.');
            }    
        }catch (err){
            res.status(400).send('Invalid ID');
        }
}

const updatePost = async (req,res) => {
        try {
            const id = req.params.id;
            const postExists = await Post.findById(id);
            if(req.cookies['currentUser'] == postExists.author){
            const updatePost = await Post.findByIdAndUpdate(id,{
                title : req.body.title,
                content : req.body.content
            });
            res.send('Post updated');
        }else{
            res.send('You are not the author.');
        }
        }catch (err){
            res.send('Invalid ID');
        }
}

const newComment = async (req,res) => {

        try {
            const id = req.params.id;
            const commentPost = await Post.findByIdAndUpdate(id,{
                $push : {
                    comments : {
                            author : req.cookies['currentUser'],
                            content  : req.body.comments.comment.content
                    }
                }
            });
            res.send('Comment added');
        }catch (err) {
            res.send('Invalid ID');
        }

}

const updateComment = async (req,res) => {

    try {
        const id = req.params.commentId;
        console.log(id);
        console.log(commentExists);
        if(commentExists.author == req.cookies['currentUser']){
        const commentPost = await Post.findByIdAndUpdate(id,{
            $push : {
                comments : {
                        author : req.cookies['currentUser'],
                        content  : req.body.comments.comment.content
                }
            }
        });
        res.send('Comment updated');
    }else{
        res.send('You are not the author.');
    }
    }catch (err) {
        res.send('Invalid ID');
    }

}

module.exports.viewPosts = viewPosts;
module.exports.newPost = newPost;
module.exports.deletePost = deletePost;
module.exports.updatePost = updatePost;
module.exports.newComment = newComment;
module.exports.updateComment = updateComment;
