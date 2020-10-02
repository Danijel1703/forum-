const express = require('express');
const router = express.Router();
const PostsController = require('./../controllers/PostsController');
router.route('/').get(PostsController.getAllPosts);
router.route('/').post(PostsController.newPost);
router.route('/post/:id').delete(PostsController.deletePost);
router.route('/post/:id').put(PostsController.updatePost);
module.exports = router;