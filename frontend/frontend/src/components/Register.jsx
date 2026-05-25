import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState(0);
  const [address,setAddress] = useState('');
  // const [role,setRole] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/register",{
      method: "POST",// send data  and get for taking / requesting data 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name,email,phone,password,address}) // converts to json string so that server can read it
    });
    const data = await response.json();
    if(response.ok){
      alert("Registration Successful! Please Login.");

      navigate('/login');
    }else{
      alert(data.message || data.error)
    }
  }
  return (
    <div>
        <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4} className="border p-4 shadow-sm rounded">
          <h2 className="mb-4 text-center">Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={name} onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Label>Phone Number</Form.Label>
      <Form.Control type="number" placeholder="Enter phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
      <Form.Label>Address</Form.Label>
      <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e)=>setAddress(e.target.value)} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)}/>
      </Form.Group> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br />
      Already Registered?<br />
      <Button variant="primary" as={Link} to="/login">
        Login
      </Button>
    </Form>
    
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Register
