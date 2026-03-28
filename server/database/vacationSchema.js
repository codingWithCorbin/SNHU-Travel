

const mongoose = require("mongoose")


const vacationSchema = new mongoose.Schema({


    location: {

        type: String,
        required: true
    },

    image: {

        type: String,
        required: true,

    },

    interest: {

        type: String,
        required: true
    },

    hotel: {

        type: Number,
        required: true
    },

    flight: {

        type: Number,
        required: true
    },

    rental: {

        type: Number,
        required: true
    }


})

const Vacation = mongoose.model("Vacation", vacationSchema)

module.exports = Vacation