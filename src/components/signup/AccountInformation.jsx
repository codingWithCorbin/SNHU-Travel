

// first form element that obtains users name and login elements
function AccountInformation(){

    return(

        <>
            <div className="w-full h-full">


                <div className="flex flex-col gap-5">

                    <h1 className="place-self-center text-3xl">Account Information</h1>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Firstname</h2>
                        <input required type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Lastname</h2>
                        <input required type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Username</h2>
                        <input required type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Password</h2>
                        <input required type="password" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>


                </div>


            </div>
        
        </>
    )
}

export default AccountInformation