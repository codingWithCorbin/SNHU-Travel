
import { useContext } from "react";
import { AuthContext } from "../context/contextVariables";

export function useAuth(){

    const context = useContext(AuthContext)

    return context

}