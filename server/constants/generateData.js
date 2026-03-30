
// create a list of all locations
let locationList = ["USA", "Japan", "Sweden", "Canada", "Norway", "Finland", "United Kingdom",
     "Spain", "Ireland", "Italy", "France", "Morocco", "India", "Mexico", "Greece", "Australia", "Philippines", "Vietnam", "Germany", "Brazil", "South Korea", "Malaysia", "China"] 

//create all pricing list
let pricesList = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]

// create each interest topic
let interestList = ["Fine Dining", "Hiking", "Museums", "Art", "Spa", "Nature", "History", "Touring", "Shopping", "Attractions", "Music", "Architecture", "Photography"]

// tie the interests to an image
let interestImages = {

    "Fine Dining": "/src/assets/vacation-images/fine-dining.png",
    "Spa": "/src/assets/vacation-images/spa-vacation.jpg",
    "Hiking": "/src/assets/vacation-images/hiking-vacation.jpeg",
    "Museums": "/src/assets/vacation-images/museum-vacation.jpg",
    "Art": "/src/assets/vacation-images/art-vacation.jpg",
    "Nature": "/src/assets/vacation-images/nature-vacation.jpg",
    "History": "/src/assets/vacation-images/history-vacation.jpg",
    "Touring": "/src/assets/vacation-images/touring-vacation.jpg",
    "Shopping": "/src/assets/vacation-images/shopping-vacation.jpg",
    "Attractions": "/src/assets/vacation-images/attractions-vacation.jpg",
    "Music": "/src/assets/vacation-images/music-vacation.jpg",
    "Architecture": "/src/assets/vacation-images/architecture-vacation.jpg",
    "Photography": "/src/assets/vacation-images/photography2-vacation.jpg",
}

// recieve a random element from a list
let getRandom = (list) =>{

    let randindex = Math.floor(Math.random() * list.length)

    return list[randindex]
}


// create randomized vacations
let generateVacationList = () =>{

    //overall list to be returned
    let totalVacations = []

    // loop to generate vacations
    for (let i = 0; i < 250; i++){

        // create a new vacation per loop
        let newVacation = {}
        
        //input information from lists
        newVacation.location = getRandom(locationList)
        newVacation.interest = getRandom(interestList)
        newVacation.image = interestImages[newVacation?.interest]
        newVacation.hotel = getRandom(pricesList)
        newVacation.flight = getRandom(pricesList)
        newVacation.rental = getRandom(pricesList)

        // add to vacation list
        totalVacations.push(newVacation)

    }

    // return list
    return totalVacations

}

// test outcome
//let getList = generateVacationList()
//console.log(getList)

//export to seed database
module.exports = {
    
    generateVacationList,
    locationList,
    pricesList,
    interestList

}
