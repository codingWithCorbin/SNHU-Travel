

const User = require("../database/userSchema")
const Vacation = require("../database/vacationSchema")
const bcrypt = require("bcrypt")

const updateUserSettings = async (req, res) => {

    const {id, firstname, lastname, username, newPassword, interests, hotels, flights, rentals} = req.body

    try{

        const findUser = await User.findById(id)

        if(username){

            const checkUsername = await User.findOne({username})

            if(checkUsername){

                return res.status(400).json({"error": "Username is not available"})
            }

            await findUser.updateOne({$set : {username: username}})

        }

        if(newPassword){

            const hashNewPassword = await bcrypt.hash(newPassword, 10)

            await findUser.updateOne({$set : {password: hashNewPassword}})
        }

        if(firstname){

            await findUser.updateOne({$set : {firstname: firstname}})
        }

        if(lastname){

            await findUser.updateOne({$set : {lastname: lastname}})
        }

        if(findUser.interests !== interests){

            await findUser.updateOne({$set : {interests: interests}})

        }

        if(findUser.pricePreference.hotels !== hotels){

            await findUser.updateOne({$set : {'pricePreference.hotels': hotels}})

        }

        if(findUser.pricePreference.flights !== flights){

            await findUser.updateOne({$set : {'pricePreference.flights': flights}})

        }

        if(findUser.pricePreference.rentals !== rentals){

            await findUser.updateOne({$set : {'pricePreference.rentals': rentals}})

        }

        const updatedUser = await User.findById(id)

        const {password, ...user} = updatedUser._doc

        return res.status(200).json(user)

    }catch(error){

        console.log(error)
        return res.status(400).json({"error" : "Error in update."})
    }


}


const getUserProfile = async (req, res) =>{

    const {userId} = req.body

    try{

        const findUser = await User.findById(userId)

        if(!findUser){

            return res.status(400).json({"error": "User ID was not found."})
        }

        const topVacations = await Vacation.find({_id: findUser.topChoices})

        const recommendationList = await Vacation.find({interest: findUser.interests})

        const userPricePref = await Vacation.find({

            $or: [

                {hotel: { $eq: findUser.pricePreference.hotels}},
                {flight: { $eq: findUser.pricePreference.flights}},
                {rental: { $eq: findUser.pricePreference.rentals}}
            ]
        })


        const {password, ...user} = findUser._doc

        return res.status(200).json({"topVacations": topVacations, "recommendationList": recommendationList, "userPricePref" : userPricePref, "user": user})


    }catch(error){

        console.log(error)
        return res.status(400).json({"error": "Problem occurred in getting profile details."})
    }

}


const userPriceTool = async (req, res) =>{

    const { minRangeHotel,maxRangeHotel,minRangeFlight,maxRangeFlight,minRangeRental, maxRangeRental} = req.body

    try{

        const findVacations = await Vacation.find({

            $and : [

                {hotel: {$gte: minRangeHotel, $lte: maxRangeHotel}},
                {flight: {$gte: minRangeFlight, $lte: maxRangeFlight}},
                {rental: {$gte: minRangeRental, $lte: maxRangeRental}},

            ]
        })

        if(!findVacations){

            return res.status(204).json({"message": "No matching vacations."})
        }

        return res.status(200).json(findVacations)


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