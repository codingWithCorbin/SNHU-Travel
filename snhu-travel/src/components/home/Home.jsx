//
//testing purposes only. will be replaced with database
//
import { vacations} from "../test/testDB"

//import vacation card layout component
import VacationCard from "../general/VacationCard"

// component for overall homepage structure and logic
function Home(){


    return(

        <>

            <div className="w-full h-screen">


                <div className="flex flex-col ml-[13.5%] mr-[13.5%] mt-15 gap-10">


                    {/* overall mix of vacations */}
                    <div>

                        <h1 className="text-3xl">Discover</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                            {/* currently using test data */}
                            {vacations.map(vacation => (

                                <VacationCard id={vacation.id} location={vacation.location} image={vacation?.image} activity={vacation.activity}
                                hotel={vacation.hotel} flight={vacation.flight} rental={vacation.rental} /> 

                            ))}

                        </div>

                    </div>
                    
                    {/*  specifc vacations once database is set up*/}
                    <div>

                        <h1 className="text-3xl">Relaxation</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                
                        </div>

                    </div>

                    {/*  specifc vacations once database is set up*/}
                   <div>

                        <h1 className="text-3xl">Adventure</h1>

                        <div className="flex justify-start flex-wrap gap-10 mt-10">

                          
                        </div>

                    </div>




                </div>


            </div>
        
        </>
    )
}

export default Home