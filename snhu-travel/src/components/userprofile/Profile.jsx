
import { useAuth } from "../../hooks/useAuth"

import { useEffect, useState } from "react"

import axios from "axios"

import VacationCard from "../general/VacationCard"

// main component for user's profile interaction
function Profile(){

    const{auth} = useAuth()

    const [topVacations, setTopVacations] = useState([])
    const [recommendationList, setRecommendationList] = useState([])
    const [pricingToolList, setPricingToolList] = useState([])

    useEffect(()=> {

        const getProfile = async () =>{

           const userId = auth._id

           try{

                const response = await axios.post("/profile/user-page", {userId})

                if(response.status == 200){

                    setTopVacations(prev => ([...prev, ...response.data.topVacations]))
                    setRecommendationList(prev => [...prev, ...response.data.recommendationList].splice(0,8))
                }

           }catch(error){

            console.log(error)
           }
        }

        getProfile()

    }, [])

    
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

                            {/* users favorites saved from liking a vacation */}
                            {recommendationList.map(vacation => (

                                <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}

                        </div>
                    </div>


                    {/* section for the pricing tool that enables users to test different options */}
                    <div>  
                        <h1 className="text-3xl font-bold">Pricing Tool</h1>
                        <div>
                            <p>test</p>
                        </div>

                    </div>




                    
                </div>








            </div>
        
        
        </>
    )
}


export default Profile