import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './MyNavbar.css';
import Admin from './Admin';
import AddItem from './AddItem';
const MyNavbar = () => {
  // const [isLogin,setIsLogin] = useState(true);
  // useEffect(()=>{
  //   const checkLogin= ()=>{
  //     setIsLogin(!!localStorage.getItem('userId'));
  //   }
  //   checkLogin();
  //     window.addEventListener("storage",checkLogin);
  //     return ()=> window.removeEventListener('storage',checkLogin)
  // },[])
  const [isLogin, setIsLogin] = useState(false);
  const [role,setRole] = useState(null);
  useEffect(()=>{
    const checkAuth = ()=>{
      setIsLogin(!!localStorage.getItem('userId'));
      setRole(localStorage.getItem('role'))
    };
    checkAuth();
    window.addEventListener('storage',checkAuth);
    return ()=> window.removeEventListener('storage',checkAuth)
  })
  // const isLogin = !!localStorage.getItem('userId');
  // const role = localStorage.getItem('role');
  // const [isAdmin,setAdmin] = useState(true);
  // useEffect(()=>{
  //   if(role=='user') setAdmin(false);
  // else setAdmin(true)
  // },[])
  const handleLogout = ()=>{
    localStorage.clear();
  }
  return (
    <div>
     <Navbar style={{ backgroundColor: "black" }} data-bs-theme="">
        <Container style={{display:"flex", flexDirection:"row"}}>
          <Navbar.Brand as={Link} to='/' style={{ color: "white" }}>Home</Navbar.Brand>
          <Nav className="me-auto">
      {isLogin ? (
        <>
            <Nav.Link as={Link} to={'/cart'} style={{ color: "white" }}>Cart</Nav.Link>
            <Nav.Link as={Link} to={'/orders'} style={{ color: "white" }}>Orders</Nav.Link>
            {role === 'admin' &&
             <Nav.Link as={Link} to={'/additem'} style={{ color: "white" }}>Add Items</Nav.Link> }
           
            <Nav.Link as={Link} onClick={handleLogout} to={'/logout'} style={{ color: "white" }}>Logout</Nav.Link>
</>
            ):(
              <>
            <Nav.Link as={Link} to="/login" style={{ color: "white" }}>Login</Nav.Link>
            <Nav.Link as={Link} to='/register' style={{ color: "white" }}>Register</Nav.Link>
            <Nav.Link as={Link} to='/admin' style={{ color: "white" }}>Admin</Nav.Link>
            </>
            )
          
}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
export default MyNavbar
