

const Vacation = require("../database/vacationSchema")

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



module.exports = {

    getAllVacations,
    getSearch
}