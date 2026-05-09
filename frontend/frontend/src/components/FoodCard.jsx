import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
const FoodCard = ({item}) => {
    const [qty,setQty] = useState(1);
    // console.log(item)
    const addToCart =  async ()=>{ 
      const userId = localStorage.getItem('userId'); //?
        // const cartItem = {
        //     ...item,
        //     quantity: qty,
        //     total:qty*item.price
        // };
        // console.log(item.imageUrl)
        await fetch('http://localhost:3000/api/cart/add',{
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            userId,
            item :{
              foodItemId: item._id,
              name: item.name,
              quantity: Number(qty),
              price: item.price,
              imageUrl:String(item.imageUrl)
              // sends data to back so that it will save it inot mongo and when in cart is selected it will rendere the items 
            }
          })
        })
        // let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // cart.push(cartItem);
        // localStorage.setItem(`cart_${userId}`,JSON.stringify(cart));
        alert("Added to cart");
    }
  return (
    <div>
      
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.imageUrl} />
      {/* <h1>url</h1> */}
      
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        {/* <h1>name</h1> */}
        <Card.Text>{item.description}</Card.Text>
        {/* <h1>desc</h1> */}

        <h5>₹ {item.price}</h5>

        <Form.Control 
          type="number" 
          value={qty}
          min="1"
          onChange={(e)=>setQty(e.target.value)}
        />

        <Button className="mt-2" onClick={addToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default FoodCard
