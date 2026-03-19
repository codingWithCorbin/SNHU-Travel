//used to organize and declare routes for the app
import {Route, Routes} from 'react-router'

//import the needed pages
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

function App() {
  

  return (


    
    <>

      {/* overall list of routes */}
      <Routes>

        {/* routes to home page */}
        <Route path='/' element={<HomePage/>}></Route>

        {/* routes to signup page */}
        <Route path='/signup' element={<SignupPage/>}></Route>

        {/* routes to login page */}
        <Route path='/login' element={<LoginPage/>}></Route>




      </Routes>


    </>

  )
}

export default App
