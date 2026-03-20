//import hooks for page
import { useState } from "react"
import { useForms } from "../../hooks/useForm"

//import the components used on this component
import AccountInformation from "./AccountInformation"
import StartingPreferences from "./StartingPreferences"


// component that handles signup forms to create users
function Signup(){

    //get elements from the form hook to use within signup componenet
    const {forms, form, formIndex, nextForm, previousForm} = useForms([<AccountInformation/>, <StartingPreferences />])

    // holds the list of vacation images that the page cycles through
    const [cycleImages] = useState(["/src/assets/vacation-images/beach-vacation.jpg"])


    const handleSubmit = (e) =>{

        e.preventDefault()
    }

    return(

        <>
            <div className="w-full h-[80vh] flex place-content-center place-items-center">

                <div className="flex bg-slate-50 h-[75%] w-[50%] rounded-3xl shadow shadow-gray-600 align-middle">

                    {/* left section of the signup section with images cyclying*/}
                    <div className="h-full w-[50%]">

                        {cycleImages.map((image,index)=> {

                            return <img src={image} className="h-full w-full rounded-l-2xl"/>

                        })}
                    </div>



                    {/* right side of signup section with the form elements */}
                    <form className="h-full w-[50%] rounded-r-2xl p-5" onSubmit={handleSubmit}>

                        {/* handles the two different forms */}
                        <div>
                            {form}
                        </div>

                        {/* buttons to navigate through forms */}
                        <div className="">

                            {/* condition check if on the first form to only display Next button */}
                            {formIndex === 0 ?
                            
                                <div className="flex place-self-end mt-15">
                                    <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#1446A0] text-white cursor-pointer" type="button" onClick={nextForm}>Next</button>
                                </div>
                                
                                //if not the second form, display previous to go back or to complete sign up with submit
                                :
                                
                                 <div className="flex place-self-end mt-15 gap-5">
                                    <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#DB3069] text-white cursor-pointer" type="button" onClick={previousForm}>Previous</button>
                                    <button className="h-fit w-fit p-2 text-xl border rounded-2xl bg-[#1446A0] text-white cursor-pointer" type="submit">Submit</button>
                                </div>

                            }
                        </div>

                    </form>


                </div>

            </div>
    
        </>
    )


}

export default Signup