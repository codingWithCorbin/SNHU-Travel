

//import monggose to create connection
const mongoose = require("mongoose")

//import vacation schema to load into
const Vacation = require("../database/vacationSchema")

//import function to randomize data
const {generateVacationList} = require("../constants/generateData")


//connect to database
mongoose.connect("mongodb://localhost/snhu-travel")
    .then(() => console.log("Connecting to MongoDB to insert data."))
    .catch((error) => console.log(error))

// get random list
let insertList = generateVacationList()

// function to add data
const addData = async () => {

    await Vacation.deleteMany({})
    await Vacation.insertMany(insertList)

}

// close the connection
addData().then(() => mongoose.connection.close())