

// the second section of the form handles initial preferences to suggest vacations
// based on interests as well as prices
function StartingPreferences(){

    return(

        <>
        
            <div className="w-full h-full">


                <div className="flex flex-col gap-5">

                    <h1 className="place-self-center text-3xl">Preferences</h1>

                     <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Interests / Activites</h2>
                        <input required placeholder="What do you want to do on vacation?" type="text" className="border rounded-2xl h-8 w-[90%] bg-white p-3"/>
                    </div>

                    <div className="h-[50%] w-full">
                        <textarea readOnly rows={7} className="resize-none h-full w-full border"></textarea>
                    </div>


                    <div>

                        <h1>Pricing</h1>

                        <div className="flex">
                            
                            <div>
                                h1
                            </div>



                            <div>

                            </div>


                            <div>

                            </div>

                        </div>

                    </div>

                </div>


            </div>
        
        </>
    )
}

export default StartingPreferences