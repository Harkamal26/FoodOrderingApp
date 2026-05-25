import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Unauth from './Unauth'
import {  useNavigate } from 'react-router-dom'
import './AddItem.css'
const AddItem = () => {
  const navigate = useNavigate();
  const [itemName,setItemName] = useState("");
  const [desc,setDesc] = useState('');
  const [imageUrl,setImageUrl] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] =useState(0);
  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    if(!userId){
      navigate('/login',{replace:true})
      return;
    }
    const role = localStorage.getItem('role');
    if(role !== 'admin'){
      navigate('/unauth',{replace:true});
      return;
    }
  })
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const response = await fetch('http://localhost:3000/api/addItems',{
      method: 'POST',
      headers: {'Content-Type':'application/json',
        'authorization':`Bearer ${token}`
      },
      body: JSON.stringify({itemName,category,desc,imageUrl,price})
  })
      const data = await response.json();
      if(response.ok){
        alert('Item added')
        setCategory("");
        setImageUrl("");
        setItemName("");
        setDesc("");
        setPrice(0);
      }else{
        alert(`Server Error: ${data.message}`)
      }
  }catch(e){
    alert('could not connect to the server')
  }
    }
    
  
  return (
    <div>
      <h2>Add Items Here</h2>
      <form onSubmit={handleSubmit}>
        <div className='item_container'>
        {/* itemname */}
        <div className='inner'>
        <label htmlFor='itemName'>Item Name: </label>
        <input name={itemName} id='itemName' type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)} required/>
        </div>
        {/* category */}
        <div className='inner'> 
        <label htmlFor='category'>Item Category: </label>
        <input id='category' name={category} type="text" value={category} onChange={(e)=>setCategory(e.target.value)} required/>
        </div>
        {/* desc */}
        <div className='inner'>
        <label htmlFor='desc'>Item Description: </label>
        <input id='desc' name={desc} type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} required/>
        </div>
        {/* imageUrl */}
        <div className='inner'>
        <label htmlFor='imageUrl'>Item ImageURL: </label>
        <input id='imageUrl' name={imageUrl} type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required/>
        </div>
        {/* price */}
        <div className='inner'>
        <label htmlFor='price'>Item price: </label>
        <input id='price' name={price} type="text" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
        
        </div>
        <div className='inner'>
        <button type='submit'>
          Add
        </button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddItem
