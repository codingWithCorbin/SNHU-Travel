
// allow use of .env file
const dotenv = require("dotenv")
dotenv.config()

// import express and create an instance
const express = require("express")
const app = express()

// import mongoose to connect to database
const mongoose = require("mongoose")



// create a port reference to .env
const PORT = process.env.PORT

// enable breaking down parts request body
const bodyparser = require("body-parser")

//enable client communication
const cors = require("cors")

// set url for client
const corsOptions = {
    orgin: "http://localhost:5173/"
}


// use cors in server with specified url
app.use(cors(corsOptions))


// enable parsing data from client
app.use(express.json())
app.use(bodyparser.json())


// try to connect to the database
mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Connected to database"))
    .catch((e) => console.log(`Failed to connect: ${e}`))

  
    
//import router
const authRouter = require("./routers/authRouter")
const homeRouter = require("./routers/homeRouter")

// enable routes
app.use("/", homeRouter)
app.use("/auth", authRouter)




// set up for server to run on specified port
app.listen(PORT, () =>{

    //print the port to the console
    console.log(`Server is running on port: ${PORT}`)

})







