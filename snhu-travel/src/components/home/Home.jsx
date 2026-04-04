
//import vacation card layout component
import VacationCard from "../general/VacationCard"

import axios from "axios"
import { useState, useEffect } from "react"

import { useAuth } from "../../hooks/useAuth"

// component for overall homepage structure and logic
function Home(){

    const {auth} = useAuth()

    //create list for all vacations
    const [overallList, setOverallList] = useState([])

    //get shorter list
    const discoverList = overallList.splice(0,12)

    // get specifc interests list
    const relaxationList = overallList.filter(vacation => vacation.interest === "Spa" || vacation.interest === "Music" || vacation.interest === "Nature").splice(0,12)
    
    // get specifc interests list
    const adventureList = overallList.filter(vacation => vacation.interest === "Hiking" || vacation.interest === "Touring" || vacation.interest === "Attractions").splice(0,12)
    
    // create a useeffect to run on page load to get vacation data
    useEffect(()=> {

        
        // function to get all vacations
        const getVacations = async () =>{

            try{

                //call api for all vacations
                const response = await axios.get("/vacations")

                // if no errors
                if (response.status == 200){

                    // set the overall list
                    setOverallList(prev => [prev, ...response.data])
                }

            }catch(error){

                // print error if it occured
                console.log(error.response.data.message)

            }

        }

        // call the function on load
        getVacations()

        //only run once
    }, [])


    
    return(

        <>

            <div className="w-full h-full">


                <div className="flex flex-col ml-[13.5%] mr-[13.5%] mt-15 gap-10">


                    {/* overall mix of vacations */}
                    <div>

                        <h1 className="text-3xl font-bold">Discover</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* random list of vacations */}
                            {discoverList.map(vacation => (

                                <VacationCard id={vacation?._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}

                        </div>

                    </div>
                    
                    {/*  specifc vacations once database is set up*/}
                    <div>

                        <h1 className="text-3xl font-bold">Relaxation</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* list of relaxing vacations */}
                            {relaxationList.map(vacation => (

                                <VacationCard id={vacation._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}
                
                        </div>

                    </div>

                    {/*  specifc vacations once database is set up*/}
                   <div>

                        <h1 className="text-3xl font-bold">Adventure</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* list of adventures */}
                            {adventureList.map(vacation => (

                                <VacationCard id={vacation._id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}
                          
                        </div>

                    </div>




                </div>


            </div>
        
        </>
    )
}

export default Home