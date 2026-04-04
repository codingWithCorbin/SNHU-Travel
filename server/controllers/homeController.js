

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

    /*
    const userInquiry = req.query.inquiry

    if (!userInquiry){

        return res.status(204)
    }
    */
    /*
    const findVacation = await Vacation.find(

        {$text: {$search: userInquiry}}
    )

    if(!findVacation){

        return res.status(204).json({"message": "No results found."})
    }
    */
    
    res.status(200).json(res.paginateResults)

}


const updateTopChoices = async (req, res) =>{

    const {userId, id} = req.body

    try{

        const findUser = await User.findById(userId)

        if(!findUser){

            return res.status(400).json({"error": "Not able to find user."})
        }

        if(findUser.topChoices.includes(id)){

            await findUser.updateOne({

                $pull : {topChoices: id}
            })

        }else{

            await findUser.updateOne({

                $push : {topChoices: id}
            })

        }

        await findUser.save()

        return res.status(200).json({"message": "Update successful"})


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