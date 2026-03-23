
// create an instance of express router
const express = require("express")
const authRouter = express.Router()

// import controller functions handling logic
const {userLogin, userSignup} = require("../controllers/authController")


// set up routes with controllers
authRouter.post("/login", userLogin)









// export to use within app
module.exports = authRouter