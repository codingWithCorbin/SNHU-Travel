
const express = require("express")
const profileRouter = express.Router()
const {updateUserSettings, getUserProfile, userPriceTool} = require("../controllers/profileController")



profileRouter.patch("/settings", updateUserSettings)
profileRouter.post("/user-page", getUserProfile)
profileRouter.post("/price-tool", userPriceTool)









module.exports = profileRouter
