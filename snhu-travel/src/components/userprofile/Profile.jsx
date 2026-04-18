
import { useAuth } from "../../hooks/useAuth"

import { useEffect, useState } from "react"

import axios from "axios"

import VacationCard from "../general/VacationCard"

// main component for user's profile interaction
function Profile(){

    
    // get auth to get user values
    const{auth, setAuth} = useAuth()

    // set up state for starting lists for user's page
    const [topVacations, setTopVacations] = useState([])
    const [recommendationList, setRecommendationList] = useState([])
    const [userPricePref, setUserPricePref] = useState([])

    // separate list used when user works with pricing tool
    const [pricingToolList, setPricingToolList] = useState([])

    // state for all min and max for pricing tool
    const [minRangeHotel, setMinRangeHotel] = useState(100)
    const [maxRangeHotel, setMaxRangeHotel] = useState(100)

    const [minRangeFlight, setMinRangeFlight] = useState(100)
    const [maxRangeFlight, setMaxRangeFlight] = useState(100)

    const [minRangeRental, setMinRangeRental] = useState(100)
    const [maxRangeRental, setMaxRangeRental] = useState(100)

    // reset pricing tool list to empty for the display to go back to their preferences
    const resetPriceTool = () =>{

        setPricingToolList([])
        setMinRangeHotel(100)
        setMaxRangeHotel(100)
        setMinRangeFlight(100)
        setMaxRangeFlight(100)
        setMinRangeRental(100)
        setMaxRangeRental(100)

    }

    // calls api to get specifc price values when clicking apply
    const handlePriceTool = async (e) => {

        e.preventDefault()

        const priceForm = {

            minRangeHotel,
            maxRangeHotel,
            minRangeFlight,
            maxRangeFlight,
            minRangeRental,
            maxRangeRental
            
        }

        // send price form to API to get results for price tool
        const response = await axios.post("/profile/price-tool", priceForm)

        // set price tool list if status ok
        if(response.status == 200 || response.status == 204 ){

            setPricingToolList(prev => [...prev, ...response.data])
        }

        
    }

    // when first visiting their page, receive their starting componenets based on preferences
    useEffect(()=> {

        // create function to get profile information
        const getProfile = async () =>{
            
            // get id from context
           const userId = auth._id

           try{
                // call API using user's id
                const response = await axios.post("/profile/user-page", {userId})

                // if ok, set all three starting lists for top choices, recommendations, and price preferences. also set user again to get any updates
                if(response.status == 200){

                    setTopVacations(prev => ([...prev, ...response.data.topVacations]))
                    setRecommendationList(prev => [...prev, ...response.data.recommendationList].splice(0,8))
                    setUserPricePref(prev => [...prev, ...response.data.userPricePref].splice(0,8))
                    setAuth(response.data.user)
                }

            // handles any error in profile attempt
           }catch(error){

            console.log(error)
           }
        }

        getProfile()

    }, [setAuth])


    return(

        <>
            {/* set up overall page height and width*/}
            <div className="w-full h-full">

                {/* margin on left and right to push content center*/}
                <div className="ml-[13%] mr-[13%] flex flex-col gap-20">

                    <h1 className="text-4xl mt-10">Welcome, {auth?.username}</h1>

                    {/* section for user's top locations */}
                    <div>
                        <h1 className="text-3xl font-bold">My Top Vacations</h1>
                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* users favorites saved from liking a vacation */}
                            {topVacations.map(vacation => (

                                <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}

                        </div>

                    </div>

                    {/* section for vacation packages suggested to user */}
                    <div>
                        <h1 className="text-3xl font-bold">Based On Interests</h1>
                         <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* based on interest list  */}
                            {recommendationList.map(vacation => (

                                <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}

                        </div>
                    </div>


                    {/* section for the pricing tool that enables users to test different options */}
                    <form> 
                        <div className="flex">
                            <h1 className="text-3xl font-bold mr-auto">Pricing Tool</h1>
                            
                            {/* apply button to send new API request for pricing or reset to go back to user's preferences */}
                            <div className="flex mr-5 gap-10">
                                <button type="button" onClick={resetPriceTool} className="bg-[#DB3069] rounded-2xl text-2xl h-max w-max p-2 text-white cursor-pointer">Reset</button>
                                <button type="button" onClick={handlePriceTool} className="bg-[#1446A0] rounded-2xl text-2xl h-max w-max p-2 text-white cursor-pointer">Apply</button>
                            </div>
                        </div>
                        
                        {/* pricing tool section */}
                        <div className="mt-8 flex justify-between">

                            {/* hotel ranges*/}
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-semibold text-center">Hotels</h1>

                                {/* set hotel minimum*/}
                                <div className="mt-5 flex gap-10 ">
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Minimum</h1>
                                        <h1 className="text-2xl text-center">${minRangeHotel}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={minRangeHotel} onChange={(e) => setMinRangeHotel(e.target.value)}/>
                                    </div>

                                     {/* set hotel maximum*/}
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Maximum</h1>
                                        <h1 className="text-2xl text-center">${maxRangeHotel}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={maxRangeHotel} onChange={(e) => setMaxRangeHotel(e.target.value)}/>
                                    </div>
                                </div>
                            </div>

                            {/* flight ranges*/}
                             <div className="flex flex-col">
                                <h1 className="text-3xl font-semibold text-center">Flights</h1>

                                {/* set flight minimum*/}
                                <div className="mt-5 flex gap-10 ">
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Minimum</h1>
                                        <h1 className="text-2xl text-center">${minRangeFlight}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={minRangeFlight} onChange={(e) => setMinRangeFlight(e.target.value)}/>
                                    </div>

                                    {/* set flight maximum*/}
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Maximum</h1>
                                        <h1 className="text-2xl text-center">${maxRangeFlight}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={maxRangeFlight} onChange={(e) => setMaxRangeFlight(e.target.value)}/>
                                    </div>
                                </div>
                            </div>

                             {/* rental ranges*/}
                             <div className="flex flex-col">
                                <h1 className="text-3xl font-semibold text-center">Rentals</h1>

                                {/* set rental minimum*/}
                                <div className="mt-5 flex gap-10 ">
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Minimum</h1>
                                        <h1 className="text-2xl text-center">${minRangeRental}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={minRangeRental} onChange={(e) => setMinRangeRental(e.target.value)}/>
                                    </div>

                                     {/* set rental maximum*/}
                                    <div className="place-items-center flex flex-col gap-3">
                                        <h1 className="text-2xl">Maximum</h1>
                                        <h1 className="text-2xl text-center">${maxRangeRental}</h1>
                                        <input type="range" min={100} max={2000} step={100} value={maxRangeRental} onChange={(e) => setMaxRangeRental(e.target.value)}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                         {/* set display based on results or not*/}
                        { pricingToolList.length > 0 ?

                                <div className="flex justify-start flex-wrap gap-10 mt-10">

                                    {/* result list from using the pricing tool */}
                                    {pricingToolList.map(vacation => (

                                        <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                        hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                                    ))}

                                </div>

                            :

                                <div className="flex justify-start flex-wrap gap-10 mt-10">

                                    {/* users default preferences. changes upon using pricing tool */}
                                    {userPricePref.map(vacation => (

                                    <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                    hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                                    ))}

                                </div>

                        }

                    </form>

                </div>

            </div>
        
        </>
    )
}


export default Profile