
// import heart icon for user to like to add to their top choices
import { IoMdHeart } from "react-icons/io"
import { useEffect, useState } from "react"

import { useAuth } from "../../hooks/useAuth"

import axios from "axios"


// this component will be used in both the home page and user's page to organzie vacation pacake info
// recieves props object based on database properties
function VacationCard({id, location, image, interest, hotel, flight, rental}){

    const {auth, setAuth} = useAuth()

    // random array of colors
    const headerColors = ["#fabfbf", "#f1f5b9", "#c8f1c6", "#c6f1f1", "#c9c6f1", "#e7c6f1", "#5094DE", "#E3B505", "#74A1B5", "#56A3A6"]

    // get random index from color array
    const randomizeHeaderColor = () =>{

        const getrandom = Math.floor(Math.random() * headerColors.length)

        return headerColors[getrandom]

    }

    // place random color in state to generate background color
    const [randomColor] = useState(randomizeHeaderColor())

    // place color in state to handle liking and unliking
    //const [favIcon, setFavIcon] = useState("#3C3C3B")

    // place color in state to handle liking and unliking. will remain "checked" or red if liked.
    const [favIcon, setFavIcon] = useState(
        auth.topChoices ?
            auth.topChoices.includes(id) ? "#DB3069" : "#3C3C3B"
        :
        null
    )


    // function to add and remove vacation id from user's favorites and switches between heart icon colors
    const handleFav = async (id) =>{

        setFavIcon(favIcon === "#3C3C3B" ? "#DB3069" : "#3C3C3B")
    
        const userId = auth._id

        try{

            const response = await axios.put("/update-fav", {userId, id})
            
            if(response.status == 200){

                console.log(response.data.message)
            }

        }catch(error){

            console.log(error)
        }
        
    }
    

    return(

        <>

            <div className=" flex flex-col h-85 w-75 rounded-2xl border border-slate-300 bg-cover" style={{backgroundImage: `url(${image})`}}>

                <div className="flex w-full h-max p-3 rounded-t-xl mb-auto" style={{background: randomColor}}>

                    <h1 className="text-2xl mr-auto font-semibold">{location}</h1>

                    {auth._id ? 

                        <button className="cursor-pointer" onClick={() => handleFav(id)}><IoMdHeart size={25} color={favIcon}/></button>

                        : null
                    }

                </div>


                <div className="flex flex-col  w-full h-fit bg-slate-200 rounded-b-xl p-2">

                    <h1 className="text-2xl">{interest}</h1>

                    <hr className="w-[90%] mb-2 mt-1"/>

                    <div className="flex justify-between">

                        <div>
                            <h2>Hotel</h2>
                            <h2>${hotel}</h2>
                        </div>

                        <div>
                            <h2>Flight</h2>
                            <h2>${flight}</h2>
                        </div>



                        <div>
                            <h2>Rental</h2>
                            <h2>${rental}</h2>
                        </div>


                    </div>


                </div>

              

            </div>
        
        
        </>
    )
}

export default VacationCard