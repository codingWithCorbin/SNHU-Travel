
// create an instance of express router
const express = require("express")
const homeRouter = express.Router()
const paginate = require("../middleware/paginateResults")
const Vacation = require("../database/vacationSchema")

const {getAllVacations, getSearch} = require("../controllers/homeController")




homeRouter.get("/vacations", getAllVacations)
homeRouter.get("/search", paginate(Vacation), getSearch)






module.exports = homeRouter