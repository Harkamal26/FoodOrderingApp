import React, { useState,useEffect } from 'react'
import './Orders.css'

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const [role,setRole] = useState("");
    const [activeTab,setActiveTab] = useState('all')
    // const [id,setId] = useState('')
    useEffect(()=>{
      const fetchData = async()=>{
        try{
        const userId = localStorage.getItem('userId');
        if(!userId) {
          console.log("User not logged in")
          setOrders([]);
           return;
        }
        setRole(localStorage.getItem('role'));
         const res = await fetch('http://localhost:3000/api/ordersFetch',{
          method:"POST",
          headers:{ 'Content-Type':'application/json'},
          body:JSON.stringify({ userId,
            role:localStorage.getItem('role')
          })
         })
         const data = await res.json();
         if(res.ok){
          setOrders(data || []);
         }else{
          alert(`Error: ${data.message}`)
         }
        }catch(e){console.log(e)}
      }
        fetchData();
        // .then(res =>res.json())
        // .then(data=>setOrders(data || []));
    },[]);
    const handleStatus = async(orderId,newStatus)=>{
      try{
        const res = await fetch('http://localhost:3000/api/orders/status',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            orderId,
            status: newStatus
          })
        })
        const data = await res.json();
        if(res.ok){
          alert("Status changed");
          setOrders(prevOrders=>prevOrders.map(order=>order._id===orderId ? {...order,status:newStatus}:order))
        }else{
          alert(`Error: ${data.message}`)
        }
      }catch(e){
        console.log('error')
      }
    }
    const filteredOrders = orders.filter(order=>{
      if(activeTab==='all') return true;
      return order.orderType === activeTab;
    })
   
  return (
    <div className='outer-container'>
      {role === 'admin' && 
      <nav><div style={{display:'flex'}}>
        <button className={activeTab==='dinning' ? 'active-tab': ''} onClick={()=>setActiveTab('dinning')}>Dinning</button>
        <button className={activeTab==='pickup' ?'active-tab': ''} onClick={()=>setActiveTab('pickup')}>Pick Up</button>
        <button className={activeTab==='delivery' ?'active-tab': ''} onClick={()=>setActiveTab('delivery')}>Delivery</button>
        <button className={activeTab==='all' ?'active-tab': ''} onClick={()=>setActiveTab('all')}>All</button>
        </div>

        <h2>{activeTab} orders</h2>
      </nav>}
      
      <div className='inner-container'>
      {filteredOrders.map((_,index,array)=>{
        const order = array[array.length-1-index];
         const formattedDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US',{
      year:'numeric',
      month:'long',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    }) : 'N/A';
    return(
        <div key={order._id} className='order-container'>
            {order.items.map((item,j)=>(
                <p key={j}>
                    {item.name} x {item.quantity}
                </p>
                
            ))}
            <h4>Total: Rs. {order.totalAmount}</h4>
            <h4>Status: {order.status}</h4>
            <h3>OrderType: {order.orderType}</h3>
            {role ==='admin' &&
              <select name="status" id="status" onChange={(e)=>handleStatus(order._id,e.target.value)} value={order.status}>
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready_for_pickup">Ready for Pickup</option>
                <option value="out_for_delivery">Out for delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            }
            <small>Ordered at: {formattedDate}</small>
        </div>
    );
})}
      </div>
    </div>
  )
}

export default Orders
