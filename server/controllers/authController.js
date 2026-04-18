
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

        // look for a user with a matching username
        const findUser = await User.findOne({username: username})

        // return error if a user with that username does not exist
        if(!findUser){

            return res.status(400).json({"error": "Username not found."})
        }
        
        // if username is in database, check the incoming password with the stored (encrypted) password
        const match = await bcrypt.compare(password, findUser.password)

        // if passwords are not the same, return an error
        if(!match){

            return res.status(400).json({"error": "Problem with login"})

        }

        //if the password is correct
        if(match){

            // create a new object without the password data
            const {password, ...user} = findUser._doc

            // return the user
            return res.status(200).json(user)

        }
    
    // catch any other during log in attempt
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

        //set up new user with incoming data
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

        // dave the new user to the database
        const saveUser = await newUser.save()

        // send successful creation status
        return res.status(201).json({"message": `Signup for ${saveUser.username} successful!`})


    // process error if issue with creating a new user   
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