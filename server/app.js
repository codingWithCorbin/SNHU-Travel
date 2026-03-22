
// import express and create an instance
const express = require("express")
const app = express()

// allow use of .env file
require("dotenv").config()

// create a port reference to .env
const PORT = process.env.PORT




// set up for server to run on specified port
app.listen(PORT, () =>{

    //print the port to the console
    console.log(`Server is running on port: ${PORT}`)

})






