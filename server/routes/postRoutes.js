const express = require('express');
const { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController } = require('../controllers/postController');
const { requireSignIn } = require('../controllers/userController');

// router object
const router = express.Router();

// routes
// create post
router.post('/create-post', requireSignIn, createPostController)
// get all posts
router.get('/get-all-post', getAllPostsController)
// get user posts
router.get('/get-user-post', requireSignIn, getUserPostsController)
// delete posts
router.delete("/delete-post/:id", requireSignIn, deletePostController)
// update posts
router.put("/update-post/:id", requireSignIn, updatePostController)

// export
module.exports = router;