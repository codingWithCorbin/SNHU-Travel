
// import mongoose to create schema
const mongoose = require("mongoose")

// create vacation schema
const vacationSchema = new mongoose.Schema({

    // location of vacation as a string and required
    location: {

        type: String,
        required: true
    },

    // image based on interest and stored as url
    image: {

        type: String,
        required: true,

    },

    // interest for the vacation
    interest: {

        type: String,
        required: true
    },

    // hotel cost
    hotel: {

        type: Number,
        required: true
    },

    // flight cost
    flight: {

        type: Number,
        required: true
    },

    //rental cost
    rental: {

        type: Number,
        required: true
    }


})

// create vacation model 
const Vacation = mongoose.model("Vacation", vacationSchema)

module.exports = Vacation