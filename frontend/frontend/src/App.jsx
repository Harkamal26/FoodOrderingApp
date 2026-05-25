import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import MyNavbar from './components/MyNavbar';
import './App.css'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import FoodCard from './components/FoodCard';
import Logout from './components/Logout';
import Orders from './components/Orders';
import Admin from './components/Admin';
import AddItem from './components/AddItem';
import Unauth from './components/Unauth';
import History from './components/History';
const router = createBrowserRouter([
  {
    path:'/',
    element:(
    <div>
      <MyNavbar/>
      <Home/>
      {/* <h1>Home page</h1> */}
      {/* <Home/> */}
    </div>
    )
  },
  {
    path:'/home',
    element:(
    <div>
      <MyNavbar/>
      {/* <h1>Home page</h1> */}
      <Home/>
    </div>
    )
  },
  {
    path:'/login',
    element: (
    <div>
      <MyNavbar/>
      <Login/>
    </div>)
  },
  {
    path:'/cart',
    element:(
    <div>
      <MyNavbar/>
      {/* <h1>Cart</h1> */}
      <Cart/>
    </div>
    )
  },
  {
    path:'/orders',
    element:(
    <div>
      <MyNavbar/>
      <Orders/>
      
    </div>
    )
  },
  {
    path: '/register',
    element: (
      <div>
        <MyNavbar />
        <Register/>
      </div>
    )
  },
  {
    path:"/logout",
    element:(
    <div>
      <Logout/>
    </div>
    )
     },
     {
      path:'/admin',
      element:
      <div>
        <MyNavbar/>
        <Admin/>
      </div>
     },
     {
      path:'/additem',
      element:
      <div>
        <MyNavbar/>
        <AddItem/>
      </div>
      
     },
     {
      path:'/unauth',
      element:<div>
        <Unauth/>
      </div>
     },
     {
      path:'/history',
      element:<div>
        <MyNavbar/>
        <History/>
      </div>
     }
]);
const App = () => {
  return (
    <>
    {/* <h1>{s+9}</h1>
    <MyNavbar/> */}
      <RouterProvider router={router}/>
      </>
  )
}

export default App

