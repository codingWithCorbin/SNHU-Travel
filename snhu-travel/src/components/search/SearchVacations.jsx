
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router"

import VacationCard from "../general/VacationCard"


//import to create 0 result image
import { TbWorldSearch } from "react-icons/tb";

import axios from "axios"

// component to handle the search results
function SearchVacations(){

    const navigate = useNavigate()

    //unable parsing url
    const [userSearch] = useSearchParams()

    //get only inquiry test
    const newQuery = userSearch.get("inquiry")

    //set up list to store values
    const [vacationResults, setVacationResults] = useState([])

    //set up current page to track when moving between pages
    const [page, setPage] = useState(1)

    // state for the overall results to create the pages
    const [pageNum, setPageNum] = useState(0)

    //set up data per page
    const [limit, setLimit] = useState(10)

    // creates buttons depending on how much data is returned from query
    const calculatePages = () =>{
        
        // start with zero buttons
        const pageButtons = []

        // loop to create a button per page number
        for(let i = 0; i < pageNum; i++){

            // When clicking a button it sets page to send to server
            pageButtons.push(<button className="w-10 border-2 p-2 text-2xl odd:bg-slate-50 even:bg-slate-300 hover:bg-[#DB3069]
                 cursor-pointer" onClick={() => setPage(i + 1)}>{i + 1}</button>)
            
         
        }

        // return all of the buttons
        return <div className="place-self-center mt-10 flex gap-5">{pageButtons}</div>

    }

    // call the api with search input
    useEffect(() => {

        // function to call new inquiries
        const getSearchResults = async () =>{

            try{

                // update the url with new results
                navigate(`/search?inquiry=${newQuery}&page=${page}&limit=${limit}`)

                //use search, page, and limit for api call
                const response = await axios.get(`/search?inquiry=${newQuery}&page=${page}&limit=${limit}`)

                // if status was ok
                if(response.status == 200){

                    //set vacations
                    setVacationResults(response.data.results)

                    // set page numbers based on results divied by current limit or set at least one page if not enough
                    setPageNum(Math.ceil(response.data.total / limit) || 1)

                }

            }catch(error){

                //log error if there was an issue
                console.log(error.response.data.message)
            }
        }

        //call function and update if any different input in dependency array
        getSearchResults()

        //refresh if any variables change
    }, [newQuery, userSearch, limit,page])



    return(

        <>
        {/* check if results were returned or not */}
        {!vacationResults.length == 0 ?
        
            <div className="h-full w-full flex flex-col">

                {/* set up header to dsiplay inquiry, page, and limit*/}
                <div className="flex flex-col ml-[13.5%] mr-[13.5%] mt-15 gap-10">

                    <div className="flex">
                        <h1 className="text-2xl font-semibold mr-auto">Vacation results for: "{newQuery}"</h1>
                        <div className="flex mr-15 gap-10">
                            <h1 className="text-2xl font-semibold">Page: {page}</h1>

                            {/* create drop down for different limit*/}
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

                    {/* display the resulting vacations */}
                    <div className="flex justify-start flex-wrap gap-10 mt-5">

                         {/* random list of vacations */}
                        {vacationResults.map(vacation => (

                            <VacationCard id={vacation.id} location={vacation.location} image={vacation?.image} interest={vacation.interest}
                            hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                        ))}


                    </div>
                    
                    {/* page buttons after calculation*/}
                    <div>
                       {calculatePages()}
                    </div>

                </div>

            </div>

            : 
            
            
            <div className="h-[65vh] w-full flex flex-col place-content-center">

                {/* if not results, display message and image */}
                <div className="flex flex-col place-items-center gap-2">
                    <h1 className="text-4xl">No results found...</h1>
                    <TbWorldSearch size={150}/>
                </div>
                
            </div>
          }
        </>
    )
}

export default SearchVacations