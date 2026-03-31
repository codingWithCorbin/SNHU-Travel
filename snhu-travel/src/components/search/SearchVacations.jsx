
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

import VacationCard from "../general/VacationCard"


import axios from "axios"

// component to handle the search results
function SearchVacations(){

    //unable parsing url
    const [userSearch] = useSearchParams()

    //get only inquiry test
    const newQuery = userSearch.get("inquiry")

    //set up list to store values
    const [vacationResults, setVacationResults] = useState([])

    //set up page for results
    // not working completely, need to fix query
    const [page, setPage] = useState(1)

    //set up data per page
    const [limit, setLimit] = useState()

    // call the api with search input
    useEffect(() => {

        
        const getSearchResults = async () =>{

            try{

                //use search, page, and limit for api call
                const response = await axios.get(`/search?inquiry=${newQuery}&page=${page}&limit=${limit}`)

                if(response.status == 200){

                    //set vacations
                    setVacationResults(prev => [prev, ...response.data.results])
                }

            }catch(error){

                //log error if there was an issue
                console.log(error.response.data.message)
            }
        }

        getSearchResults()

        //refresh if any variables change
    }, [newQuery, userSearch, limit])



    return(

        <>

        {!vacationResults.includes(undefined) ?
        
            <div className="min-h-dvh w-full flex flex-col">


                <div className="flex flex-col ml-[13.5%] mr-[13.5%] mt-15 gap-10">

                    <div className="flex">
                        <h1 className="text-2xl font-semibold mr-auto">Vacation results for: "{newQuery}"</h1>
                        <div className="flex mr-15 gap-10">
                            <h1 className="text-2xl font-semibold">Page: {page}</h1>
                            <div className="flex">
                                <h1 className="text-2xl font-semibold mr-5">Limit</h1>
                                <select value={limit} onChange={(e) => setLimit(e.target.value)} className="w-15 h-10 border text-center">
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-start flex-wrap gap-10 mt-5">

                         {/* random list of vacations */}
                        {vacationResults.map(vacation => (

                            <VacationCard id={vacation.id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                            hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                        ))}


                    </div>

                </div>

            </div>

            : <h1>No results found</h1>}
        </>
    )
}

export default SearchVacations