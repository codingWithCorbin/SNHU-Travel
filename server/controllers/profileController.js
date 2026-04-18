
// import schemas
const User = require("../database/userSchema")
const Vacation = require("../database/vacationSchema")

//import bcrypt to create a new password encryption if user changes password
const bcrypt = require("bcrypt")

// function that handles update data
const updateUserSettings = async (req, res) => {

    // parese all possible incoming data
    const {id, firstname, lastname, username, newPassword, interests, hotels, flights, rentals} = req.body

    try{

        // connect to the user based on id
        const findUser = await User.findById(id)

        // check if a new username was input
        if(username){

            // perform addtional check if the username is available
            const checkUsername = await User.findOne({username})

            // if the username already exists, send an error
            if(checkUsername){

                return res.status(400).json({"error": "Username is not available"})
            }

            // if it does not exist, update the user name
            await findUser.updateOne({$set : {username: username}})

        }

        //check if user input a new password
        if(newPassword){

            // create a new encryption for the password
            const hashNewPassword = await bcrypt.hash(newPassword, 10)

            // store encryption for user's new password
            await findUser.updateOne({$set : {password: hashNewPassword}})
        }

        // check if the user has a new input for first name
        if(firstname){

            // update it if there is one
            await findUser.updateOne({$set : {firstname: firstname}})
        }

        // check for incoming lastname
        if(lastname){

            // update it if so
            await findUser.updateOne({$set : {lastname: lastname}})
        }

        // compare the current interest list and new one
        if(findUser.interests !== interests){

            // if it is different, update the list
            await findUser.updateOne({$set : {interests: interests}})

        }

        // check if there is a difference in hotel price
        if(findUser.pricePreference.hotels !== hotels){

            // update price if it is different
            await findUser.updateOne({$set : {'pricePreference.hotels': hotels}})

        }

        // check current and incoming flight price
        if(findUser.pricePreference.flights !== flights){

            // update it if it is different
            await findUser.updateOne({$set : {'pricePreference.flights': flights}})

        }

        // compare rental prices
        if(findUser.pricePreference.rentals !== rentals){

            // update rental price if different
            await findUser.updateOne({$set : {'pricePreference.rentals': rentals}})

        }

        // get the user again inorder to get updated information
        const updatedUser = await User.findById(id)

        // create new object without password
        const {password, ...user} = updatedUser._doc

        // return updated user
        return res.status(200).json(user)

    // process any errors when updating settings
    }catch(error){

        console.log(error)
        return res.status(400).json({"error" : "Error in update."})
    }


}

// function to process user's data to get correct vacations
const getUserProfile = async (req, res) =>{

    // parse the user's id
    const {userId} = req.body

    try{

        // get the user based on id
        const findUser = await User.findById(userId)

        // process error if there was an issue with the id
        if(!findUser){

            return res.status(400).json({"error": "User ID was not found."})
        }

        // process the vacation top choices list based on user data 
        const topVacations = await Vacation.find({_id: findUser.topChoices})

        // process vacation list based on the user's interests
        const recommendationList = await Vacation.find({interest: findUser.interests})

        // get vacation pricing data based on three preferences
        const userPricePref = await Vacation.find({

            $or: [

                {hotel: { $eq: findUser.pricePreference.hotels}},
                {flight: { $eq: findUser.pricePreference.flights}},
                {rental: { $eq: findUser.pricePreference.rentals}}
            ]
        })

        // return user data without password
        const {password, ...user} = findUser._doc

        // return all three lists and user to ensure it is updated
        return res.status(200).json({"topVacations": topVacations, "recommendationList": recommendationList, "userPricePref" : userPricePref, "user": user})

    // process any other errors when attempting to get profile
    }catch(error){

        console.log(error)
        return res.status(400).json({"error": "Problem occurred in getting profile details."})
    }

}

// function that enables users to use pricing tool
const userPriceTool = async (req, res) =>{

    // parse the minimum and maximum ranges for flights, hotels, and rentals
    const { minRangeHotel,maxRangeHotel,minRangeFlight,maxRangeFlight,minRangeRental, maxRangeRental} = req.body

    try{

        // get list of vacations that fit the input ranges
        const findVacations = await Vacation.find({

            // looks for greater than or equal to minimum and less than or equal to maximum
            $and : [

                {hotel: {$gte: minRangeHotel, $lte: maxRangeHotel}},
                {flight: {$gte: minRangeFlight, $lte: maxRangeFlight}},
                {rental: {$gte: minRangeRental, $lte: maxRangeRental}},

            ]
        })

        // if no results found, send the message
        if(!findVacations){

            return res.status(204).json({"message": "No matching vacations."})
        }

        // if results, send back the list
        return res.status(200).json(findVacations)

    // catch any errors when using the pricing tool
    }catch(error){

        console.log(error)
        return res.status(400).json({"error": "Error in finding vacations."})
    }


}

module.exports = {
    updateUserSettings,
    getUserProfile,
    userPriceTool
}