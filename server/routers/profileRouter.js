
const express = require("express")
const profileRouter = express.Router()
const {updateUserSettings} = require("../controllers/profileController")



profileRouter.patch("/settings", updateUserSettings)








module.exports = profileRouter
