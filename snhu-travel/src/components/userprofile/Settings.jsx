
import { useState } from "react"

import { Link } from "react-router"

import { useAuth } from "../../hooks/useAuth"

import axios from "axios"
import { useEffect } from "react"

// component that enables users to make updates to their account
function Settings(){

    const{auth, setAuth} = useAuth()

    const [newInterest, setNewInterest] = useState("")

    const[editForm, setEditForm] = useState({

        firstname: "",
        lastname: "",
        username: "",
        newPassword: "",
        confirmPassword: "",
        interests: auth.interests,
        hotels: auth.pricePreference.hotels,
        flights: auth.pricePreference.flights,
        rentals: auth.pricePreference.rentals,

    })

     // upon entering a new interest add it to the list
    const addToInterests = (e, value) =>{

        if(e.key === "Enter" && value){

            setEditForm(prev => ({...prev, interests: [...prev.interests, value]}))
            setNewInterest("")
        }
        
    }

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

    
    const handleEditSubmit = async (e) =>{

        e.preventDefault()

        const submitForm = editForm

        submitForm.id = auth._id

        Object.keys(submitForm).forEach(key =>{

            if(!submitForm[key]){

                delete submitForm[key]
            } 
        })

        if(submitForm.newPassword !== submitForm.confirmPassword){

            return console.log("Password entries do not match")

        }

        delete submitForm.confirmPassword

        console.log(submitForm)

        try{

            const response = await axios.patch("/profile/settings", submitForm)

            if(response.status == 200){

                setAuth(response.data)
            }

            handleEdit()


        }catch(error){

            console.log(error)

        }

    }

    useEffect(() => {

    }, [auth, editMode])


    return(

        <>
        
            <div className="w-full h-full place-items-center">

                <Link to={"/myaccount"}>
                    <h1 className="ml-[14%] w-max text-3xl text-[#1446A0] mt-10 hover:text-[#DB3069] hover:underline ">Back to My Page</h1>
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
                            <input readOnly={readonly} value={editForm.firstname} placeholder={auth.firstname}
                            onChange={(e) => setEditForm({...editForm, firstname: e.target.value})} id="edit-input" type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Lastname</h1>
                            <input readOnly={readonly} value={editForm.lastname} placeholder={auth.lastname}
                            onChange={(e) => setEditForm({...editForm, lastname: e.target.value})} type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Username</h1>
                            <input readOnly={readonly} value={editForm.username} placeholder={auth.username}
                            onChange={(e) => setEditForm({...editForm, username: e.target.value})} type="text" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                        </div>

                        <div className="flex gap-2">
                          
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl">Password</h1>
                                <input readOnly={readonly} value={editForm.newPassword} placeholder="*****"
                                onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})} type="password" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                            </div>
    
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl">Confirm Password</h1>
                                <input readOnly={readonly} value={editForm.confirmPassword} 
                                onChange={(e) => setEditForm({...editForm, confirmPassword: e.target.value})} type="password" className="h-8 w-full border rounded-2xl bg-white p-3"/>
                            </div>
                             
                        </div>

                        <div className="flex flex-col gap-2">

                            <h1 className="text-2xl">Interests</h1>
                            
                            <input
                                readOnly={readonly}
                                value={newInterest} 
                                type="text"
                                onChange={(e) => setNewInterest(e.target.value)}
                                onKeyUp={(e) => addToInterests(e, newInterest)}
                                className="h-8 w-full border rounded-2xl bg-white p-3"
                            />

                            <div className="h-40 w-full border flex bg-white rounded p-2">

                                 {editForm?.interests.map(interest => (
                            
                                    <div className="border rounded-2xl mr-4 h-fit w-fit p-2 flex bg-amber-100">
                                        <p>{interest}</p>
                                        {editMode 
                                            ?
                                        <button onClick={() => setEditForm(prev => ({...prev, interests: prev.interests.filter(val => val != interest)}))}
                                         type="button" className="ml-3 text-red-500 font-bold cursor-pointer">X</button> 
                                        
                                            :
                                        <button type="button" className="ml-3 text-red-500 font-bold cursor-pointer"></button>
                                         }
                                    </div>
                    
                                ))}

                            </div>

                            
                        </div>


                        <div className="flex flex-col gap-2">

                            <h1 className="text-2xl">Pricing</h1>

                            <div className="flex justify-between">

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Hotels</h1>
                                    <h1>${editForm.hotels}</h1>
                                    <input id="price-range" disabled={disabledPrice} value={editForm.hotels} 
                                    min={100} max={2000} step={100} type="range" onInput={e => setEditForm({...editForm, hotels: e.target.value})} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Flights</h1>
                                    <h1>${editForm.flights}</h1>
                                    <input id="price-range" disabled={disabledPrice} value={editForm.flights}  
                                    min={100} max={2000} step={100} type="range" onInput={e => setEditForm({...editForm, flights: e.target.value})} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl">Rentals</h1>
                                    <h1>${editForm.rentals}</h1>
                                    <input id="price-range" disabled={disabledPrice} value={editForm.rentals}  
                                    min={100} max={2000} step={100} type="range" onInput={e => setEditForm({...editForm, rentals: e.target.value})} />
                                </div>

                            </div>
                            
                        </div>
                        
                        {/* enable submit if in edit mode */}
                        {/* currently disabled to not submit */}
                        {editMode

                            ? <button type="button" className="border text-xl p-2 bg-[#1446A0] text-white rounded-2xl cursor-pointer mt-5" onClick={handleEditSubmit}>Submit</button>
                            
                            : null
                        }

                    </form>

                </div>

            </div>
        
        </>
    )
}


export default Settings