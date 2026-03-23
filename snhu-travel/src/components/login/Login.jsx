
import { useState } from "react"

//import axios to contact backend
import axios from "axios"

//import navigator to route to user's page after successful login
import { useNavigate } from "react-router"

// component that handles login actions by users
function Login(){

    //create navigate variable
    const navigate = useNavigate()

    // create error state to display login error when needed. starts at false until an error occurs
    const [error, setError] = useState(false)

    //state for username and password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    // set up async login function to backend
    const handleLogin = async (e) =>{
        
        // enable defining how the form submission will work instead of default
        e.preventDefault()
        
        //attempt to login
        try{
            // use server path with variables
            const response = await axios.post("/auth/login", {username, password});

            // check if status is ok
            if(response.status == 200){

                //test message alert
                alert("Welcome user!")

                // navigate to user page after 3 seconds
                setTimeout(() => {

                    navigate("/myaccount")

                }, 3000);
            }

        }catch(error){

            //print error to console
            console.log(error.response.data.error)

            //display error component
            setError(true)

            //reset login
            setUsername("")
            setPassword("")
            
            //remove error component after 5 seconds
            setTimeout(() => {
                setError(false)
            }, 5000);

        }
        

    }

    return(


        <>
            <div className="flex-col">

                {/* error notifcation displays upon error */}
                {error ?
                    <div className="w-full h-[8vh] bg-red-200 place-items-center place-content-center">
                        <h1 className="text-2xl">Username or password is incorrect. Please try again.</h1>
                    </div>

                    : null
                }
                <div className="w-full h-[80vh] place-content-center place-items-center flex flex-col">


                    <div className="flex flex-col bg-slate-50 h-[60%] w-[25%] rounded-3xl shadow shadow-gray-600 align-middle p-3">

                        <h1 className="text-4xl place-self-center mb-4">Welcome Back</h1>
                        <hr className="bg-gray-100 w-[75%] h-0.2 place-self-center mb-8"/>
                        
                        <form onSubmit={handleLogin} className="flex flex-col gap-10">
                            {/* section to input username */}
                            <div className="flex flex-col ml-[5%] gap-3">
                                <h1 className="text-3xl">Username</h1>
                                <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="border-2 rounded-xl h-10 w-[90%] p-2"/>
                            </div>


                            {/* section to input password */}
                            <div className="flex flex-col ml-[5%] gap-3">
                                <h1 className="text-3xl">Password</h1>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border-2 rounded-xl h-10 w-[90%] p-2"/>
                            </div>

                            {/* button to submit login */}
                            <div className="place-self-center w-[90%]">
                                <button className="cursor-pointer border h-fit w-full rounded-2xl p-2 text-center mt-5 bg-[#1446A0] text-white text-xl" type="submit">Login</button>
                            </div>
                        </form>

                    </div>

                </div>
        
            </div>
        </>
    )
}

export default Login