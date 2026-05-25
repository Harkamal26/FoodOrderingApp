import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import './Cart.css'

const Cart = () => {
  let empty = false;
  const [cart,setCart] = useState([]);
  const [orderType,setOrderType] = useState('dinning');
  useEffect(()=>{ // when cart compnonet loads then use effet first runs > api call > whcih returns cart items of particular user
    const userId = localStorage.getItem('userId');
    if(!userId) return;
    // const data = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    // setCart(data);
    fetch(`http://localhost:3000/api/cart/${userId}`)
    .then(res => res.json())
    .then(data => setCart(data.items || []));
    if(cart.length === 0){
      empty = true;
      setMsg("Cart is empty")
    }
  
  },[]);
  const [msg,setMsg] = useState("");
  
  const total = (cart || []).reduce((sum,item)=> sum + item.price*item.quantity,0);
  // -------------placing order
  const onPlacing = async()=>{
    const userId =localStorage.getItem('userId')
    const role =  localStorage.getItem('role');
    console.log(userId);
    console.log(cart)
    console.log(total)
    console.log(orderType)
    const res = await fetch('http://localhost:3000/api/orders',{
      method:'POST',
      headers: {'Content-Type':'application/json'
        // 'Authorization':`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        userId,
        role,
         items: cart,
         totalAmount: total,
         status:'placed',
         orderType: orderType
      })
    });
    const data = await res.json();
    if(res.ok){
      alert('Order placed');
      setCart([]);
    }else{
      alert(data.message || "Error placing order")
    }
    // localStorage.removeItem('cart');
  }
  const removeItem =  async (index)=>{
    const userId = localStorage.getItem('userId')
    //bhej rhe a backend nu
    const res = await fetch('http://localhost:3000/api/cart/remove',{
      method: "POST",
      headers:{ 'Content-Type':'application/json'},
      // userId te index(jithe item stored hai )
      body: JSON.stringify({userId,index})
    });
    const data = await res.json();
    setCart(data.items);
    // const updated = [...cart];
    // updated.splice(index,1);
    // setCart(updated);
    // localStorage.setItem('cart',JSON.stringify(updated));
    // localStorage.setItem(`cart_${userId}`,JSON.stringify(updated));
    // setCart([]);
  };
  
  return (
    <div className='container'>
      
      <h2>Cart</h2>
<div className='card-container'>
      {cart.map((item, i) => (
        // <div key={i}>
        //   {item.name} = {item.quantity} x ₹{item.price}
        //   <button onClick={() => removeItem(i)}>Remove</button>
        // </div>
        <Card style={{ width: '18rem', border:"1px solid black"  }} className='hover-card'>
      <Card.Img variant="top" src={item.imageUrl}  className='card-image'/>
      {/* <h1>url</h1> */}
      
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        {/* <h1>name</h1> */}
        
        <h5>₹ {item.price }</h5>
        <Card.Text>Quantity: {item.quantity}</Card.Text>
        <Card.Text>Total: {item.quantity*item.price}</Card.Text>
        {/* <h1>desc</h1> */}


        
        <button onClick={()=>removeItem(i)}>Remove</button>
        {/* <Form.Control 
          type="number" 
          value={item.qty}
          min="1"
          onChange={(e)=>setQty(e.target.value)}
        /> */}

        {/* <Button className="mt-2" onClick={addToCart}>
          Add to Cart
        </Button> */}
      </Card.Body>
    </Card>
      ))}
      </div>
      {!empty?<div className='footer'>
      <h3>Total: ₹{total}</h3>
      {/* <button>Payment Gateway</button> */}
      <button onClick={onPlacing}>Place Order</button>
      <select name="orderTaking" id=""  onClick={(e)=>setOrderType(e.target.value)}>
        <option value="dinning">Dinning</option>
        <option value="pickup">Pick Up</option>
        <option value="delivery">Delivery</option>
      </select>
      </div>:{msg}
      }
      
    </div>
  )
}

export default Cart
