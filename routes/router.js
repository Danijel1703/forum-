const express = require('express');
const router = express.Router();
const LoginController = require('./../controllers/LoginController');
const PostsController = require('./../controllers/PostsController');
const SignupController = require('../controllers/SignupController');
const { route } = require('../app');
const verify = require('./../verifyToken');

router.route('/signup').post(SignupController.newUser);
router.route('/login').post(LoginController.authentication);
router.route('/posts').get(PostsController.getAllPosts);
router.route('/posts').post(verify,PostsController.newPost);
router.route('/posts/post/:id').delete(verify,PostsController.deletePost);
router.route('/posts/post/:id').put(verify,PostsController.updatePost);
router.route('/posts/post/:id').post(PostsController.newComment);
router.route('/logout').get(LoginController.logout);   
router.route('/posts/post/:id/:commentId').put(PostsController.updateComment);

module.exports = router;