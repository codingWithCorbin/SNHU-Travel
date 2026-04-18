
// create an instance of express router
const express = require("express")
const authRouter = express.Router()

// import controller functions handling logic
const {userLogin, userSignup} = require("../controllers/authController")


// route for the user to login into their account
authRouter.post("/login", userLogin)

// route to create a new account
authRouter.post("/signup", userSignup)









// export to use within app
module.exports = authRouter