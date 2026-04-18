
// create a new router to handle profile operations
const express = require("express")
const profileRouter = express.Router()

// import the needed profile functions
const {updateUserSettings, getUserProfile, userPriceTool} = require("../controllers/profileController")

// route to process updates for user's settings
profileRouter.patch("/settings", updateUserSettings)

// route to get updated user profile
profileRouter.post("/user-page", getUserProfile)

// route to handle processing pricing tool data
profileRouter.post("/price-tool", userPriceTool)









module.exports = profileRouter
