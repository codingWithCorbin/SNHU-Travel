
// import globe icon for site logo
import { FcGlobe } from "react-icons/fc";
import { Link } from "react-router";

import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router";


//header that users will see when accessing home page
function HomeHeader(){

    //import navigate to go to the search page
    const navigate = useNavigate()

    //get user search
    const [userSearch, setUserSearch] = useState()

    // if a search term is provided, call api for specifc results
    const handleSearch = (e) =>{

        // make sure input is there to prevent blank query
        if(userSearch){

            // after inputing value and hitting enter, search will commence
            if(e.key == "Enter"){

                // navigate to the page with query
                navigate({

                    // use spcifc route/ component
                    pathname: "/search",

                    // structure the input using state variable
                    search: `?${createSearchParams({ inquiry : userSearch})}&page=1&limit=10`
                })
            }
        }
       
    }

    return(

        <>
        
            <div className="w-full h-[10vh] flex bg-[#EBEBD3] place-items-center border-b border-b-slate-300 justify-evenly">

                {/* site name and logo */}
                <div className="flex-col">
                    
                    {/* links back to home page */}
                    <Link to={"/"}>
                        <div className="place-items-center">
                            <h1 className="text-xl text-[#1446A0]">SNHU Travel</h1>
                            <FcGlobe size={45}/>
                        </div>
                    </Link>

                </div>

                {/* overall search bar for homepage*/}
                <div className="flex place-content-center w-[30%]">

                    <input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} onKeyUp={handleSearch} type="search" placeholder="Find Your Vacation &#127865;"
                     className="w-[66%] border-2 rounded-3xl h-10 bg-white p-3" />

                </div>

                {/* login and signup links for site */}
                <div className="flex gap-10">

                    <Link to={"/login"}>
                        <h1 className="hover:text-[#DB3069] hover:underline hover:underline-offset-10 text-3xl text-[#1446A0]">Login</h1>
                    </Link>

                    <Link to={"/signup"}>
                        <h1 className="hover:text-[#DB3069] hover:underline hover:underline-offset-10 text-3xl text-[#1446A0]">Signup</h1>
                    </Link>

                </div>


            </div>
        
        
        
        </>
    )
}

export default HomeHeader