
// import heart icon for user to like to add to their top choices
import { IoMdHeart } from "react-icons/io"
import { useState } from "react"

// this component will be used in both the home page and user's page to organzie vacation pacake info
// recieves props object based on database properties
function VacationCard({id, location, image, activity, hotel, flight, rental}){

    //current list is a place holder for only local state. will be replaced with user global fav state
    const [testfav, setTestfav] = useState([])

    // place color in state to handle liking and unliking
    const [favIcon, setFavIcon] = useState("#3C3C3B")

    // function to add and remove vacation id from user's favorites and switches between heart icon colors
    const handleFav = (id) =>{

        if(testfav.includes(id)){

            setTestfav(prev => prev.filter(id => id !== id))

        } else{

            setTestfav(prev => [...prev, id])
        }
    
        setFavIcon(favIcon === "#3C3C3B" ? "#DB3069" : "#3C3C3B")
        
    }


    return(

        <>

            <div className="h-75 w-75 bg-slate-200 rounded-2xl border border-slate-300 bg-cover" style={{backgroundImage: `url(${image})`}}>

                <div className="flex flex-col">

                    <div className="flex w-full h-max bg-red-200 p-3 rounded-t-xl">

                        <h1 className="text-2xl mr-auto">{location}</h1>

                        <button className="cursor-pointer" onClick={() => handleFav(id)}><IoMdHeart size={25} color={favIcon}/></button>

                    </div>
                    
                   






                </div>

            </div>
        
        
        </>
    )
}

export default VacationCard