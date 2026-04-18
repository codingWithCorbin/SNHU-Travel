//import mongoose to create new schema
const mongoose = require("mongoose")

//import vacation schema to reference it in user
const Vacation = require("./vacationSchema")

// create the user schema
const userSchema = new mongoose.Schema({

    //first name as a string and required
    firstname: {

        type: String,
        required: true,

    },

    // lastname as a string and required
    lastname: {

        type: String,
        required: true,

    },

    // username is unique and required
    username: {

        type: String,
        required: true,
        unique: true
    },

    // password is a string and required
    password: {

        type: String,
        required: true,

    },

    // interests is an array of strings
    interests: {

        type: [String],
        required: true,

    },

    // top choices contains array of vacation ids from favorites
    topChoices: {

        type: [mongoose.Schema.Types.ObjectId],
        ref: Vacation

    },

    // preference object containing three categories
    pricePreference: {

        // hotel price as a number 
        hotels: {

            type: Number,
            required: true
        },

        // flight price as a number 
        flights: {

            type: Number,
            required: true
        },

        // rental price as a number
        rentals: {

            type: Number,
            required: true
        }

    }

})

// create a user model based on the schema 
const User = mongoose.model("User", userSchema)


module.exports = User