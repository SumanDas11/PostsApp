// npm init
// npm i express mongoose morgan colors dotenv bcrypt cors
// npm i jsonwebtoken
// npm i express-jwt
// to run server: "npm run server"
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/database')

// dotenv
dotenv.config()

// mongodb connection
connectDB();

// rest object
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// routes
// app.get('', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to fullstack app, hello friends, how are you"
//     })
// })
app.use('/api/v1/auth', require('./routes/userRoutes'))
app.use('/api/v1/post', require('./routes/postRoutes'))
// home
app.get('/', (req, res) => {
    res.status(200).send({
        "success": true,
        "msg": "Node Server running"
    })
})

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`.bgGreen.white)
})