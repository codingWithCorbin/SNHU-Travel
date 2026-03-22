import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//used to allow routes to communicate with browser
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* wrap routing capabilites through entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  

  </StrictMode>,
)
