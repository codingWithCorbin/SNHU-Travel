

// component that handles login actions by users
function Login(){

    return(


        <>
            <div className="flex-col">

                {/* error notifcation for login attempts */}


                <div className="w-full h-[8vh] bg-red-200 place-items-center place-content-center">
                    <h1 className="text-2xl">Username or password is incorrect. Please try again.</h1>
                </div>

                <div className="w-full h-[80vh] place-content-center place-items-center">


                    <div className="flex-col bg-slate-50 h-[50%] w-[35%] rounded-3xl shadow shadow-gray-600 align-middle p-3">

                        <h1>Login</h1>

                        {/* section to input username */}
                        <div>
                            <h1 className="text-3xl">Username</h1>
                            <input type="text" className="border-2 rounded-xl h-10 w-[50%]"/>
                        </div>

                        {/* section to input password */}
                        <div>
                            <h1>Password</h1>
                            <input type="password"/>
                        </div>


                        {/* button to submit login */}
                        <div>
                            <button>Submit</button>
                        </div>


                    </div>

                </div>
        
            </div>
        </>
    )
}

export default Login