
import { useContext } from "react"
import { FormContext } from "../../context/contextVariables"


// the second section of the form handles initial preferences to suggest vacations
// based on interests as well as prices
function StartingPreferences(){

    // array of all available interests
    let allInterests = ["Fine Dining", "Hiking", "Museums", "Art", "Spa", "Nature", "History", "Touring", "Shopping", "Attractions", "Music", "Architecture", "Photography"]

    // get context ffor the form
    const {hotelPrice, setHotelPrice, flightPrice, setFlightPrice, rentalPrice, setRentalPrice, interestInput, setInterestInput, interestsList, setInterestsList} = useContext(FormContext)

    // function to update the range value as users change it
    const updatePrice = (e, setter) =>{

        const updateValue = e.target.value
        setter(updateValue)

    }

    // upon entering a new interest add it to the list
    const addToInterests = (e, value) =>{

        if(e.key === "Enter" && value && !interestsList.includes(value)){
            
            setInterestsList(prev => [...prev, value])
            setInterestInput("")
        }
        
    }


    return(

        <>
        
            <div className="w-full h-full">


                <div className="flex flex-col gap-5">

                    <h1 className="place-self-center text-3xl">Preferences</h1>

                     <div className="flex flex-col gap-2">

                        <h2 className="text-2xl">Interests / Activites</h2>

                        {/* dropdown selector for interests to add to interests list */}
                        <select  className="border p-2 rounded" onChange={(e) => setInterestInput(e.target.value)} onKeyUp={(e) => addToInterests(e,interestInput)}>

                            <option value={""} selected disabled>What do you want to do on vacation?</option>
                            {allInterests.map(interest => (
                                <option value={interest}>{interest}</option>
                            ))}

                        </select>

                    </div>

                    {/* display all interests. the "x" enables users to remove the interest */}
                    <div className="h-35 w-full border flex bg-white rounded p-2">

                        {interestsList.map(interest => (
                            
                            <div className="border rounded-2xl mr-4 h-fit w-fit p-2 flex bg-amber-100">
                                <p>{interest}</p>
                                <button onClick={() => setInterestsList(prev => prev.filter(val => val !== interest ))} type="button" className="ml-3 text-red-500 font-bold cursor-pointer">X</button> 
                            </div>
                
                        ))}

                    </div>

                    {/* area for users to set default pricing. min is 100 and max is 2000 */}
                    <div>

                        <h1 className="text-2xl">Pricing</h1>

                        <div className="flex justify-between">
                            
                             {/* range bar for hotels */}
                            <div>
                                <h1 className="text-xl">Hotels</h1>
                                <h1>${hotelPrice}.00</h1>
                                <input value={hotelPrice} min={100} max={2000} step={100} type="range" onInput={(e) => updatePrice(e, setHotelPrice)} />
                            </div>

                             {/* range bar for flights  */}
                            <div>
                                <h1 className="text-xl">Flights</h1>
                                <h1>${flightPrice}.00</h1>
                                <input value={flightPrice} min={100} max={2000} step={100} type="range" onInput={(e) => updatePrice(e, setFlightPrice)} />
                            </div>

                             {/* range bar for rentals  */}
                            <div>
                                <h1 className="text-xl">Rentals</h1>
                                <h1>${rentalPrice}.00</h1>
                                <input value={rentalPrice} min={100} max={2000} step={100} type="range" onInput={(e) => updatePrice(e, setRentalPrice)} />
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        
        </>
    )
}

export default StartingPreferences