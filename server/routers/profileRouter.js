
const express = require("express")
const profileRouter = express.Router()
const {updateUserSettings, getUserProfile} = require("../controllers/profileController")



profileRouter.patch("/settings", updateUserSettings)
profileRouter.post("/user-page", getUserProfile)









module.exports = profileRouter
