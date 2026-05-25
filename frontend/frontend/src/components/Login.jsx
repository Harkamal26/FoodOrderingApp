import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e)=>{
    const token = localStorage.getItem('token')
    e.preventDefault(); //prevents page reload
    // console.log("Email:", email);
    // console.log("Password:", password);
    // pehla fetch houga te fir backend toh jo response aayega oh response ch aa k store houga te agr res ok aa ta local storage set kr do and pehla asi data bhej rhe aa body de through jo backend te fetch hovege check hon lyi coz is ch appa direct data fetch ni kr skde asi pehla data pa rhe aa fir check kr rhe aa k user exist krda k nhi
    const response = await fetch('http://localhost:3000/api/login',{ // feteches from backend db
      method: 'POST',
      headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
      // backend te data strings de form ch hai is lyi convert krna paina
      body: JSON.stringify({email,password})
    })
    const data = await response.json();
    if(response.ok){
      localStorage.setItem('token',data.token);
      localStorage.setItem('role',data.user.role);
      localStorage.setItem('userId',data.user.id);
      alert(`Welcom back, ${data.user.name}`);
      navigate('/home');
    }else{
      alert(data.message);
    }
  }
  return (
    <div>
        <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4} className="border p-4 shadow-sm rounded">
          <h2 className="mb-4 text-center">Login</h2>
      <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Form.Group>
      <Button  variant="primary" type="submit">
        Submit
      </Button>
      <br />
      Not Registered?
      <br />
      <Button variant="primary" type="submit" as={Link} to="/register">
        Register
      </Button>
      </Form.Group>
    </Form>
    
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Login
