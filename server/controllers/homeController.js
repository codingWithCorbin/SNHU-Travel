
// import both schemas
const Vacation = require("../database/vacationSchema")
const User = require("../database/userSchema")

// route to get all vacations for home page
const getAllVacations = async (req, res) => {

    try{

        // try to get all vacations from database
        const vacations = await Vacation.find({})

        // if error occured
        if (!vacations){

            //return error
            return res.status(400).json({"message": "Error getting vacations" })
        }

        // if no error, return all
        res.status(200).json(vacations)


    }catch(error){

        // print the error 
        console.log(error)

    }

}

// route to get vacations based on search
const getSearch = async (req, res) => {

    // send the paginated results to client
    res.status(200).json(res.paginateResults)

}

// route to handle updating favorites/ removing favorites for users
const updateTopChoices = async (req, res) =>{

    // parse the user id and vacation id
    const {userId, id} = req.body

    try{

        // attempt to get user from the incoming id
        const findUser = await User.findById(userId)

        //if user is not found, return an error
        if(!findUser){

            return res.status(400).json({"error": "Not able to find user."})
        }

        //check if the vacatin id is already in top choices (vacation was unfavored)
        if(findUser.topChoices.includes(id)){

            // if it is, remove it from array
            await findUser.updateOne({

                $pull : {topChoices: id}
            })

        // the vacation was favored and needs to be saved
        }else{

            await findUser.updateOne({

                $push : {topChoices: id}
            })

        }

        // return success message if update completed
        return res.status(200).json({"message": "Update successful"})

    // return any other errors in update attempt
    }catch(error){

        console.log(error)

        return res.status(400).json({"error": "Problem occurred during update."})

    }


}



module.exports = {

    getAllVacations,
    getSearch,
    updateTopChoices
}