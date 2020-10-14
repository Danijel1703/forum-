const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const PostsController = require('../controllers/PostsController');
const SignupController = require('../controllers/SignupController');
const HomeController = require('../controllers/HomeController');
const { route } = require('../app');
const verify = require('../verifyToken');

router.route('/').get(HomeController.viewHome);
router.route('/home').get(HomeController.viewHome);
router.route('/signup').get(SignupController.viewSignup).post(SignupController.newUser);
router.route('/login').get(LoginController.viewLogin).post(LoginController.authentication);
router.route('/posts').get(PostsController.viewPosts);
router.route('/newpost').get(verify,PostsController.newPost).post(verify,PostsController.newPost);
router.route('/yourposts').get(verify,PostsController.viewYourPosts);
router.route('/posts/post/:id').delete(verify,PostsController.deletePost);
router.route('/posts/post/:id').put(verify,PostsController.updatePost);
router.route('/posts/post/:id').post(PostsController.newComment);
router.route('/logout').get(LoginController.logout);   
router.route('/posts/post/:id/:commentId').put(PostsController.updateComment);


module.exports = router;