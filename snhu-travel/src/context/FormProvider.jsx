
import {useState} from "react"
import { FormContext } from "./contextVariables"

function FormProvider({children}){

    //create state for the first form
    const[firstname, setFirstname] = useState("")
    const[lastname, setLastname] = useState("")
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")

    //create state for second form
    //set up state for all three pricing options
    const [hotelPrice, setHotelPrice] = useState(100)
    const [flightPrice, setFlightPrice] = useState(100)
    const [rentalPrice, setRentalPrice] = useState(100)

    // set up list state to populate the component showing all interests selected
    const [interestInput, setInterestInput] = useState("")
    const [interestsList, setInterestsList] = useState([])

    //combined form
    
    const fullForm = {
        firstname, setFirstname, lastname, setLastname, username, setUsername, password, setPassword,
        hotelPrice, setHotelPrice, flightPrice, setFlightPrice, rentalPrice, setRentalPrice,interestInput, setInterestInput, interestsList, setInterestsList
    }
    

    //return form provider for any subcomponent
    return(

        //provide full form object
        <FormContext.Provider value={fullForm}>
            {children}
        </FormContext.Provider>
    )

}

export default FormProvider