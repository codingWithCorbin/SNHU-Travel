//used to organize and declare routes for the app
import {Route, Routes} from 'react-router'


//import axios to set up default server values
import axios from "axios"

//import the needed pages
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SearchPage from './pages/SearchPage'

import FormProvider from './context/FormProvider'

// set up base url inorder to reference server url when specifying routes
axios.defaults.baseURL = "http://localhost:4000/"

function App() {
  

  return (


    
    <>
      <FormProvider>

        {/* overall list of routes */}
        <Routes>

          {/* routes to home page */}
          <Route path='/' element={<HomePage/>}></Route>

          {/* routes to search page based on user's input */}
          <Route path='/search' element={<SearchPage/>}></Route>

          
          {/* routes to signup page */}
          <Route path='/signup' element={<SignupPage/>}></Route>
          

          {/* routes to login page */}
          <Route path='/login' element={<LoginPage/>}></Route>

          {/* routes to user's customized page */}
          <Route path='/myaccount' element={<ProfilePage/>}></Route>
          
          {/* routes to users settings */}
          <Route path='/myaccount/settings' element={<SettingsPage/>}></Route>

        </Routes>

      </FormProvider>
    </>

  )
}

export default App
