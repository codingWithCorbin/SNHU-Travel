

import { useContext } from "react"
import { FormContext } from "../../context/contextVariables"

// first form element that obtains users name and login elements
function AccountInformation(){

    //get firstform from context
    const {firstname, setFirstname, lastname, setLastname, username, setUsername, password, setPassword} = useContext(FormContext)

    return(

        <>

            <div className="w-full h-full">

                <div className="flex flex-col gap-5">

                    <h1 className="place-self-center text-3xl">Account Information</h1>

                    {/* obtain firstname */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Firstname</h2>
                        <input required pattern="[a-zA-Z0-9]+" value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>
                    
                    {/* obtain lastname */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Lastname</h2>
                        <input required pattern="[a-zA-Z0-9]+" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>
                    
                    {/* obtain username */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Username</h2>
                        <input required pattern="[a-zA-Z0-9]+" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>

                    {/* obtain password */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Password</h2>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>


                </div>


            </div>
        
        </>
    )
}

export default AccountInformation