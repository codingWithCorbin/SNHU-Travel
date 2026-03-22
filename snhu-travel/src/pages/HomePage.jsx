
//import Home components accessed through the Home Page
import Home from "../components/home/Home"
import HomeHeader from "../components/home/HomeHeader"

//component for routing to Homepage
function HomePage(){



    return(

        <>
        
            <HomeHeader />
            <Home />

        </>
    )

}

export default HomePage