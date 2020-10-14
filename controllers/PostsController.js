const express = require('express');
const mongoose = require('mongoose');
const Post = require('./../models/PostModel');
const User = require('./../models/UserModel');
const { json } = require('body-parser');
const { update, findByIdAndDelete, findByIdAndUpdate } = require('./../models/PostModel');
const { viewHome } = require('./HomeController');
const { compareSync } = require('bcryptjs');

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
            res.render('NewPostView');  
            const newPost = await Post.create({
                title : req.body.title,
                content : req.body.content,
                author : req.cookies['currentUser']
                });
                getUserPosts();
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
            const user = await User.findOneAndUpdate(
                {username : postExists.author},
                {$pull : { posts : { _id : id } }}
            );
            }else{
                res.send('You are not the author.');
            }    
        }catch (err){
            res.status(400).send(err.message);
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
            res.send(err.message);
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

const getUserPosts = async (req,res) => {
    try {
        const posts = await Post.find();
        for(const post of posts){
            const user = await User.findOneAndUpdate(
                {username : post.author},
                {
                    $push : {
                        posts : {
                            _id : post._id,
                            author : post.author,
                            title : post.title,
                            content : post.content
                            
                        }
                    }
                }
            );
        }
        res.send('succesfull');
    } catch (err) {
        res.send(err.message);
    }
}

const viewYourPosts = async (req,res) => {
    try{
        const userPosts = await User.findOne({username : req.cookies['currentUser']});
        res.render(('YourPostsView'),{
            posts : userPosts.posts
        });
    } catch (err) {

    }
}



module.exports.viewPosts = viewPosts;
module.exports.newPost = newPost;
module.exports.deletePost = deletePost;
module.exports.updatePost = updatePost;
module.exports.newComment = newComment;
module.exports.updateComment = updateComment;
module.exports.getUserPosts = getUserPosts;
module.exports.viewYourPosts = viewYourPosts;