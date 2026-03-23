
// import express and create an instance
const express = require("express")
const app = express()

// allow use of .env file
require("dotenv").config()

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

//import router
const authRouter = require("./routers/authRouter")



// enable routes
app.use("/auth", authRouter)




// set up for server to run on specified port
app.listen(PORT, () =>{

    //print the port to the console
    console.log(`Server is running on port: ${PORT}`)

})






