const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET
const generateToken = (userId,role)=>{
  return jwt.sign(
    {id: userId,role:role},
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
  );
};
const verifyToken = (req,res,next)=>{
  const authHeader = req.headers['authorization'];
  // headers: "bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({message:'access denied: no token provoken'});
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET );
    req.user = decoded;
    next();
  }catch(e){
    res.status(403).json({message:'invalid or expired token'})
  }

}
// app.use(cors());// comm btw react and express
app.use(express.json()); //to read req.body from the react
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
// app.get('/',(req,resp)=>{
//   resp.json({message:"hello"}) // .json > converts to readable form 
//     // resp.send(`<h1>This is ABC company's Home Page</h1>`)
// }).
// Users: Stores name, email, password (hashed), and role (user or admin)
const userSchema = new mongoose.Schema({
  name: {type:String, required: true},
  email: {type: String, unique: true, required:true},
  password: {type:String, required: true},
  phone: {type:Number, required:true},
  role: {type:String, required: true},
  address:{type:String,required:true}
})
userSchema.pre('save',async function(){ // .pre= middleware hook to allow run custom code automatcially ecery time a doc is about to be saved in db
  if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,10);
})
const Users = mongoose.model("user",userSchema);

// async function insertUser(n,e,p,r){
//   try{
//     await Users.create({
//       // name: "Harkamal",
//       // email: 'takhi.harkml@gmail.com',
//       // password: "1234"
//       name: n,
//       email: e,
//       password: p,
//       role: r,
//     })
    
//     console.log('Inserted one');
//   }
//   catch(e) {console.log(e)}
// }
// FoodItems: Stores name, category (Pizza/Burger), price, imageURL, and description.
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl:{ type: String, required: true },
  description: String,
})
const Items = mongoose.model('Items',foodSchema);
// foods : from back (db) tp front
// sends food list to ui
app.get('/api/foods',verifyToken,async (req,res)=>{
  try{
    // const userId = req.user.id;
    // if(!userId) return res.json({message:'login first'})
      const foods = await Items.find();
      res.json(foods); // sends a list of food back to brw or frntend 
  }catch(e){
    res.status(500).json({error:e.message});
  }
})

// const authMiddleware = (req,res)=>{
//   const token = req.headers.authorization?.split(" ")[1];
//   if(!token) return res.status(401).json({message:"No token"});
//   try{
//     const decoded = jwt.verify(token,jwt_secret);
//     req.user = decoded;
//     // next();
//   }
//   catch{
//     res.status(401).json({message: "Invalid token"})
//   }
// }
async function insertFood(n,c,p,i,d){
  try{
    await Items.create({
      name: n,
      category: c,
      price:p,
      imageUrl: i,
      description:d,
    })
    console.log("Inserted food item");
  }
  catch(e){
    console.log(e)
  }
}
const isAdmin = (req,res,next)=>{
  if(!req.user){
    return res.status(401).json({message: 'unauthorized: no user session found'})
  }
  const userRole = req.user.role;
  console.log(userRole)
  if(userRole !== 'admin'){
    return res.status(403).json({message:'access forbidden: admin privileges required'})
  }
  next();
}
app.post('/api/addItems',verifyToken,isAdmin,async(req,res)=>{
  try{
    const {itemName,category,desc,imageUrl,price}= req.body;
    await insertFood(itemName,category,price,imageUrl,desc);
    return res.status(201).json({message:"Item added successfully"})
  }catch(e){
    res.status(500).json({message:e.message})
  }
})
app.post('/api/remItems',async(req,res)=>{
  try{
    const {foodItemId} = req.body;
    console.log(foodItemId)
    await Items.deleteOne({_id:foodItemId});
    return res.status(201).json({message:"Item removed successfully"})
  }catch(e){
    res.status(500).json({message:e.message})
  }
})

// async function del(){
//   try{
//     for(let i = 0;i<5;i++){
//     await Items.deleteOne({name:"burger"})
//     }
//     console.log("deleted food item");
//   }
//   catch(e){
//     console.log(e)
//   }
// }
// del()
// insertFood("burger","Veg",220,"https://i.pinimg.com/originals/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg?nii=t","Cheesy Pizza")
// insertFood("burger","Veg",220,"https://i.pinimg.com/originals/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg?nii=t","Cheesy Pizza")
// insertFood("burger","Veg",220,"https://i.pinimg.com/originals/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg?nii=t","Cheesy Pizza")
// insertFood("burger","Veg",220,"https://i.pinimg.com/originals/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg?nii=t","Cheesy Pizza")
// insertFood("burger","Veg",220,"https://i.pinimg.com/originals/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg?nii=t","Cheesy Pizza")



// insertFood("Spring roll","Veg",100,"https://tse4.mm.bing.net/th/id/OIP.lpxQIvkRQVU0axaKPLfXbAHaHa?pid=Api&P=0&h=180","Veggie Spring roll")
// insertFood("Dal Makhani","Meal",250,"https://tse3.mm.bing.net/th/id/OIP.sF4b948SFHLbg4JSDLrzPgHaHa?pid=Api&P=0&h=180","Creamy Dal Makhani")
// insertFood("Paneer Lababdar","Meal",420,"https://tse4.mm.bing.net/th/id/OIP.odj4EARSgIT4kAscaAf2fAHaHa?pid=Api&P=0&h=180","Tasty Paneer Lababdar")


// async function insertOrder(){
//   try{
//     await Orders.create({
//       userId: idOfUser,
//       items:[{
//         name: 'Pizza',
//         quatity: 2,
//         price: 1220,
//       }],
//       totalAmount: 1200,
//     })
//   }catch(e){
//     console.log(e)
//   }
// }
// mongoose.connect(uri,{dbName:'FoodOrdering'})
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDb altas connected")
})
.catch((e)=>{
   console.log("Mongo Error:",e);
});
// insertUser("kamal","t@h","12345","admin");
// insertFood("cheesy pizza","pizza",120,"C:\Users\komal\OneDrive\Desktop\fullstackdev\foodDeliveryApp\frontend\frontend\src\components\hill1.png","d");
// insertFood("Burger","veg",120,"C:\Users\komal\OneDrive\Desktop\fullstackdev\foodDeliveryApp\frontend\frontend\src\components\hill1.png","d");

// insertOrder()
// .then(()=>{
//   console.log('conneted atlas')
//   insertUser("kamal","t@h","12345","admin");
// })
// .catch(e=> console.log(e)
// )
// for registerations
// /api/reg : distinguish data routes from frontend routes
// as we have used same for react routes 
//post: to get info from frontend
app.post('/api/register',async (req,res)=>{
  console.log("data received: ",req.body)
  try{
    const {name,email,phone,password,address} = req.body;
    // check krn lyi agr user already exists
    if(email=="") return res.status(400).json({message:"You have not added email"})
    const existingUser = await Users.findOne({email});
    if(existingUser) return res.status(400).json({message:"User already exists"});
    const newUser  = new Users({name,email,phone,password,role: "user",address});
    await newUser.save();
    res.json({message: "User registered successfully"});
  }
  catch(e)
{
  res.status(500).json({message:e.message})
}})
// for login

app.post('/api/login',async(req,res)=>{
  console.log("data received: ",req.body)
  try{
    const {email,password} = req.body;
    const user = await Users.findOne({email});
    if(!user) return res.status(400).json({message:"User not found"});
    // hashed password nu compare krn lyi
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"invalid credentials"})
    }
    // generate token
    const token = generateToken(user._id,user.role);// create secure pass so that after login they dont need to send their passs with every req
    res.json({token,user:{id:user._id,name:user.name,role: user.role}});
    // to send to frontend so that it can use it 
  }
  catch(e){
    res.status(500).json({message: e.message});
  }
})
// admin
app.post('/api/admin',async(req,res)=>{
  console.log(req.body);
  try{
    const {password} = req.body;
    console.log(password)
    // const email = "admin@gmail.com";
    const adm = await Users.findOne({email:"admin@gmail.com"});
    const isMatch = await bcrypt.compare(password,adm.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid Admin"})
    }
    console.log(isMatch)
    const token = jwt.sign({id: adm._id,role: adm.role},jwt_secret,{expiresIn: '1d'});
    console.log(token)
    res.json({token,user:{id:adm._id,name:adm.name,role: adm.role}});
  }catch(e){
    res.status(500).json({message: e.message});
  }
})
// for orders
// here oders are stored connected to Cart.jsx
const cartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: true
  },
  items: [
  {
    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items"
    },
    name: String,
    quantity: Number,
    price: Number,
    imageUrl: String,
  }
  ]
})
const Cart = mongoose.model('Cart',cartSchema);
// to get data from cart  to db
app.post('/api/cart/add',async (req,res)=>{
  try{
    const {userId, item} = req.body; 
    let cart = await Cart.findOne({userId});
    if(!cart){
      // create new
      cart = new Cart({
        userId,
        items: [item]
      });
    }else{
      // check if item exists
      const existing = cart.items.find(i=>i.foodItemId == item.foodItemId);
      if(existing){
        existing.quantity += item.quantity;
      }else{
        cart.items.push(item);
      }
    }
    await cart.save();
    res.json(cart);
  }catch(e){res.status(500).json({error: e.message})}
});
// to send data to front 
app.get('/api/cart/:userId',async (req,res)=>{
  try{
    const userId = req.params.userId;
    if(!userId){
      return;
    };
    const cart = await Cart.findOne({userId});
    res.json(cart || {items: []});
  }catch (e) {
    res.status(500).json({ error: e.message });
  }
})
const orderSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, // mongo automatically assigns to evey doc (_id)
    ref: "user", // provides ref to user model
    required: true
  },
  items: [
    {
      foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item"},
      name: String,
      quantity: {type: Number, default: 1},
      price: Number
    }
  ],
  totalAmount: {type: Number,required: true},
  status: {type: String, default: "Placed",
    enum:['placed','pending','preparing','ready','out','delivered','cancelled'],
  },
  orderType:{
    type:String,
    enum:['dinning','delivery','pickup'],
    required: true
  },
},{timestamps: true});
const Orders = mongoose.model('Orders',orderSchema);
// for placing order-ithe data aa k store ho reha 
app.post('/api/orders',async (req,res)=>{
  try{
    // const  = req.query.userId;
    // console.log("userId",userId)
    // if(!userId) return ;
    const {userId,role,items,totalAmount,status,orderType} = req.body;
    // console.log("incoming order: ",req.body)
    if(!userId || !items || !totalAmount) return res.status(400).json({message: "Missing fields"})
    const order = await Orders.create({
      userId,
      items,
      totalAmount,
      status,
      orderType
    });
    await Cart.findOneAndDelete({userId});
    res.json(order);
  }catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e)
  }
})
// itho data ja reha
app.post('/api/ordersFetch', async (req,res)=>{
  try{
    const {userId,role} = req.body;
    if(!userId) {
      return res.status(400).json({message:"UserId required"})
    }
    if(role==='user'){
    const order = await Orders.find({userId});
    res.json(order);
    }else{
      const order = await Orders.find({});
      res.json(order);
    }
  }catch(e){
    res.status(500).json({error: e.message})
  }
})
// changeStatus
app.post('/api/orders/status',async(req,res)=>{
  try{
    const {orderId,status} = req.body;  
    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      {status:status},
      {new: true}
    );
    res.json(updatedOrder);
  }catch(e){
    res.status(500).json({message:"server error"})
  }
})
app.post('/api/cart/remove',async (req,res)=>{
  const {userId,index} = req.body;
  const cart = await Cart.findOne({userId});
  cart.items.splice(index,1); // index te ja k 1 item nu rmv kr devega...
  await cart.save();
  res.json(cart);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
   console.log(`Server running on port ${PORT}`);
});