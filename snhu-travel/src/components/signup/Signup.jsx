//import hooks for page
import { useState, useContext, useEffect} from "react"
import { useForms } from "../../hooks/useForm"
import { FormContext } from "../../context/contextVariables"
import { useNavigate } from "react-router"

//import the components used on this component
import AccountInformation from "./AccountInformation"
import StartingPreferences from "./StartingPreferences"
import ErrorHeader from "../general/ErrorHeader"

import axios from "axios"


// component that handles signup forms to create users
function Signup(){

    //set up naviagte instance to route through pages
    const navigate = useNavigate()

    // get all form context elements to use in form submission
    const {

        firstname, setFirstname,
        lastname, setLastname,
        username, setUsername,
        password, setPassword,
        hotelPrice, setHotelPrice,
        flightPrice, setFlightPrice,
        rentalPrice, setRentalPrice,
        setInterestInput, 
        interestsList, setInterestsList 

    } = useContext(FormContext)

    //function to set all signup form inputs back to default
    const resetForm = () =>{

        setFirstname("")
        setLastname("")
        setUsername("")
        setPassword("")
        setInterestInput("")
        setHotelPrice(100)
        setFlightPrice(100)
        setRentalPrice(100)
        setInterestsList([])
    }

    //get elements from the form hook to use within signup componenet
    const {validForm, form, formIndex, nextForm, previousForm} = useForms([<AccountInformation/>, <StartingPreferences />])

    // holds the list of vacation images that the page cycles through
    const [cycleImages] = useState(["/src/assets/vacation-images/beach-vacation.jpg"])

    // set up error truth condition and message state
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // function to submit sign up forms
    const handleSubmit = async (e) =>{
        
        // stop default to control submission through button submission
        e.preventDefault()

        // create form object
        const formData = {firstname, lastname, username, password, hotelPrice,  flightPrice,  rentalPrice, interestsList}

        try{

            // send request with form data to complete signup
            const response = await axios.post("/auth/signup", formData)

            // if signup successful
            if (response.status == 201){

                // reset form inputs
                resetForm()

                // go to the login page after 3 seconds
                setTimeout(() => {

                    navigate("/login")
                    
                }, 3000);
            }

        // if error set up error component
        }catch(error){

            console.log(error.response.data.error)

            // set error message
            setErrorMessage(error.response.data.error)

            // set true for the error to pop up
            setError(true)

            // remove both error elements to remove pop up after 5 seconds
            setTimeout(() => {
                
                setErrorMessage("")
                setError(false)

            }, 5000);
        }
      

    }

    // reset form anytime revisiting the sign up page
    useEffect(() => {

        resetForm()

    }, [])
    
    return(

        <>
           <div>
                {/* pop up for error  */}
                {error ?
                    
                    <ErrorHeader message={errorMessage}/>

                    : null
                }

                <div className="w-full h-[80vh] flex flex-col place-content-center place-items-center">

                

                    <div className="flex bg-slate-50 h-[75%] w-[50%] rounded-3xl shadow shadow-gray-600 align-middle">

                        {/* left section of the signup section with image*/}
                        <div className="h-full w-[50%]">

                            {cycleImages.map((image,index)=> {

                                return <img src={image} className="h-full w-full rounded-l-2xl"/>

                            })}
                        </div>

                        {/* right side of signup section with the form elements */}
                        <form ref={validForm} onKeyDown={(e) => {if(e.key === "Enter") e.preventDefault()}} check className="h-full w-[50%] rounded-r-2xl p-5">

                            {/* handles the two different forms */}
                            <div>
                                {form}
                            </div>

                            {/* buttons to navigate through forms */}
                            <div className="">

                                {/* condition check if on the first form to only display Next button */}
                                {formIndex === 0 ?
                                
                                    <div className="flex place-self-end mt-15">
                                        <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#1446A0] text-white cursor-pointer" type="button" onClick={nextForm}>Next</button>
                                    </div>
                                    
                                    //if not the second form, display previous to go back or to complete sign up with submit
                                    :
                                    
                                    <div className="flex place-self-end mt-10 gap-5">
                                        <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#DB3069] text-white cursor-pointer" type="button" onClick={previousForm}>Previous</button>
                                        <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#1446A0] text-white cursor-pointer" type="submit" onClick={handleSubmit}>Submit</button>
                                    </div>

                                }
                            </div>

                        </form>


                    </div>

                </div>
            </div>
    
        </>
    )


}

export default Signup