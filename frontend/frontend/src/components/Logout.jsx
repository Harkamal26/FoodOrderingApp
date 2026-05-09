import React, { useEffect } from 'react'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import Home from './Home';
const Logout = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
    navigate('/login')
  })
    
  return (
    <div>
      Logging Out...
    </div>
  )
}
export default Logout
