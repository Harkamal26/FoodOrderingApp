import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';
const Admin = () => {
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const handleAdmin =async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/admin',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({password})
        })
        const data = await response.json();
        if(response.ok){
            localStorage.setItem('token',data.token);
            localStorage.setItem('role',"admin");
            localStorage.setItem('userId',data.user.id);
            alert(`Welcom back, ${data.user.name}`);
            navigate('/home');
            // 945872
        }else{
            alert(data.message);
        }
        

    }
  return (
    <div>
      <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4} className="border p-4 shadow-sm rounded">
          <h2 className="mb-4 text-center">Admin</h2>
      <Form onSubmit={handleAdmin}>
      {/* password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      
      <Button  variant="primary" type="submit">
        Submit
      </Button>
     
      
    </Form>
    
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Admin
