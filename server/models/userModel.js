const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add name"],
        trim: true
    },
    email: {
        type: String,
        require: [true, "please add email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: [true, "please add password"],
        min: 4,
        max: 64
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);