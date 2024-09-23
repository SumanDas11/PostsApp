const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        // validation
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
        res.status(201).send({
            success: true,
            message: "Post created successfully.",
            post
        })
        console.log(req);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in create post API",
            error: error,
        })
    }
}

// get all posts
const getAllPostsController = async (req, res) => {
    try {
        const posts = await postModel.find()
            .populate('postedBy', "_id name")
            .sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "All posts data.",
            posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getUserPostsController API",
            error: error,
        })
    }
}
// get user posts
const getUserPostsController = async (req, res) => {
    try {
        const userPosts = await postModel.find({ postedBy: req.auth._id });
        return res.status(200).send({
            success: true,
            message: "User posts data.",
            userPosts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getAllPostsController API",
            error: error,
        })
    }
}

// deletePostsController
const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete({ _id: id })
        return res.status(200).send({
            success: true,
            message: "Your post has been deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in deletePostsController API",
            error: error,
        })
    }
}

// updatePostController
const updatePostController = async (req, res) => {
    try {
        const { title, description } = req.body
        // find post
        const post = await postModel.findById({ _id: req.params.id })
        // validation
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const updatedPost = await postModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                title: title || post?.title,
                description: description || post?.description
            }
        )
        res.status(200).send({
            success: true,
            message: "Post updated successfully",
            updatedPost
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in updatePostsController API",
            error: error,
        })
    }
}

module.exports = { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController };