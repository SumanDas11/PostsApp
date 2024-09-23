const express = require('express');
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userController');

// router object
const router = express.Router();

// routes
// register || POST
router.post('/register', registerController)
// login || POST
router.post('/login', loginController)
// update || PUT
router.put('/updateUser', requireSignIn, updateUserController)

// export
module.exports = router;