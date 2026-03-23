
//import Home components accessed through the Home Page
import Home from "../components/home/Home"
import HomeHeader from "../components/home/HomeHeader"
import Footer from "../components/general/Footer"

//component for routing to Homepage
function HomePage(){



    return(

        <>
        
            <HomeHeader />
            <Home />
            <Footer />    

        </>
    )

}

export default HomePage