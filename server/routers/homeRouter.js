
// create an instance of express router
const express = require("express")
const homeRouter = express.Router()
const paginate = require("../middleware/paginateResults")
const Vacation = require("../database/vacationSchema")

// import the controllers for home to use in routes
const {getAllVacations, getSearch, updateTopChoices} = require("../controllers/homeController")


// route that gets all vacations
homeRouter.get("/vacations", getAllVacations)

//route that gets paginated results upon searching
homeRouter.get("/search", paginate(Vacation), getSearch)

//route that handles when users click the heart button on client to favor/unfavor vacations
homeRouter.put("/update-fav", updateTopChoices)






module.exports = homeRouter