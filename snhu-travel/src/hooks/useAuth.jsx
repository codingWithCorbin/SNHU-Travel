
import { useContext } from "react";
import { AuthContext } from "../context/contextVariables";

// create custom hook to use when needed in components
export function useAuth(){

    // set up context to reduce repeated code
    const context = useContext(AuthContext)

    return context

}