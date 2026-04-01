
import { useState, useRef } from "react"

// component sets up the multistep form for users to create an account
// takes a list of forms as props to navigate through
export function useForms(forms){

    //set index state
    const[formIndex, setFormIndex] = useState(0)

    // create ref variable to check input fields without refreshing state
    const validForm = useRef()
    

    // go to next page
    function nextForm(){

        // if not all fields have been completed, user cannot proceed. 
        if(!validForm.current.reportValidity()){

            return
        }

        setFormIndex(i => {

            if(i >= forms.length - 1){
                return i
            }

            return i + 1
        })

    }

    // go to previous page
    function previousForm(){

        setFormIndex(i =>{

            if(i <= 0){

                return i
            }

            return i - 1
        })

    }
    
    return{

        validForm,
        formIndex,
        forms,
        form: forms[formIndex],
        nextForm,
        previousForm

    }
}


