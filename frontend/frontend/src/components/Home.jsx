import { useState } from 'react'
import { useEffect } from 'react';
import FoodCard from './FoodCard';
const Home = () => {
    const [foods,setFoods] = useState([]);
    useEffect(()=>{ // helps to perform side effects(outside the normal calc of ui) like fetcgin data etc > basically for automativally 
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/api/foods',{
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            if(Array.isArray(data)){
                setFoods(data)
            }else{
                console.log('backend message: ',data.message);
                setFoods([])
            }
        })
        .catch(e=>{
            console.log('error: ',e);
            setFoods([])
        })
    },[])
    const [search,setSearch] = useState('');
    let sname = "";
    let matchedCategory = []
    if(foods.length != 0)
    matchedCategory = foods.some(item=>item.category.toLowerCase()===search.toLowerCase());
    else {

    }
    let filterFoods = [];
    if(matchedCategory){
        filterFoods = foods.filter(item=>item.category.toLowerCase()===search.toLowerCase());
    }else{
        sname = search.toLowerCase();
        filterFoods = foods.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    // const filterFoods = foods.filter(i=>i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()))
     
    const categories = [...new Set(filterFoods.map(item=>item.category))]; //spred opr, in this convert set to array
  return (
    <div>
        <div>
            <input type="sear_field" id="search" placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
            {/* <button id="sear_btn" >Search</button> */}
        </div>
        {sname}
        {categories.map(cat=>(
            <div key={cat}>
                <h2>{cat}</h2>
                <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
                    {matchedCategory || search.toLowerCase()===""? foods.filter(item=>item.category===cat )
                    .map(item=>(
                        <FoodCard key={item._id} item={item}/>
                    )) : foods.filter(item=>item.category===cat && item.name.toLowerCase()===sname )
                    .map(item=>(
                        <FoodCard key={item._id} item={item}/>
                    ))
                    }
                    <div>heyy</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Home
