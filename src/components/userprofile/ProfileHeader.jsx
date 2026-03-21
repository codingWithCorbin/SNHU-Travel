// import globe icon for site logo
import { FcGlobe } from "react-icons/fc"

//import Link component to to use with router
import { Link } from "react-router"



// header component for the user's mainpage as well as the settings page
function ProfileHeader(){

    return(


        <>

            <div className="w-full h-[10vh] flex bg-[#EBEBD3] place-items-center border-b border-b-slate-300">

                {/* site name and logo */}
                <div className="flex-col ml-[13%] mr-auto">
                    
                    {/* links back to home page */}
                    <Link to={"/"}>
                        <div className="place-items-center">
                            <h1 className="text-xl text-[#1446A0]">SNHU Travel</h1>
                            <FcGlobe size={45}/>
                        </div>
                    </Link>

                </div>

                {/* options to go to profile settings and logout back to home page */}
                <div className="flex gap-10 mr-[13%]">

                    <Link to={"/myaccount/settings"}>
                        <h1 className="hover:text-[#DB3069] hover:underline hover:underline-offset-10 text-3xl text-[#1446A0]">My Account</h1>
                    </Link>

                    <Link to={"/"}>
                        <h1 className="hover:text-[#DB3069] hover:underline hover:underline-offset-10 text-3xl text-[#1446A0]">Logout</h1>
                    </Link>

                </div>


            </div>
        
        
        
        </>
    )
    
}


export default ProfileHeader