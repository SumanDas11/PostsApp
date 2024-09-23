const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "please add post title"],
    },
    description: {
        type: String,
        require: [true, "please add email"],
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);