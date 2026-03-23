
import { useState } from "react"

import { Link } from "react-router"

// component that enables users to make updates to their account
function Settings(){

    //create state for enting and exiting edit mode
    const [editMode, setEditMode] = useState(false)

    //access input elements to enable or disable based on editing or not
    const [readonly, setReadonly] = useState(true)
    const [disabledPrice, setDisabledPrice] = useState(true)

    // sets edit mode, readonly, and range disable to be opposite of current state
    const handleEdit = () =>{

        setEditMode(!editMode)
        setReadonly(!readonly)
        setDisabledPrice(!disabledPrice)
    
    }

    //
    // currently not set up without database
    //

    return(

        <>

            <div className="w-full h-full place-items-center">

                <Link to={"/myaccount"}>
                    <h1 className="ml-[14%] text-3xl text-[#1446A0] mt-10 hover:text-[#DB3069] hover:underline ">Back to My Page</h1>
                </Link>

                <div className="flex flex-col bg-slate-50 h-fit w-[30%] rounded-3xl shadow shadow-gray-600 p-5 mt-15 mb-15">

                    <div className="flex place-items-center">

                        <h1 className="text-3xl mr-auto">Settings</h1>

                        {/* set up different button functions depending on if user is editing or not*/}
                        {editMode

                            ? <button type="button" onClick={handleEdit} className="border text-xl p-2 bg-[#DB3069] text-white rounded-2xl cursor-pointer">Cancel</button>

                            : <button type="button" onClick={handleEdit} className="border text-xl p-2 bg-[#1446A0] text-white rounded-2xl cursor-pointer">Edit</button>
                        
                        }
            
                    </div>

                    <form className="flex flex-col place-self-center mt-5 gap-7">

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Firstname</h1>
                            <input readOnly={readonly} id="edit-input" type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Lastname</h1>
                            <input readOnly={readonly} type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Username</h1>
                            <input readOnly={readonly} type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex gap-2">
                          
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl">Password</h1>
                                <input readOnly={readonly} type="password" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                            </div>
    
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl">Confirm Password</h1>
                                <input readOnly={readonly} type="password" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                            </div>
                             
                        </div>

                        <div className="flex flex-col gap-2">

                            <h1 className="text-2xl">Interests</h1>
                            
                            <input readOnly={readonly} type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>

                            <div className="h-40 w-full border flex bg-white rounded p-2">

                            </div>

                            
                        </div>


                        <div className="flex flex-col gap-2">

                            <h1 className="text-2xl">Pricing</h1>

                            <div className="flex justify-between">

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Hotels</h1>
                                    <h1>price</h1>
                                    <input id="price-range" disabled={disabledPrice} value={null} min={100} max={2000} step={100} type="range" onInput={null} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Flights</h1>
                                    <h1>price</h1>
                                    <input id="price-range" disabled={disabledPrice} value={null} min={100} max={2000} step={100} type="range" onInput={null} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Rentals</h1>
                                    <h1>price</h1>
                                    <input id="price-range" disabled={disabledPrice} value={null} min={100} max={2000} step={100} type="range" onInput={null} />
                                </div>

                            </div>
                            
                        </div>
                        
                        {/* enable submit if in edit mode */}
                        {/* currently disabled to not submit */}
                        {editMode

                            ? <button type="button" className="border text-xl p-2 bg-[#1446A0] text-white rounded-2xl cursor-pointer mt-5">Submit</button>
                            
                            : null
                        }

                    </form>

                </div>

            </div>
        
        </>
    )
}


export default Settings