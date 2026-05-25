const express = require('express');
const app = express();
const port = 3000;
//built-in mdlwares
app.use(express.json());

// custom middleware


//application middlewares
// const loggingMiddleware = (req,res,next)=>{
//     console.log('logging ')
//     next();
// }

// app.use(loggingMiddleware)

// const authMiddleware = (req,res,next)=>{
//     console.log('auth ')
//     res.send('no validation and routing')
//     // next();  //can end res cycle any time 
// }
// // next(); middleware chaining
// app.use(authMiddleware)

// const validMiddleware = (req,res,next)=>{
//     console.log('validation')
//     next(); // if aage koi mdl nhi hai toh next route handler pe chla jayega
// }

// app.use(validMiddleware)

// // there order matter and all  mdl have to written and loaded before route handlers




const route = require('./routes/route')
// mounting routes
app.use('/api',route);

app.get('/',(req,res)=>{
    console.log('route handler')
    console.log(req.body)
    res.send('Hello World')
    // res.send(`<input type='text' placeholder='hello' > <button type='submit'>Submit</button>`)
})
app.listen(port,()=>{
    console.log(`running on port ${port}`)
})