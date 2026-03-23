
// import test db
const users = require("../testDB/testUsers")


// function to handle logging in users
// currently set up for test db only
const userLogin = (req, res) =>{

    // parse the username and password variables from client
    const {username, password} = req.body

    //check that there is content
    if(!username || !password){

        // return error if not
        return res.status(400).json("Username and password required.")
    }

    // loop through test db
    users.forEach(user => {

        // check for match
        if(user.username == username & user.password == password){

            //return user if found
            return res.status(200).json(user)

        }else{

            // if not match. return error
            return res.status(400).json({error: "Login not successful"})
        }

    })


}



// export all functions to use in router
module.exports = {

    userLogin,
    
}