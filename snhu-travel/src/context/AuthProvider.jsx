
import { useState } from "react"
import { AuthContext } from "./contextVariables"

// create context to access user data through out app
function AuthProvider({children}){

    // create state to use when needed
    const[auth, setAuth] = useState({})

    // create wrapper component to use in App page
    return(

        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider