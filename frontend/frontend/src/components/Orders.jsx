import React, { useState,useEffect } from 'react'
import './Orders.css'
const Orders = () => {
    const [orders,setOrders] = useState([]);
    useEffect( ()=>{
        const userId = localStorage.getItem('userId');
        if(!userId) {
          console.log("User not logged in")
           return;
        }
         fetch(`http://localhost:3000/api/orders/${userId}`)
        .then(res =>res.json())
        .then(data=>setOrders(data || []));
    },[]);
    
  return (
    <div className='outer-container'>
      <h2>Your Orders</h2>
      <div className='inner-container'>
      {orders.map((order,i)=>(
        <div key={i} className='order-container'>
            {order.items.map((item,j)=>(
                <p key={j}>
                    {item.name} x {item.quantity}
                </p>
                
            ))}
            <h4>Total: Rs. {order.totalAmount}</h4>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Orders
