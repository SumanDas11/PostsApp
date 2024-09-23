const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

// middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

// register
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // validation
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is required"
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!password || password.length < 4) {
            return res.status(400).send({
                success: false,
                message: "Password is required of min 4 characters"
            })
        }
        // existing user
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "User already registered with this email"
            })
        }
        // hash password
        const hashedPassword = await hashPassword(password);

        // save the user
        const user = await userModel({ name, email, password: hashedPassword }).save();

        return res.status(201).send({
            success: true,
            message: "Registration successful. Please login."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in register API",
            error: error,
        })
    }
};

// login
const loginController = async (req, res) => {
    // console.log('from userController.loginController')
    try {
        const { email, password } = req.body;
        // validation
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        // find user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found'
            })
        }
        // match password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success: false,
                message: 'Invalid username or password'
            })
        }
        // token jwt
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        console.log("Token is: ", token)
        // undefined password
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        })
    }
}

// updateUserController
const updateUserController = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        // find user
        const user = await userModel.findOne({ email })
        // password validation
        if (password && password.length < 4) {
            return res.status(400).send({
                success: false,
                message: "Password is required of min 4 characters"
            })
        }
        // hash password
        const hashedPassword = password ? await hashPassword(password) : undefined;
        // updated user
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            {
                name: name || user.name,
                password: hashedPassword || user.password
            },
            { new: true }
        )
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Profile updated. Please login again.",
            updatedUser
        })
    } catch (error) {
        console.log("Error in updateUser API", error)
        return res.status(500).send({
            success: false,
            message: 'Error in updateUser API',
            error
        })
    }
}

module.exports = { requireSignIn, registerController, loginController, updateUserController };