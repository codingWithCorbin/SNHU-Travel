
import { useAuth } from "../../hooks/useAuth"

// main component for user's profile interaction
function Profile(){

    const{auth} = useAuth()

    return(

        <>
            {/* set up overall page height and width*/}
            <div className="w-full h-[90vh]">

                {/* margin on left and right to push content center*/}
                <div className="ml-[13%] mr-[13%] flex flex-col gap-20">

                    <h1 className="text-4xl mt-10">Welcome, {auth?.username}</h1>

                    {/* section for user's top locations */}
                    <div>
                        <h1 className="text-3xl">My Top Locations</h1>
                        <div>
                            <p>test</p>
                        </div>

                    </div>

                    {/* section for vacation packages suggested to user */}
                    <div>
                        <h1 className="text-3xl">Based On Interests</h1>
                        <div>
                            <p>test</p>
                        </div>
                    </div>


                    {/* section for the pricing tool that enables users to test different options */}
                    <div>  
                        <h1 className="text-3xl">Pricing Tool</h1>
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