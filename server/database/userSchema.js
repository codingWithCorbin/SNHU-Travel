
const mongoose = require("mongoose")
const {Vacation} = require("./vacationSchema")

const userSchema = new mongoose.Schema({


    firstname: {

        type: String,
        required: true,

    },


    lastname: {

        type: String,
        required: true,

    },

    username: {

        type: String,
        required: true,
        unique: true
    },

    password: {

        type: String,
        required: true,

    },

    interests: {

        type: [String],
        required: true,

    },

    topChoices: {

        type: [mongoose.Schema.Types.ObjectId],
        ref: Vacation

    },

    pricePreference: {

        hotels: {

            type: Number,
            required: true
        },

        flights: {

            type: Number,
            required: true
        },

        rentals: {

            type: Number,
            required: true
        }

    }

})

const User = mongoose.model("User", userSchema)


module.exports = User