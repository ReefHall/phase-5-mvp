import React, {useState} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from './HomePage'
import Login from './Login'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    function navHome() {
        navigate('/')
    
    }

  return (
    <Routes>
        <Route path ='/' element ={<HomePage currentUser={currentUser}/>}/>
        <Route path ='login' element ={<Login navHome={navHome}/>}/>
    </Routes>
  
  )
}

export default App