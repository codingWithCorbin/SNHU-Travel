
// import test db
//const users = require("../testDB/testUsers")

// import bcrypt to enable hashing passwords and comparing when signing in
const bcrypt = require("bcrypt")

// import user schema to find and check users
const User = require("../database/userSchema")

// function to handle logging in users
// currently set up for test db only
const userLogin = async (req, res) =>{

    // parse the username and password variables from client
    const {username, password} = req.body

    //check that there is content
    if(!username || !password){

        // return error if not
        return res.status(400).json("Username and password required.")
    }

    try{

        const findUser = await User.findOne({username: username})

        if(!findUser){

            return res.status(400).json({"error": "Username not found."})
        }

        const match = await bcrypt.compare(password, findUser.password)

        if(!match){

            return res.status(400).json({"error": "Problem with login"})

        }

        if(match){

            const {password, ...user} = findUser._doc

            return res.status(200).json(user)

        }

    }catch(error){

        console.log(error)
        res.status(400).json({"error": "Unable to complete login."})
    }
    


}



// function to complete user sign up
const userSignup = async (req, res) =>{

    //get object from client
    const formData = req.body

    // check if data exists
    if(!formData){

        // return error if not
        return res.status(400).json({"error": "No information found for signup."})
    }

    // if there is data, destructure it
    const {firstname,  lastname,  username, password, hotelPrice,  flightPrice,  rentalPrice, interestsList} = formData

    try{


        const findUser = await User.findOne({username: username})

        // check if a user with that username exists
        if(findUser){

            // return error if so
            return res.status(400).json({"error": "Username already exists."})
        }

        // if user does not exist yet, set up hashed password
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({

            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashpassword,
            interests: interestsList,
            topChoices: [],
            pricePreference: {
                hotels: hotelPrice,
                flights: flightPrice,
                rentals: rentalPrice
            }

        })

        const saveUser = await newUser.save()

        return res.status(201).json({"message": `Signup for ${saveUser.username} successful!`})


        
    }catch(error){

        console.log(error)
        return res.status(400).json({"error": "Problem in signup process."})
    }

}



// export all functions to use in router
module.exports = {

    userLogin,
    userSignup
    
}