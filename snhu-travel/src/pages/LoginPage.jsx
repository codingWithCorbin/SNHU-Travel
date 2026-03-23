
import Login from "../components/login/Login"
import GeneralHeader from "../components/general/GeneralHeader"
import Footer from "../components/general/Footer"


// page will serve as routing point for login components
function LoginPage(){


    return(


        <>
            <GeneralHeader />
            <Login/>
            <Footer />
        
        </>
    )
}

export default LoginPage