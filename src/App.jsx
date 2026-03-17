//used to organize and declare routes for the app
import {Route, Routes} from 'react-router'


import HomePage from './pages/HomePage'

function App() {
  

  return (


    <>

      {/* overall list of routes */}
      <Routes>

        {/* routes to home page */}
        <Route path='/' element={<HomePage/>}/>




      </Routes>


    </>

  )
}

export default App
